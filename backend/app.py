import json
from flask import Flask, request, jsonify ,Response
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
import numpy as np
import tensorflow as tf
from PIL import Image
from tensorflow.keras.applications.efficientnet import preprocess_input
import cv2
import joblib

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# interpreter = tf.lite.Interpreter(model_path="../models/efficientnetb3-Skin Cancer-89.85.tflite")
# interpreter.allocate_tensors()
# input_details = interpreter.get_input_details()
# output_details = interpreter.get_output_details()

# class_labels = {0: 'benign', 1: 'malignant'}

model_pneumonia = tf.keras.models.load_model('../models/pneumonia_detection_model.h5')

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def prepare_image(filepath):
    img_size = 200
    img_array = cv2.imread(filepath, cv2.IMREAD_GRAYSCALE)
    resized_img = cv2.resize(img_array, (img_size, img_size))
    resized_img = resized_img.reshape(-1, img_size, img_size, 1) / 255.0
    return resized_img

# def preprocess_image_skin_cancer(image_path):
#     img = Image.open(image_path).resize((224, 224))
#     img_array = np.array(img)
#     img_array = preprocess_input(img_array)
#     img_array = np.expand_dims(img_array, axis=0)
#     img_array = img_array.astype(np.float32)
#     return img_array

# def infer_skin_cancer(image_path):
#     input_data = preprocess_image_skin_cancer(image_path)
#     interpreter.set_tensor(input_details[0]['index'], input_data)
#     interpreter.invoke()
#     output_data = interpreter.get_tensor(output_details[0]['index'])
#     prediction = np.argmax(output_data)
#     label = class_labels.get(prediction, 'unknown')
#     return label

model = joblib.load('../models/parkinsons_model.pkl')
scaler = joblib.load('../models/scaler.pkl')

@app.route('/parkinson', methods=['POST'])
def predict():
    try:
        # Extract features from the POST request
        data = request.json
        input_data = np.array(data['features']).reshape(1, -1)

        # Standardize the input data
        std_data = scaler.transform(input_data)

        # Make prediction using the loaded model
        prediction = model.predict(std_data)

        # Return the result as a JSON response
        result = "The Person has Parkinson's Disease" if prediction[0] == 1 else "The Person does not have Parkinson's Disease"
        return jsonify({"prediction": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# @app.route('/skin_cancer', methods=['POST'])
# def upload_file_skin_cancer():
#     if 'file' not in request.files:
#         return jsonify({"error": "No file part"}), 400
    
#     file = request.files['file']
    
#     if file and allowed_file(file.filename):
#         filename = secure_filename(file.filename)
#         filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#         file.save(filepath)

#         result = infer_skin_cancer(filepath)

#         return jsonify({"prediction": result}), 200
#     else:
#         return jsonify({"error": "Invalid file type"}), 400

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

MODEL_API_URL = "http://localhost:11434/api/generate"
HEADERS = {"Content-Type": "application/json"}

chat_history = []

def construct_prompt(history):
    """Construct a prompt string from chat history."""
    prompt = ""
    for entry in history:
        role = "User" if entry["role"] == "user" else "Model"
        prompt += f"{role}: {entry['content']}\n"
    prompt += "Model: "
    return prompt

@app.route('/chat', methods=['POST'])
def chat():
    global chat_history
    data = request.json
    print("Received request data:", data)

    prompt = data.get("message")
    stream = data.get("stream", False)

    if not prompt:
        return jsonify({"error": "No message provided"}), 400

    chat_history.append({"role": "user", "content": prompt})

    model_prompt = construct_prompt(chat_history)
    model_data = {
        "model": "medllama2:7b-q4_K_M",
        "prompt": model_prompt,
        "stream": stream
    }
    print("Sending data to model API:", model_data)

    def generate():
        try:
            response = request.post(MODEL_API_URL, headers=HEADERS, data=json.dumps(model_data), stream=True)

            if response.status_code == 200:
                accumulated_response = ""
                for chunk in response.iter_lines():
                    if chunk:
                        chunk_data = json.loads(chunk.decode('utf-8'))
                        response_text = chunk_data.get("response", "")
                        if response_text:
                            accumulated_response += response_text
                            yield response_text
                chat_history.append({"role": "model", "content": accumulated_response})
            else:
                yield f"Error: {response.text}"
        except request.RequestException as e:
            yield f"Request failed: {str(e)}"
    return Response(generate(), content_type='text/plain;charset=utf-8')

@app.route('/history', methods=['GET'])
def get_history():
    return jsonify({"history": chat_history})

if(__name__)=="__main__":
    app.run(debug=True)