# sensors/dht22.py — NexusGuard Village Mini
# Module capteur DHT22 : température + humidité air
# Source : dht22.py original (GPIO 17, use_pulseio=False)

import time
import board
import adafruit_dht

_dht_device = None

def _get_device():
    global _dht_device
    if _dht_device is None:
        _dht_device = adafruit_dht.DHT22(board.D17, use_pulseio=False)
    return _dht_device

def read_dht22(retries: int = 3, delay: float = 0.5) -> dict:
    """
    Lit la température et l'humidité de l'air depuis le DHT22.
    Retente `retries` fois en cas d'erreur RuntimeError.

    Returns:
        {
            "temperature": float | None,
            "humidity_air": float | None,
            "error": str | None
        }
    """
    device = _get_device()
    for attempt in range(retries):
        try:
            temperature = device.temperature
            humidity    = device.humidity
            if temperature is not None and humidity is not None:
                return {
                    "temperature":   round(float(temperature), 1),
                    "humidity_air":  round(float(humidity), 1),
                    "error":         None
                }
        except RuntimeError as e:
            if attempt < retries - 1:
                time.sleep(2.0)  # Le DHT22 a besoin de ~2s entre chaque lecture
            else:
                cleanup()  # Détruit l'objet pour forcer une réinitialisation au prochain tour
                return {"temperature": None, "humidity_air": None, "error": str(e)}
        except Exception as e:
            cleanup()
            return {"temperature": None, "humidity_air": None, "error": str(e)}
    
    cleanup()
    return {"temperature": None, "humidity_air": None, "error": "Max retries reached"}

def cleanup():
    global _dht_device
    if _dht_device is not None:
        try:
            _dht_device.exit()
        except Exception:
            pass
        _dht_device = None
