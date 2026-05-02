# sensors/ultrasonic.py — NexusGuard Village Mini
# Module capteur niveau eau HC-SR04
# Source : ultrason.py original (TRIG=23, ECHO=24)

import time
import RPi.GPIO as GPIO

from config import GPIO_TRIG, GPIO_ECHO, TANK_HEIGHT_CM, TANK_OFFSET_CM

_initialized = False

def _setup():
    global _initialized
    if not _initialized:
        GPIO.setmode(GPIO.BCM)
        GPIO.setwarnings(False)
        GPIO.setup(GPIO_TRIG, GPIO.OUT)
        GPIO.setup(GPIO_ECHO, GPIO.IN)
        _initialized = True

def _measure_distance() -> float:
    """Mesure brute de distance en cm. Retourne -1 en cas d'erreur."""
    GPIO.output(GPIO_TRIG, False)
    time.sleep(0.0002)

    GPIO.output(GPIO_TRIG, True)
    time.sleep(0.00001)
    GPIO.output(GPIO_TRIG, False)

    # Attente début écho avec timeout
    pulse_start = time.time()
    timeout     = pulse_start + 1.0
    while GPIO.input(GPIO_ECHO) == 0:
        pulse_start = time.time()
        if pulse_start > timeout:
            return -1.0

    # Attente fin écho avec timeout
    pulse_end = time.time()
    timeout   = pulse_end + 1.0
    while GPIO.input(GPIO_ECHO) == 1:
        pulse_end = time.time()
        if pulse_end > timeout:
            return -1.0

    distance = (pulse_end - pulse_start) * 17150
    return round(distance, 2)

def read_ultrasonic() -> dict:
    """
    Lit le niveau d'eau dans le réservoir.

    Returns:
        {
            "distance_cm":   float,  # distance capteur → surface eau
            "water_level_cm": float, # hauteur d'eau dans le réservoir
            "water_pct":     float,  # % remplissage
            "error":         str | None
        }
    """
    try:
        _setup()
        distance = _measure_distance()
        if distance < 0:
            return {
                "distance_cm":    -1,
                "water_level_cm": 0,
                "water_pct":      0,
                "error":          "Capteur non détecté"
            }

        # distance = espace entre capteur et surface eau
        # water_level = hauteur totale - offset - distance
        water_level = max(0.0, TANK_HEIGHT_CM - TANK_OFFSET_CM - distance)
        water_pct   = min(100.0, max(0.0, (water_level / TANK_HEIGHT_CM) * 100))

        return {
            "distance_cm":    round(distance, 1),
            "water_level_cm": round(water_level, 1),
            "water_pct":      round(water_pct, 1),
            "error":          None
        }
    except Exception as e:
        return {
            "distance_cm":    -1,
            "water_level_cm": 0,
            "water_pct":      0,
            "error":          str(e)
        }

def cleanup():
    global _initialized
    if _initialized:
        try:
            GPIO.cleanup([GPIO_TRIG, GPIO_ECHO])
        except Exception:
            pass
        _initialized = False
