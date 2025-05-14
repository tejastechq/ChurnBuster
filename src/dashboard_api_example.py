import requests

# Example input for the dashboard to fetch churn prediction
sample_input = {
    "behavior_metrics_usage_score": 70,
    "behavior_metrics_support_tickets": 3
}

response = requests.post('http://127.0.0.1:5000/predict', json=sample_input)

if response.status_code == 200:
    result = response.json()
    print(f"Churn Probability: {result['churn_probability']:.2f}")
    print(f"Churn Prediction: {'Yes' if result['churn_prediction'] else 'No'}")
else:
    print(f"API Error: {response.status_code}")
