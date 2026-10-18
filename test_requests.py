
import requests

BASE_URL = "http://127.0.0.1:5000/api"

def test_get_locations():
    response = requests.get(f"{BASE_URL}/locations")
    print("GET /locations:", response.json())

def test_post_location():
    new_location = {
        "latitude": 41.40,
        "longitude": -72.4,
        "marker_title": "Location 4",
        "marker_description": "Description for location 4"
    }
    response = requests.post(f"{BASE_URL}/locations", json=new_location)
    print("POST /locations:", response.json())

if __name__ == "__main__":
    test_get_locations()
    test_post_location()
    test_get_locations()