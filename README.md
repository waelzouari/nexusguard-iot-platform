# 🌿 NexusGuard Village — Plateforme IoT Agricole Intelligente
> **ENIF 6.0 — IEEE ENIS Student Branch | 2026**

Ce dépôt contient **deux plateformes complémentaires** constituant l'écosystème NexusGuard Village Mini :

| Plateforme | Dossier | Technologie | Rôle |
|---|---|---|---|
| 🌐 Site Marketing | `marketing-site/` | React + Vite + Tailwind CSS | Vitrine commerciale & prise de commande |
| 📊 Dashboard IoT | `raspberry-dashboard/` | Flask + SocketIO + Python | Monitoring temps réel sur Raspberry Pi |

---

## 📁 Structure du projet

```
nexusguard-marketing/
├── marketing-site/          # Site vitrine React (frontend)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Product.jsx
│   │   │   ├── HowItWorks.jsx
│   │   │   ├── Impact.jsx
│   │   │   ├── OrderModal.jsx
│   │   │   └── Footer.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── raspberry-dashboard/     # Dashboard IoT Python (backend Raspberry Pi)
    ├── sensors/
    │   ├── dht22.py          # Température + humidité air
    │   ├── soil.py           # Humidité sol (ADS1115)
    │   └── ultrasonic.py     # Niveau eau réservoir (HC-SR04)
    ├── actuators/
    │   └── pump.py           # Contrôle relais pompe
    ├── templates/            # Interface HTML (Jinja2)
    ├── static/               # CSS / JS / assets
    ├── app.py                # Serveur Flask + WebSocket
    ├── main.py               # Boucle capteurs + logique auto
    ├── config.py             # Configuration GPIO + seuils WEF
    └── requirements.txt
```

---

## 🌐 Plateforme 1 — Site Marketing (`marketing-site`)

### Description

Site web vitrine présentant la solution NexusGuard Village Mini. Il comprend :
- **Hero** : accroche visuelle avec call-to-action
- **Produit** : présentation détaillée du kit IoT
- **Comment ça marche** : explication du cycle WEF Nexus
- **Impact** : données et bénéfices agricoles
- **Commande** : formulaire de prise de commande (modal)
- **Footer** : coordonnées et liens

### Prérequis

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

```bash
node --version   # vérifier Node.js
npm --version    # vérifier npm
```

### Installation

```bash
# 1. Se placer dans le dossier du site
cd marketing-site

# 2. Installer les dépendances
npm install
```

### Lancement en développement

```bash
npm run dev
```

Le site sera accessible sur : **http://localhost:5173**

> ⚠️ Si le port 5173 est déjà occupé, Vite utilisera automatiquement le port suivant disponible (ex: 5174).

### Build production

```bash
npm run build
# Les fichiers compilés seront dans le dossier dist/

npm run preview   # Prévisualiser le build de production
```

### Stack technique

- **React 19** — UI composants
- **Vite 8** — Bundler ultra-rapide
- **Tailwind CSS 4** — Styles utilitaires
- **ESLint** — Qualité du code

---

## 📊 Plateforme 2 — Dashboard IoT (`raspberry-dashboard`)

### Description

Application web temps réel tournant sur un **Raspberry Pi**. Elle surveille en continu les capteurs du système d'irrigation intelligente selon le modèle **WEF Nexus** (Water–Energy–Food) :

| Axe | Capteur | Pin / Interface | Indicateur |
|---|---|---|---|
| 💧 Water | HC-SR04 (ultrasons) | TRIG=23, ECHO=24 | Niveau réservoir (%) |
| ⚡ Energy | DHT22 | GPIO 17 | Température ambiante (°C) |
| 🌱 Food | Capteur sol + ADS1115 | I2C Canal 0 | Humidité sol (%) |

#### Fonctionnalités
- 📡 **Temps réel** via WebSocket (Flask-SocketIO)
- 🤖 **Mode Automatique** : irrigation déclenchée si les 3 conditions WEF sont réunies
- 🖐️ **Mode Manuel** : contrôle direct de la pompe
- 📈 **Historique** graphique sur 30 minutes
- 🔐 **Authentification** par login/mot de passe
- ⚙️ **Seuils configurables** depuis l'interface

### Prérequis matériels

- **Raspberry Pi** (modèle 3B+ ou 4 recommandé)
- Capteur DHT22 → GPIO 17
- Module ADS1115 (I2C) + capteur d'humidité sol → Canal 0
- Capteur ultrasons HC-SR04 → TRIG=23, ECHO=24
- Relais (logique inversée) + pompe → GPIO 18

### Prérequis logiciels

- **Python** ≥ 3.9
- **pip** ≥ 22
- **I2C activé** sur le Raspberry Pi

```bash
# Activer I2C si ce n'est pas déjà fait
sudo raspi-config
# → Interface Options → I2C → Enable
```

### Installation sur Raspberry Pi

```bash
# 1. Cloner le dépôt
git clone <URL_DU_DEPOT>
cd nexusguard-marketing/raspberry-dashboard

# 2. Créer un environnement virtuel Python
python3 -m venv venv
source venv/bin/activate

# 3. Installer les dépendances Python
pip install -r requirements.txt
```

### Lancement

```bash
# Activer l'environnement virtuel (si pas déjà actif)
source venv/bin/activate

# Lancer le serveur Flask
sudo python app.py
```

> ⚠️ `sudo` est requis pour l'accès aux broches GPIO via `RPi.GPIO`.

Le dashboard sera accessible depuis n'importe quel appareil sur le réseau local :

```
http://<IP_DE_LA_RASPBERRY_PI>:5000
```

Pour trouver l'adresse IP de la Raspberry Pi :
```bash
hostname -I
```

### Accès & Authentification

| Utilisateur | Mot de passe |
|---|---|
| `admin` | `nexus2026` |
| `demo` | `NexusDemo1` |

### Logique d'irrigation automatique

Le **Mode Automatique** vérifie 3 conditions simultanément avant d'activer la pompe :

```
✅ FOOD  : Humidité sol < 40%    (sol trop sec → besoin d'eau)
✅ ENERGY: Température < 45°C   (protection pompe contre la chaleur)
✅ WATER : Niveau réservoir > 20% (eau disponible dans le réservoir)
```

La pompe s'arrête automatiquement quand l'humidité sol atteint **70%**.

### Dépendances Python

```
flask >= 2.3.0
flask-socketio >= 5.3.6
eventlet >= 0.33.3
adafruit-circuitpython-dht >= 3.7.8
adafruit-circuitpython-ads1x15 >= 2.2.23
RPi.GPIO >= 0.7.1
board
busio
```

---

## 🚀 Lancer les deux plateformes simultanément

```bash
# Terminal 1 — Site Marketing (machine de développement)
cd marketing-site
npm install && npm run dev
# → http://localhost:5173

# Terminal 2 — Dashboard IoT (Raspberry Pi)
cd raspberry-dashboard
source venv/bin/activate
sudo python app.py
# → http://<IP_RASPBERRY>:5000
```

---

## ⚙️ Configuration des seuils (`config.py`)

Les seuils WEF sont tous centralisés dans `raspberry-dashboard/config.py` :

```python
SOIL_DRY_PCT    = 40    # % humidité sol → déclenche l'irrigation
SOIL_WET_PCT    = 70    # % humidité sol → arrêt irrigation
WATER_MIN_PCT   = 20    # % niveau eau minimum (alerte rouge)
WATER_WARN_PCT  = 40    # % niveau eau avertissement (alerte jaune)
TEMP_MAX_C      = 45    # °C maximum (protection pompe)
TEMP_WARN_C     = 38    # °C avertissement
SENSOR_INTERVAL = 5     # secondes entre chaque lecture capteurs
HISTORY_MINUTES = 30    # durée de l'historique affiché
```

Ces seuils peuvent également être modifiés **en direct** depuis l'interface du dashboard (panneau Paramètres).

---

## 🛠️ Dépannage fréquent

| Problème | Solution |
|---|---|
| `Port 5173 already in use` | Vite bascule automatiquement sur 5174 — aucune action requise |
| `Permission denied` GPIO | Utiliser `sudo python app.py` |
| `OSError: [Errno 121]` I2C | Vérifier câblage ADS1115 + activer I2C via `raspi-config` |
| DHT22 retourne `None` | Vérifier résistance pull-up 10kΩ + câblage GPIO 17 |
| Dashboard inaccessible | Vérifier l'IP avec `hostname -I` + pare-feu désactivé |
| `npm install` échoue | Vérifier version Node.js ≥ 18 avec `node --version` |

---

## 👥 Équipe

**NexusGuard Village Mini** — ENIF 6.0 | IEEE ENIS Student Branch | 2026

---

*Projet IoT agricole à impact social — Solution Water–Energy–Food Nexus*
