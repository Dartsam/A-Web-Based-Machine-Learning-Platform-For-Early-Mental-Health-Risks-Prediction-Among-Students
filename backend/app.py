from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib, numpy as np

app = Flask(__name__)
CORS(app)

# Load model files
model = joblib.load('model/depression_model.pkl')
scaler = joblib.load('model/scaler.pkl')
feature_names = joblib.load('model/feature_names.pkl')


# Home Route
@app.route('/')
def home():
    return jsonify({
        'message': 'Mental Health ML API Running Successfully'
    })


# Health Route
@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'running'})


# Prediction Route
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # Arrange features correctly
        features = [data.get(f, 0) for f in feature_names]

        # Scale features
        features_scaled = scaler.transform([features])

        # Prediction
        prediction = model.predict(features_scaled)[0]
        probability = model.predict_proba(features_scaled)[0]

        confidence = round(float(max(probability)) * 100, 1)

        result = 'High risk' if prediction == 1 else 'Low risk'

        return jsonify({
            'prediction': result,
            'confidence': confidence,
            'depression_prob': round(float(probability[1]) * 100, 1)
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True, port=5000)