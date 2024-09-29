from flask import Flask, jsonify, request
import uuid
import hashlib
import pathlib
import fridgefresh

from inference_sdk import InferenceHTTPClient

app = Flask(__name__)

@app.route('/api/v1/process', methods = ["POST"])
def process_image():
    file = request.files["file"]
    stem = uuid.uuid4().hex
    file_path = f"{stem}{pathlib.Path(file.filename).suffix.lower()}"
    CLIENT = InferenceHTTPClient(
        api_url="https://outline.roboflow.com",
        api_key="API_KEY"
    )
    result = CLIENT.infer(file_path, model_id="food-detection-7xta0/1")
    return result

@app.route('/api/v1/users/<username>/', methods = ["GET"])
def get_user(username):
    """Return data on the user <username>"""
    # user = model.get_one_user(username)
    connection = fridgefresh.model.get_db()
    cur = connection.execute(
        "SELECT * FROM users "
        "WHERE username=?",
        (username, )
    )
    user = cur.fetchone()
    if not user:
        return jsonify({}), 404
    return jsonify({user}, 200)


@app.route('/api/v1/users/', methods = ["GET"])
def get_all_users():
    """Return data on the user <username>"""
    # user = model.get_one_user(username)
    connection = fridgefresh.model.get_db()
    cur = connection.execute(
        "SELECT * FROM users "
    )
    users = cur.fetchall()
    return jsonify({users}, 200)


@app.route('/api/v1/users/', methods = ["POST"])
def add_user():
    """Create new user"""
    username = request.json.get("username", None)
    fullname = request.json.get("fullname", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    connection = fridgefresh.model.get_db()
    cur = connection.execute(
        "SELECT * FROM users "
        "WHERE username=?",
        (username, )
    )
    user = cur.fetchone()
    if user:
        return jsonify({}, 409)  
    salt = uuid.uuid4().hex
    hash_obj = hashlib.new('sha512')
    password_salted = salt + password
    hash_obj.update(password_salted.encode('utf-8'))
    password_hash = hash_obj.hexdigest()
    password_final = "$".join(['sha512', salt, password_hash])
    connection.execute(
        "INSERT INTO users (username, fullname, password, email)"
        "VALUES (?, ?, ?, ?)",
        (username, fullname, password_final, email)
    )
    connection.commit()
    user = {
        "username": username,
        "fullname": fullname,
        "email": email,
        "password": password_final
    }
    return jsonify({user}, 200)