# app.py
from flask import Flask, jsonify, request
import time

app = Flask(__name__)

locations = [
    {
        "id": 1,
        "latitude": 41.37937613418269,
        "longitude": -72.10613281840935,
        "marker_title": "Cro Blvd, Connecticut College",
        "marker_description": "Construction on Cro Blvd for Pedestrain Project. Recommended Route: Going through Resevoir Street or passing through Central Campus Houses (Plant, Brandford, Smith, and Burdick)",
        "vote_count": 32,
        "image_path": "/images/croblvd.png",
        "comments": ["How long will the construction last?"],
    },
    {
        "id": 2,
        "latitude": 41.351505585433806, 
        "longitude": -72.09735330096298,
        "marker_title": "Corner of Tilly & Bank St.",
        "marker_description": "Pedestrian Signal with lack of WAIT Locator Tone",
        "vote_count": 18,
        "image_path": "/images/pedestrian.jpg",
        "comments": []
    },
    {
        "id": 3,
        "latitude": 41.382631314999664,
        "longitude": -72.10870974508146,
        "marker_title": "No Sidewalk by Johnson House",
        "marker_description": "There is no sidewalk to get to Johnson House. Recommended route: through the inside of the Plex building.",
        "vote_count": 0,
        "image_path": '/images/johnson.png'
    },
    {
        "id": 4,
        "latitude": 41.380543243928535, 
        "longitude": -72.10430701687632,
        "marker_title": "Route 32 Corridor Study",
        "marker_description": "There is a current corridor study conducted by the Southeastern Connecticut Council of Governments (SCCOG), the City of New London, and the Connecticut Department of Transportation (CTDOT).",
        "vote_count": 5,
        "image_path": '/images/route-32.png'
    },
    {
        "id": 5,
        "latitude": 41.38060916258243, 
        "longitude": -72.10604726333875, 
        "marker_title": "Disability Cultural Center @ Conn Opened!",
        "marker_description": "The Disability Cultural Center at Connecticut College opened in Smith/Burdick House this academic year. TThe Disability Cultural Center affirms and celebrates disability by exploring the intersectionality of identities, creating community support, celebrating disability culture, and advocating for disability justice. The Grand Opening is happening April 1, 2025! Save the Date!",
        "vote_count": 50,
        "image_path": '/images/dac.png'
    }
]

@app.route('/api/locations')
def location():
    return jsonify(locations)

@app.route('/api/locations', methods=['POST'])
def add_location():
    new_location = request.get_json()
    new_location['id'] = locations[-1]['id'] + 1 if locations else 1
    new_location['vote_count'] = 0
    new_location['comments'] = []
    locations.append(new_location)
    return jsonify(new_location), 201

@app.route('/api/locations/<int:id>')
def location_by_id(id):
    for location in locations:
        if location['id'] == id:
            return jsonify(location)
    return jsonify({"message": "Location not found."})

@app.route('/api/locations/<int:id>/vote', methods=['POST'])
def vote_location(id):
    data = request.get_json()
    for location in locations:
        if location['id'] == id:
            print("location found")
            if data.get('action') == 'increment':
                location['vote_count'] += 1
            elif data.get('action') == 'decrement':
                location['vote_count'] -= 1
            return jsonify(location)
    return jsonify({"message": "Location not found."}), 404

@app.route('/')
def index():
    return "Hello, World!"

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}