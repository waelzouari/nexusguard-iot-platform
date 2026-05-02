# NexusGuard Village Mini (ENIF 6.0 - IEEE ENIS 2026)

Plateforme web complète et professionnelle pour le monitoring WEF Nexus (Water-Energy-Food) sur Raspberry Pi.

## Prérequis matériels
- Raspberry Pi
- Capteur de température/humidité DHT22 (GPIO 17)
- Capteur d'humidité du sol avec module ADS1115 I2C (Canal 0)
- Capteur de distance à ultrasons HC-SR04 (TRIG=23, ECHO=24)
- Relais (Logique inversée) pour la pompe (GPIO 18)

## Installation sur Raspberry Pi

1. **Cloner le projet :**
   ```bash
   git clone <TON_LIEN_GITHUB>
   cd nexus_enif
   ```

2. **Créer un environnement virtuel (recommandé) :**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Installer les dépendances :**
   ```bash
   pip install -r requirements.txt
   ```
   *Note : assurez-vous que l'I2C est activé sur votre Raspberry Pi (`sudo raspi-config` > Interface Options > I2C).*

## Lancement

Pour démarrer la plateforme :
```bash
sudo python app.py
```
*`sudo` est souvent requis pour l'accès aux pins GPIO via RPi.GPIO.*

Une fois lancé, accédez au Dashboard via un navigateur :
`http://<IP_DE_LA_RASPBERRY_PI>:5000`

## Architecture WEF Nexus
Le système intègre une logique autonome ("Mode Automatique") qui vérifie 3 conditions avant d'activer la pompe :
- **FOOD :** Le sol doit être sec (< 40%).
- **ENERGY :** La température doit être sûre (< 45°C) pour protéger la pompe.
- **WATER :** Le niveau d'eau du réservoir doit être suffisant (> 20%).
Si les 3 conditions sont remplies, la pompe s'active automatiquement.
