import requests

# Example input for the alert engine to fetch churn prediction
sample_input = {
    "behavior_metrics_usage_score": 30,  # High churn risk example
    "behavior_metrics_support_tickets": 7
}

response = requests.post('http://127.0.0.1:5000/predict', json=sample_input)

if response.status_code == 200:
    result = response.json()
    churn_prob = result['churn_probability']
    churn_pred = result['churn_prediction']
    # Example alert logic: trigger if churn probability > 0.7
    if churn_prob > 0.7:
        print(f"ALERT: High churn risk detected! Probability: {churn_prob:.2f}")
    else:
        print(f"No alert. Churn probability: {churn_prob:.2f}")
else:
    print(f"API Error: {response.status_code}")
