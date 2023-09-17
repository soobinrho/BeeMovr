from flask import Flask, request, jsonify
from flask_cors import CORS  # Import the CORS extension

app = Flask(__name__)
CORS(app)  # Enable CORS for your Flask app
# Replace this with your bee value calculation logic
def calculate_bee_value(lat, lng):
    # Sample calculation: bee value is the sum of lat and lng
    bee_value = lat + lng
    return bee_value

@app.route('/getBeeValue', methods=['GET'])
def get_bee_value():
    try:
        lat = float(request.args.get('lat'))
        lng = float(request.args.get('lng'))

        bee_value = calculate_bee_value(lat, lng)

        response_data = {'value': bee_value}
        return jsonify(response_data), 200
    except ValueError:
        return jsonify({'error': 'Invalid input'}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
