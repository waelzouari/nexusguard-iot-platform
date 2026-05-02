import RPi.GPIO as GPIO
import time

RELAY_PIN = 18

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(RELAY_PIN, GPIO.OUT)

# === IMPORTANT : Logique inversée ===
# On met HIGH au repos pour que la pompe soit éteinte
GPIO.output(RELAY_PIN, GPIO.HIGH)
print("🔒 Relais forcé à OFF (logique inversée)")

print("=== Test Pompe NexusGuard - Logique Inversée ===")

def pompe_on(duree=6):
    print(f"✅ Pompe ALLUMÉE pour {duree} secondes")
    GPIO.output(RELAY_PIN, GPIO.LOW)   # LOW = pompe ON
    time.sleep(duree)
    GPIO.output(RELAY_PIN, GPIO.HIGH)  # HIGH = pompe OFF
    print("❌ Pompe ÉTEINTE")

try:
    while True:
        print("\nAppuie sur Entrée pour lancer la pompe...")
        input()
        pompe_on(3)

except KeyboardInterrupt:
    print("\nArrêt...")
finally:
    GPIO.output(RELAY_PIN, GPIO.HIGH)  # Force OFF
    GPIO.cleanup()
    print("Tout éteint ✓")