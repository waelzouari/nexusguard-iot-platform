import RPi.GPIO as GPIO
import time

# Configuration
TRIG = 23
ECHO = 24

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

def read_water_level():
    # Setup pins
    GPIO.setup(TRIG, GPIO.OUT)
    GPIO.setup(ECHO, GPIO.IN)

    # Assurer TRIG à 0
    GPIO.output(TRIG, False)
    time.sleep(0.0002)

    # Envoyer impulsion 10µs
    GPIO.output(TRIG, True)
    time.sleep(0.00001)
    GPIO.output(TRIG, False)

    # Attente début écho (avec timeout)
    timeout = time.time() + 1
    while GPIO.input(ECHO) == 0:
        pulse_start = time.time()
        if time.time() > timeout:
            return -1  # erreur

    # Attente fin écho (avec timeout)
    timeout = time.time() + 1
    while GPIO.input(ECHO) == 1:
        pulse_end = time.time()
        if time.time() > timeout:
            return -1  # erreur

    # Calcul distance
    pulse_duration = pulse_end - pulse_start
    distance = pulse_duration * 17150
    return round(distance, 2)


try:
    while True:
        distance = read_water_level()

        if distance == -1:
            print("Erreur : capteur non détecté")
        else:
            print(f"Distance: {distance} cm")

        time.sleep(1)

except KeyboardInterrupt:
    print("Arrêt du programme")

finally:
    GPIO.cleanup()