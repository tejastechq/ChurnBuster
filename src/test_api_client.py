import requests

url = 'http://127.0.0.1:5000/predict'
data = {
    "behavior_metrics_usage_score": 70,
    "behavior_metrics_support_tickets": 3
}

response = requests.post(url, json=data)
print("Status Code:", response.status_code)
print("Response JSON:", response.json())
