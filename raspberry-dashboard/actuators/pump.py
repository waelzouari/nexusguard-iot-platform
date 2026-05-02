# actuators/pump.py — NexusGuard Village Mini
# Module contrôle pompe via relais inversé GPIO 18
# Source : test_pompe.py original (GPIO 18, logique inversée)

import RPi.GPIO as GPIO
from config import GPIO_RELAY

_initialized   = False
_pump_active   = False  # état logique courant

def _setup():
    global _initialized
    if not _initialized:
        GPIO.setmode(GPIO.BCM)
        GPIO.setwarnings(False)
        GPIO.setup(GPIO_RELAY, GPIO.OUT)
        # Logique inversée : HIGH = pompe OFF au repos (sécurité)
        GPIO.output(GPIO_RELAY, GPIO.HIGH)
        _initialized = True

def get_state() -> bool:
    """Retourne True si la pompe est ACTIVE."""
    return _pump_active

def turn_on() -> dict:
    """Active la pompe (LOW sur relais inversé)."""
    global _pump_active
    _setup()
    GPIO.output(GPIO_RELAY, GPIO.LOW)   # LOW → relais fermé → pompe ON
    _pump_active = True
    return {"pump": True, "message": "Pompe activée"}

def turn_off() -> dict:
    """Éteint la pompe (HIGH sur relais inversé)."""
    global _pump_active
    _setup()
    GPIO.output(GPIO_RELAY, GPIO.HIGH)  # HIGH → relais ouvert → pompe OFF
    _pump_active = False
    return {"pump": False, "message": "Pompe éteinte"}

def toggle() -> dict:
    """Bascule l'état de la pompe."""
    if _pump_active:
        return turn_off()
    return turn_on()

def cleanup():
    global _initialized, _pump_active
    if _initialized:
        try:
            GPIO.output(GPIO_RELAY, GPIO.HIGH)  # Force OFF avant nettoyage
            GPIO.cleanup([GPIO_RELAY])
        except Exception:
            pass
        _initialized = False
        _pump_active  = False
