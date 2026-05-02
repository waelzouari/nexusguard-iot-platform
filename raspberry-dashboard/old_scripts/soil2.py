# soil.py

import time
import board
import busio
import adafruit_ads1x15.ads1115 as ADS
from adafruit_ads1x15.analog_in import AnalogIn

i2c = busio.I2C(board.SCL, board.SDA)
ads = ADS.ADS1115(i2c)

chan = AnalogIn(ads, 0)

DRY_VALUE = 28000
WET_VALUE = 11000

def read_raw_average(samples=10):
    total = 0
    for _ in range(samples):
        total += chan.value
        time.sleep(0.05)
    return total // samples

def read_soil_humidity():
    raw = read_raw_average()

    humidity = (DRY_VALUE - raw) / (DRY_VALUE - WET_VALUE) * 100
    humidity = max(0, min(100, humidity))

    return round(humidity, 1), raw

if __name__ == "__main__":
    print("=== Test Capteur Humidité Sol avec ADS1115 ===")
    print("Appuie sur Ctrl+C pour arrêter\n")

    try:
        while True:
            humidity, raw = read_soil_humidity()
            print(f"💧 Humidité du sol : {humidity}%   | valeur brute moyenne : {raw}")
            time.sleep(3)

    except KeyboardInterrupt:
        print("\nTest terminé.")