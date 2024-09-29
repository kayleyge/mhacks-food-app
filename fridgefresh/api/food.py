#@app.route('/api/v1/food/<username>/', methods = ["GET"])
from flask import Flask, request, jsonify
from uuid import uuid4

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
    if username not in food_inventory:
        food_inventory[username] = []
    food_inventory[username].append(new_food_item)
    return jsonify(new_food_item), 201

# Route to update a food item
@app.route('/api/v1/food/<username>/<item_id>/', methods=["PUT"])
def update_food_item(username, item_id):
    data = request.json
    user_inventory = food_inventory.get(username, [])
    for item in user_inventory:
        if item['id'] == item_id:
            item['name'] = data.get('name')
            item['manufacturingDate'] = data.get('manufacturingDate')
            item['expiryDate'] = data.get('expiryDate')
            return jsonify(item), 200
    return jsonify({'error': 'Item not found'}), 404

# Route to delete a food item
@app.route('/api/v1/food/<username>/<item_id>/', methods=["DELETE"])
def delete_food_item(username, item_id):
    user_inventory = food_inventory.get(username, [])
    food_inventory[username] = [item for item in user_inventory if item['id'] != item_id]
    return '', 204

if __name__ == "__main__":
    app.run(debug=True)
