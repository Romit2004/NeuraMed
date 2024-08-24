import json
from flask import Flask, request, jsonify, Response # type: ignore
from flask_cors import CORS # type: ignore
import os
from werkzeug.utils import secure_filename # type: ignore
import numpy as np # type: ignore
import tensorflow as tf # type: ignore
from PIL import Image # type: ignore
from tensorflow.keras.applications.efficientnet import preprocess_input # type: ignore
import cv2 # type: ignore
import joblib # type: ignore

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

interpreter = tf.lite.Interpreter(model_path="../models/efficientnetb3-Skin Cancer-89.85.tflite")
interpreter.allocate_tensors()
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

class_labels = {0: 'benign', 1: 'malignant'}

model_pneumonia = tf.keras.models.load_model('../models/pneumonia_detection_model.h5')

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
    interpreter.set_tensor(input_details[0]['index'], input_data)
    interpreter.invoke()
    output_data = interpreter.get_tensor(output_details[0]['index'])
    prediction = np.argmax(output_data)
    label = class_labels.get(prediction, 'unknown')
    return label

model = joblib.load('../models/parkinsons_model.pkl')
scaler = joblib.load('../models/scaler.pkl')

@app.route('/parkinson', methods=['POST'])
def predict():
    try:
        data = request.json
        input_data = np.array(data['features']).reshape(1, -1)
        std_data = scaler.transform(input_data)
        prediction = model.predict(std_data)
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
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        prepared_image = prepare_image(filepath)

        prediction = model_pneumonia.predict(prepared_image)
        predicted_label = 'PNEUMONIA' if prediction[0][0] < 0.5 else 'NORMAL'

        return jsonify({"prediction": predicted_label, "confidence": float(prediction[0][0])}), 200
    else:
        return jsonify({"error": "Invalid file type"}), 400
    
model = joblib.load('../models/heart_disease_model.pkl')
scaler = joblib.load('../models/scaler.pkl')

@app.route('/heart_disease', methods=['POST'])
def predict():
    try:
        data = request.json
        input_data = np.array(data['features']).reshape(1, -1)
        std_data = scaler.transform(input_data)
        prediction = model.predict(std_data)
        result = "The Person has Heart Disease" if prediction[0] == 1 else "The Person does not have Heart Disease"
        return jsonify({"prediction": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
