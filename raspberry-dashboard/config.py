# config.py — NexusGuard Village Mini
# Configuration centralisée : GPIO pins + seuils Nexus WEF

# ─── GPIO PINS ──────────────────────────────────────────────
GPIO_DHT22     = 17   # Capteur DHT22 (température + humidité air)
GPIO_TRIG      = 23   # HC-SR04 Trigger (niveau eau)
GPIO_ECHO      = 24   # HC-SR04 Echo (niveau eau)
GPIO_RELAY     = 18   # Relais pompe (logique INVERSÉE : HIGH=OFF, LOW=ON)

# ─── ADS1115 I2C ────────────────────────────────────────────
ADS_CHANNEL    = 0    # Canal ADS1115 pour capteur sol
SOIL_DRY_VAL   = 28000
SOIL_WET_VAL   = 11000

# ─── RÉSERVOIR ──────────────────────────────────────────────
TANK_HEIGHT_CM = 30.0  # Hauteur totale du réservoir (cm)
TANK_OFFSET_CM = 2.0   # Distance entre capteur et surface max de l'eau

# ─── SEUILS NEXUS WEF ───────────────────────────────────────
# Water — niveau réservoir
WATER_MIN_PCT   = 20   # % minimum avant alerte (rouge)
WATER_WARN_PCT  = 40   # % avertissement (jaune)

# Energy — température ambiante
TEMP_MAX_C      = 45   # °C maximum pour protection pompe
TEMP_WARN_C     = 38   # °C avertissement

# Food — humidité sol
SOIL_DRY_PCT    = 40   # % → déclenche irrigation
SOIL_WET_PCT    = 70   # % → arrêt irrigation

# Humidité air
HUMIDITY_MIN    = 30   # % humidité air minimum (avertissement)

# ─── LECTURE CAPTEURS ────────────────────────────────────────
SENSOR_INTERVAL = 5    # secondes entre chaque lecture
HISTORY_MINUTES = 30   # durée historique graphique

# ─── FLASK ──────────────────────────────────────────────────
FLASK_HOST      = "0.0.0.0"
FLASK_PORT      = 5000
DEBUG           = False
