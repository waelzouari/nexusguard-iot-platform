# app.py — NexusGuard Village Mini (avec Login)
import eventlet
eventlet.monkey_patch()

import threading, logging
from flask import Flask, render_template, jsonify, request, redirect, url_for, session
from flask_socketio import SocketIO, emit
from functools import wraps

import config
import main as nexus
from actuators.pump import turn_on, turn_off, get_state

log = logging.getLogger("nexus.app")
app = Flask(__name__, template_folder="templates", static_folder="static")
app.config["SECRET_KEY"] = "nexusguard-enif-2026-secure"

socketio = SocketIO(app, async_mode="eventlet", cors_allowed_origins="*",
                    logger=False, engineio_logger=False)

# ─── Utilisateurs (démo hardcodés) ────────────────────────────
USERS = {
    "admin": "nexus2026",
    "demo":  "NexusDemo1",
}

def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if not session.get("logged_in"):
            return redirect(url_for("login"))
        return f(*args, **kwargs)
    return decorated

# ─── Scheduler ────────────────────────────────────────────────
_scheduler_thread = None

def start_scheduler():
    global _scheduler_thread
    if _scheduler_thread is None or not _scheduler_thread.is_alive():
        _scheduler_thread = threading.Thread(
            target=nexus.sensor_loop, args=(socketio,),
            daemon=True, name="NexusSensorLoop")
        _scheduler_thread.start()

# ─── Routes Auth ──────────────────────────────────────────────
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username", "").strip().lower()
        password = request.form.get("password", "")
        if USERS.get(username) == password:
            session["logged_in"] = True
            session["username"] = username
            return redirect(url_for("index"))
        return render_template("login.html", error="Identifiant ou mot de passe incorrect.", username=username)
    if session.get("logged_in"):
        return redirect(url_for("index"))
    return render_template("login.html", error=None, username="")

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))

# ─── Routes REST ──────────────────────────────────────────────
@app.route("/")
@login_required
def index():
    return render_template("index.html", username=session.get("username", ""))

@app.route("/api/status")
@login_required
def api_status():
    return jsonify(nexus.get_latest())

@app.route("/api/history")
@login_required
def api_history():
    return jsonify(nexus.get_history())

@app.route("/api/pump", methods=["POST"])
@login_required
def api_pump():
    data   = request.get_json(force=True, silent=True) or {}
    action = data.get("action", "toggle")
    mode   = data.get("mode", "manual")
    nexus.set_mode(mode)
    if action == "on":    result = turn_on()
    elif action == "off": result = turn_off()
    else: result = turn_on() if not get_state() else turn_off()
    with nexus._lock:
        nexus.latest_data["pump"] = get_state()
        nexus.latest_data["mode"] = mode
    socketio.emit("sensor_update", nexus.get_latest())
    return jsonify({**result, "mode": mode})

@app.route("/api/thresholds", methods=["POST"])
@login_required
def api_thresholds():
    data = request.get_json(force=True, silent=True) or {}
    mapping = {"soil_dry":"SOIL_DRY_PCT","soil_wet":"SOIL_WET_PCT",
               "water_min":"WATER_MIN_PCT","water_warn":"WATER_WARN_PCT",
               "temp_max":"TEMP_MAX_C","temp_warn":"TEMP_WARN_C"}
    updated = {}
    for key, attr in mapping.items():
        if key in data:
            try:
                val = float(data[key]); setattr(config, attr, val); updated[key] = val
            except (ValueError, TypeError): pass
    return jsonify({"updated": updated, "ok": True})

@app.route("/api/mode", methods=["POST"])
@login_required
def api_mode():
    data = request.get_json(force=True, silent=True) or {}
    mode = data.get("mode", "auto")
    if mode not in ("auto","manual"):
        return jsonify({"error": "mode invalide"}), 400
    nexus.set_mode(mode)
    return jsonify({"mode": mode, "ok": True})

# ─── WebSocket ────────────────────────────────────────────────
@socketio.on("connect")
def on_connect():
    emit("sensor_update", nexus.get_latest())
    emit("history_update", nexus.get_history())

@socketio.on("disconnect")
def on_disconnect():
    log.info("Client déconnecté : %s", request.sid)

@socketio.on("request_history")
def on_request_history():
    emit("history_update", nexus.get_history())

@socketio.on("pump_control")
def on_pump_control(data):
    action = data.get("action","toggle"); mode = data.get("mode","manual")
    nexus.set_mode(mode)
    if action == "on": turn_on()
    elif action == "off": turn_off()
    else: turn_on() if not get_state() else turn_off()
    with nexus._lock:
        nexus.latest_data["pump"] = get_state()
        nexus.latest_data["mode"] = mode
    socketio.emit("sensor_update", nexus.get_latest())

# ─── Lancement ────────────────────────────────────────────────
if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(message)s")
    start_scheduler()
    socketio.run(app, host=config.FLASK_HOST, port=config.FLASK_PORT, debug=config.DEBUG)
