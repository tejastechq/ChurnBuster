import pandas as pd
import tensorflow as tf
from flask import Flask, request, jsonify
import numpy as np
import joblib

# Load model weights (retrain if needed, or use in-memory model for demo)
# For simplicity, we'll retrain the model on startup using the latest data

def build_model():
    model = tf.keras.Sequential([
        tf.keras.layers.Input(shape=(2,)),
        tf.keras.layers.Dense(8, activation='relu'),
        tf.keras.layers.Dense(4, activation='relu'),
        tf.keras.layers.Dense(1, activation='sigmoid')
    ])
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    return model

def train_and_get_model():
    df = pd.read_csv('preprocessed_sample_data.csv')
    X = df[['behavior_metrics_usage_score', 'behavior_metrics_support_tickets']].values
    y = df['churn_label'].astype(str).str.lower().map({'true': 1, 'false': 0, '1': 1, '0': 0}).astype(int).values
    model = build_model()
    model.fit(X, y, epochs=30, batch_size=2, verbose=0)
    return model

model = train_and_get_model()

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    try:
        usage_score = float(data['behavior_metrics_usage_score'])
        support_tickets = int(data['behavior_metrics_support_tickets'])
    except (KeyError, ValueError):
        return jsonify({'error': 'Invalid input. Required: behavior_metrics_usage_score (float), behavior_metrics_support_tickets (int)'}), 400
    X = np.array([[usage_score, support_tickets]])
    prob = float(model.predict(X)[0][0])
    prediction = int(prob > 0.5)
    return jsonify({'churn_probability': prob, 'churn_prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)
