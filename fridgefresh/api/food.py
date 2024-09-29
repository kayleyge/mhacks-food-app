#@app.route('/api/v1/food/<username>/', methods = ["GET"])
from flask import Flask, request, jsonify, session
from uuid import uuid4
import fridgefresh

app = Flask(__name__)

# Simulate a database
food_inventory = {}

# Route to get the list of food items
@app.route('/api/v1/food/<username>/', methods=["GET"])
def get_food_items(username):
    user_inventory = food_inventory.get(username, [])
    return jsonify(user_inventory), 200

# Route to add a food item
@app.route('/api/v1/food/<username>/', methods=["POST"])
def add_food_item(username):
    data = request.json
    new_food_item = {
        'id': str(uuid4()),
        'name': data.get('name'),
        'manufacturingDate': data.get('manufacturingDate'),
        'expiryDate': data.get('expiryDate')
    }
    connection = fridgefresh.model.get_db()
    logname = session["username"]
    cur = connection.execute(
        "SELECT food WHERE name = ? AND username = ? ",
        (data.get('name'), logname )
    )
    food = cur.fetchone()
    if food is not None:
        return jsonify(food), 200
    connection.execute(
        "INSERT INTO food (name, owner, manufacturingDate, expiryDate VALUES (?, ?, ?, ?) ",
        (data.get('name'), logname, data.get('manufacturingDate'), data.get('expiryDate'))
    )
    cur = connection.execute(
        "SELECT foodid FROM food WHERE foodid = ?, owner = ?",
        (data.get('name'), logname, data.get('manufacturingDate'), data.get('expiryDate'))
    )
    return jsonify(new_food_item), 201

# Route to update a food item
@app.route('/api/v1/food/<username>/<foodid>/', methods=["PUT"])
def update_food_item(username, foodid):
    data = request.json
    
    connection = fridgefresh.model.get_db()
    cur = connection.execute(
        "UPDATE food SET name = ?, manufacturingDate = ?, expiryDate = ?, "
        "WHERE foodid = ? AND username = ?",
        (data.get('name'), data.get('manufacturingDate'), data.get('expiryDate'), username, foodid, )
    )
    food = cur.fetchone()
    if food is None:
        return jsonify(food), 404
    return jsonify(food), 200

# Route to delete a food item
@app.route('/api/v1/food/<username>/<foodid>/', methods=["DELETE"])
def delete_food_item(foodid):
    connection = fridgefresh.model.get_db()
    logname = session["username"]

    cur = connection.execute(
        "DELETE FROM food WHERE foodid = ? AND username = ? ",
        (foodid, logname, )
    )
    food = cur.fetchone()
    return '', 204

if __name__ == "__main__":
    app.run(debug=True)
