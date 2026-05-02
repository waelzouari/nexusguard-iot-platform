# sensors/soil.py — NexusGuard Village Mini
# Module capteur humidité sol via ADS1115 (I2C)
# Source : soil2.py original (canal 0, DRY=28000, WET=11000)

import time
import board
import busio
import adafruit_ads1x15.ads1115 as ADS
from adafruit_ads1x15.analog_in import AnalogIn

from config import ADS_CHANNEL, SOIL_DRY_VAL, SOIL_WET_VAL

_ads  = None
_chan = None

def _get_channel():
    global _ads, _chan
    if _chan is None:
        i2c  = busio.I2C(board.SCL, board.SDA)
        _ads  = ADS.ADS1115(i2c)
        _chan = AnalogIn(_ads, ADS_CHANNEL)
    return _chan

def _read_raw_average(samples: int = 10) -> int:
    chan  = _get_channel()
    total = 0
    for _ in range(samples):
        total += chan.value
        time.sleep(0.05)
    return total // samples

def read_soil() -> dict:
    """
    Lit l'humidité du sol via ADS1115.

    Returns:
        {
            "soil_humidity": float (0-100),
            "soil_raw":      int,
            "error":         str | None
        }
    """
    try:
        raw      = _read_raw_average()
        humidity = (SOIL_DRY_VAL - raw) / (SOIL_DRY_VAL - SOIL_WET_VAL) * 100
        humidity = max(0.0, min(100.0, humidity))
        return {
            "soil_humidity": round(humidity, 1),
            "soil_raw":      raw,
            "error":         None
        }
    except Exception as e:
        return {"soil_humidity": None, "soil_raw": None, "error": str(e)}
