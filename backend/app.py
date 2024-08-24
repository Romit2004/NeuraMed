from flask import Flask,request,jsonify
from tensorflow import Tensorflow as tf
app=Flask(__name__)

pneumonia_model=tf.load_model('/model/')

@app.route('/pneumonia',methods=['POST'])
def pneumonia():
    data = request.json


if(__name__)=="__main__":
    app.run(debug=True)