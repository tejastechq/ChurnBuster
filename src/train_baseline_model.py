import pandas as pd
import numpy as np
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

# Load preprocessed data
df = pd.read_csv('preprocessed_sample_data.csv')


# Use the provided churn_label column, convert to int (0/1) if boolean or string
df['churn_label'] = df['churn_label'].astype(str).str.lower().map({'true': 1, 'false': 0, '1': 1, '0': 0}).astype(int)



# Features and target (use correct column names from preprocessed_sample_data.csv)
X = df[['usage_score', 'support_tickets']].values
y = df['churn_label'].values

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.4, random_state=42)

# Build a simple neural network model
def build_model():
    model = tf.keras.Sequential([
        tf.keras.layers.Input(shape=(2,)),
        tf.keras.layers.Dense(8, activation='relu'),
        tf.keras.layers.Dense(4, activation='relu'),
        tf.keras.layers.Dense(1, activation='sigmoid')
    ])
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    return model

model = build_model()

# Train model
model.fit(X_train, y_train, epochs=30, batch_size=2, verbose=0)

# Evaluate
y_pred_prob = model.predict(X_test)
y_pred = (y_pred_prob > 0.5).astype(int).flatten()
acc = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred)

# Save results
with open('baseline_model_results.txt', 'w') as f:
    f.write(f'Accuracy: {acc:.2f}\n')
    f.write(report)

print(f'Baseline model accuracy: {acc:.2f}')
print(report)
