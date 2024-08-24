from flask import Flask, request, jsonify 
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename 
import numpy as np 
import tensorflow as tf 
from PIL import Image 
from tensorflow.keras.applications.efficientnet import preprocess_input 
import cv2 

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

model_pneumonia = tf.keras.models.load_model('../models/pneumonia_detection_model.h5')

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def prepare_image(filepath):
    img_size = 200
    img_array = cv2.imread(filepath, cv2.IMREAD_GRAYSCALE)
    resized_img = cv2.resize(img_array, (img_size, img_size))
    resized_img = resized_img.reshape(-1, img_size, img_size, 1) / 255.0
    return resized_img

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


if(__name__)=="__main__":
    app.run(debug=True)