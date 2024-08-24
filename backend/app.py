from flask import Flask, request, jsonify # type: ignore
from flask_cors import CORS # type: ignore
import os
from werkzeug.utils import secure_filename # type: ignore
import numpy as np # type: ignore
import tensorflow as tf # type: ignore
from PIL import Image # type: ignore
from tensorflow.keras.applications.efficientnet import preprocess_input # type: ignore
import cv2 # type: ignore
from tensorflow.keras.models import load_model # type: ignore

app=Flask(__name__)
CORS(app)

model_pneumonia=tf.load_model('')

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