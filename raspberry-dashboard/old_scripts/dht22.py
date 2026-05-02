import time
import board
import adafruit_dht

dht = adafruit_dht.DHT22(board.D17, use_pulseio=False)

try:
    while True:
        try:
            temperature = dht.temperature
            humidity = dht.humidity

            if temperature is not None and humidity is not None:
                print(f"Température: {temperature:.1f}°C  Humidité: {humidity:.1f}%")

        except RuntimeError as e:
            print("Erreur lecture:", e)

        time.sleep(3)

except KeyboardInterrupt:
    print("Arrêt du programme")

finally:
    dht.exit()