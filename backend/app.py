import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
import numpy as np
import tensorflow as tf
from PIL import Image
from tensorflow.keras.applications.efficientnet import preprocess_input
import cv2
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load models
skin_cancer_interpreter = tf.lite.Interpreter(model_path="../models/efficientnetb3-Skin Cancer-89.85.tflite")
skin_cancer_interpreter.allocate_tensors()
skin_cancer_input_details = skin_cancer_interpreter.get_input_details()
skin_cancer_output_details = skin_cancer_interpreter.get_output_details()

pneumonia_model = tf.keras.models.load_model('../models/pneumonia_detection_model.h5')
parkinsons_model = joblib.load('../models/parkinsons_model.pkl')
parkinsons_scaler = joblib.load('../models/scaler.pkl') 
heart_disease_model = joblib.load('../models/heart_disease_model.pkl')
heart_disease_scaler = joblib.load('../models/scaler.pkl')

class_labels = {0: 'benign', 1: 'malignant'}

# Function
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def prepare_image(filepath):
    img_size = 200
    img_array = cv2.imread(filepath, cv2.IMREAD_GRAYSCALE)
    resized_img = cv2.resize(img_array, (img_size, img_size))
    resized_img = resized_img.reshape(-1, img_size, img_size, 1) / 255.0
    return resized_img

def preprocess_image_skin_cancer(image_path):
    img = Image.open(image_path).resize((224, 224))
    img_array = np.array(img)
    img_array = preprocess_input(img_array)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array.astype(np.float32)
    return img_array

def infer_skin_cancer(image_path):
    input_data = preprocess_image_skin_cancer(image_path)
    skin_cancer_interpreter.set_tensor(skin_cancer_input_details[0]['index'], input_data)
    skin_cancer_interpreter.invoke()
    output_data = skin_cancer_interpreter.get_tensor(skin_cancer_output_details[0]['index'])
    prediction = np.argmax(output_data)
    label = class_labels.get(prediction, 'unknown')
    return label

# Routes
@app.route('/parkinson', methods=['POST'])
def predict_parkinson():
    try:
        data = request.json
        input_data = np.array(data['features']).reshape(1, -1)
        std_data = parkinsons_scaler.transform(input_data)
        prediction = parkinsons_model.predict(std_data)
        result = "The Person has Parkinson's Disease" if prediction[0] == 1 else "The Person does not have Parkinson's Disease"
        return jsonify({"prediction": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/skin_cancer', methods=['POST'])
def upload_file_skin_cancer():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        result = infer_skin_cancer(filepath)

        return jsonify({"prediction": result}), 200
    else:
        return jsonify({"error": "Invalid file type"}), 400

@app.route('/pneumonia', methods=['POST'])
def upload_file_pneumonia():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        prepared_image = prepare_image(filepath)
        prediction = pneumonia_model.predict(prepared_image)
        predicted_label = 'PNEUMONIA' if prediction[0][0] < 0.5 else 'NORMAL'

        return jsonify({"prediction": predicted_label, "confidence": float(prediction[0][0])}), 200
    else:
        return jsonify({"error": "Invalid file type"}), 400

@app.route('/heart_disease', methods=['POST'])
def predict_heart():
    data = request.json.get('data')

    input_data = np.array([
        data['age'],
        data['sex'],
        data['cp'],
        data['trestbps'],
        data['chol'],
        data['fbs'],
        data['restecg'],
        data['thalach'],
        data['exang'],
        data['oldpeak'],
        data['slope'],
        data['ca'],
        data['thal']
    ])

    input_data_reshaped = input_data.reshape(1, -1)

    prediction = heart_disease_model.predict(input_data_reshaped)

    result = 'The person has heart disease' if prediction[0] == 1 else 'The person does not have heart disease'
    return jsonify({'prediction': result})

model = joblib.load('../models/decision_tree_model.pkl')


feature_columns = ['age', 'gender', 'polyuria', 'polydipsia', 'sudden_weight_loss',
                   'weakness', 'polyphagia', 'genital_thrush', 'visual_blurring',
                   'itching', 'irritability', 'delayed_healing', 'partial_paresis',
                   'muscle_stiffness', 'alopecia', 'obesity']

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    input_data = pd.DataFrame([data], columns=feature_columns)
    prediction = model.predict(input_data)[0]
    result = "Diabetic" if prediction == 1 else "Not Diabetic"
    return jsonify({"prediction": result})

if __name__ == "__main__":
    app.run(debug=True)
