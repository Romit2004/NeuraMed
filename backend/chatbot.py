from flask import Flask, request, Response, jsonify # type: ignore
import requests # type: ignore
import json
from flask_cors import CORS # type: ignore

app = Flask(__name__)
CORS(app)

MODEL_API_URL = "http://localhost:11434/api/generate"
HEADERS = {"Content-Type": "application/json"}

chat_history = []

def construct_prompt(history):
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
            response = requests.post(MODEL_API_URL, headers=HEADERS, data=json.dumps(model_data), stream=True)

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
        except requests.RequestException as e:
            yield f"Request failed: {str(e)}"
    return Response(generate(), content_type='text/plain;charset=utf-8')

@app.route('/history', methods=['GET'])
def get_history():
    return jsonify({"history": chat_history})

if __name__ == "__main__":
    app.run(port=5001)