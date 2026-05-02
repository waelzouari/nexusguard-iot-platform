# main.py — NexusGuard Village Mini
# Scheduler + Logique Nexus WEF intelligente
# Lit tous les capteurs toutes les SENSOR_INTERVAL secondes
# Décide automatiquement d'activer/désactiver la pompe

import time
import threading
import logging
from datetime import datetime
from collections import deque

import config
from sensors.dht22      import read_dht22
from sensors.soil        import read_soil
from sensors.ultrasonic  import read_ultrasonic
from actuators.pump      import turn_on, turn_off, get_state

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)
log = logging.getLogger("nexus")

# ─── État global partagé avec app.py ────────────────────────
latest_data: dict = {
    "temperature":    None,
    "humidity_air":   None,
    "soil_humidity":  None,
    "soil_raw":       None,
    "distance_cm":    None,
    "water_level_cm": None,
    "water_pct":      None,
    "pump":           False,
    "mode":           "auto",    # "auto" | "manual"
    "nexus_status":   "OK",      # "OK" | "WARN" | "ALERT"
    "nexus_reasons":  [],
    "timestamp":      None,
    "errors":         {}
}

# Historique circulaire (30 min × 1 point / 5 s = 360 points max)
MAX_HISTORY = int((config.HISTORY_MINUTES * 60) / config.SENSOR_INTERVAL)
history: deque = deque(maxlen=MAX_HISTORY)

_lock         = threading.Lock()
_stop_event   = threading.Event()

# ─── Logique Nexus WEF ──────────────────────────────────────
def nexus_decision(data: dict) -> dict:
    """
    Analyse les 3 dimensions WEF et retourne la décision pompe.

    Returns:
        {
            "should_pump": bool,
            "status":      "OK" | "WARN" | "ALERT",
            "reasons":     [str]
        }
    """
    reasons = []
    status  = "OK"
    should_pump = False

    soil  = data.get("soil_humidity")
    water = data.get("water_pct")
    temp  = data.get("temperature")

    # ── WATER dimension ─────────────────────────────────────
    if water is None:
        reasons.append("⚠️ Niveau eau inconnu")
        status = "WARN"
        water_ok = False
    elif water < config.WATER_MIN_PCT:
        reasons.append(f"🚨 Réservoir critique : {water}% (min {config.WATER_MIN_PCT}%)")
        status   = "ALERT"
        water_ok = False
    elif water < config.WATER_WARN_PCT:
        reasons.append(f"⚠️ Réservoir bas : {water}% (avert. {config.WATER_WARN_PCT}%)")
        if status == "OK":
            status = "WARN"
        water_ok = True  # On peut encore irriguer
    else:
        water_ok = True

    # ── ENERGY dimension (température) ──────────────────────
    if temp is None:
        reasons.append("⚠️ Température inconnue")
        if status == "OK":
            status = "WARN"
        energy_ok = False
    elif temp > config.TEMP_MAX_C:
        reasons.append(f"🚨 Surchauffe : {temp}°C (max {config.TEMP_MAX_C}°C)")
        if status != "ALERT":
            status = "ALERT"
        energy_ok = False
    elif temp > config.TEMP_WARN_C:
        reasons.append(f"⚠️ Température élevée : {temp}°C")
        if status == "OK":
            status = "WARN"
        energy_ok = True
    else:
        energy_ok = True

    # ── FOOD dimension (humidité sol) ────────────────────────
    if soil is None:
        reasons.append("⚠️ Humidité sol inconnue")
        if status == "OK":
            status = "WARN"
        food_needs_water = False
    elif soil < config.SOIL_DRY_PCT:
        reasons.append(f"🌱 Sol sec : {soil}% (seuil {config.SOIL_DRY_PCT}%)")
        food_needs_water = True
    elif soil > config.SOIL_WET_PCT:
        reasons.append(f"💦 Sol saturé : {soil}% (max {config.SOIL_WET_PCT}%)")
        food_needs_water = False
    else:
        # Le sol est entre le seuil sec et le seuil humide (ex: entre 40% et 70%)
        # On maintient l'état précédent de la pompe (Hystérésis)
        current_pump_state = data.get("pump", False)
        if current_pump_state:
            reasons.append(f"🔄 Irrigation en cours : {soil}% (cible {config.SOIL_WET_PCT}%)")
            food_needs_water = True
        else:
            food_needs_water = False

    # ── Décision finale WEF ──────────────────────────────────
    should_pump = water_ok and energy_ok and food_needs_water

    if should_pump:
        reasons.append("✅ Irrigation déclenchée (WEF OK)")
    elif not reasons:
        reasons.append("✅ Système nominal — irrigation non nécessaire")

    return {
        "should_pump": should_pump,
        "status":      status,
        "reasons":     reasons
    }

# ─── Lecture capteurs ────────────────────────────────────────
def read_all_sensors() -> dict:
    dht  = read_dht22()
    soil = read_soil()
    ult  = read_ultrasonic()
    return {
        "temperature":    dht["temperature"],
        "humidity_air":   dht["humidity_air"],
        "soil_humidity":  soil["soil_humidity"],
        "soil_raw":       soil["soil_raw"],
        "distance_cm":    ult["distance_cm"],
        "water_level_cm": ult["water_level_cm"],
        "water_pct":      ult["water_pct"],
        "errors": {
            "dht22":     dht["error"],
            "soil":      soil["error"],
            "ultrasonic": ult["error"]
        }
    }

# ─── Boucle principale ───────────────────────────────────────
def sensor_loop(socketio=None):
    """
    Boucle de lecture des capteurs. Passe socketio pour émettre les données.
    Appelée dans un thread séparé depuis app.py.
    """
    log.info("NexusGuard scheduler démarré (intervalle=%ds)", config.SENSOR_INTERVAL)
    while not _stop_event.is_set():
        try:
            readings = read_all_sensors()
            ts       = datetime.now().isoformat()

            with _lock:
                mode = latest_data["mode"]

            decision = nexus_decision(readings)

            # Contrôle pompe en mode AUTO seulement
            if mode == "auto":
                if decision["should_pump"] and not get_state():
                    turn_on()
                    log.info("AUTO → Pompe ON")
                elif not decision["should_pump"] and get_state():
                    turn_off()
                    log.info("AUTO → Pompe OFF")

            pump_state = get_state()

            with _lock:
                latest_data.update(readings)
                latest_data["pump"]          = pump_state
                latest_data["nexus_status"]  = decision["status"]
                latest_data["nexus_reasons"] = decision["reasons"]
                latest_data["timestamp"]     = ts

                # Snapshot pour historique graphique
                history.append({
                    "ts":            ts,
                    "soil_humidity": readings["soil_humidity"],
                    "water_pct":     readings["water_pct"],
                    "temperature":   readings["temperature"],
                    "humidity_air":  readings["humidity_air"],
                    "pump":          pump_state
                })

            log.info(
                "Capteurs → T:%s°C H:%s%% Sol:%s%% Eau:%s%% Pompe:%s [%s]",
                f"{readings['temperature']:.1f}" if readings['temperature'] is not None else "Err",
                f"{readings['humidity_air']:.1f}" if readings['humidity_air'] is not None else "Err",
                f"{readings['soil_humidity']:.1f}" if readings['soil_humidity'] is not None else "Err",
                f"{readings['water_pct']:.1f}" if readings['water_pct'] is not None else "Err",
                "ON" if pump_state else "OFF",
                decision["status"]
            )

            # Émission WebSocket
            if socketio:
                with _lock:
                    payload = dict(latest_data)
                socketio.emit("sensor_update", payload)

        except Exception as e:
            log.exception("Erreur scheduler : %s", e)

        _stop_event.wait(config.SENSOR_INTERVAL)

    log.info("Scheduler arrêté.")

def stop():
    _stop_event.set()

def set_mode(mode: str):
    """Change le mode : 'auto' ou 'manual'."""
    with _lock:
        latest_data["mode"] = mode

def get_latest() -> dict:
    with _lock:
        return dict(latest_data)

def get_history() -> list:
    with _lock:
        return list(history)
