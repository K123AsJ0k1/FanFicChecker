from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS, cross_origin
from sklearn import preprocessing
from sklearn.feature_extraction.text import CountVectorizer
import numpy as np
import pandas as pd
import pickle
app = Flask(__name__,static_folder='./frontend/build',static_url_path='')
#app = Flask(__name__)
model = pickle.load(open('./model.pkl', 'rb'))
#CORS(app)

def create_dict():
    label_csv = open('Word_labels.csv', 'r')
    label_dict = {}
    header = True
    for line in label_csv.readlines():
        if header:
            header = False
            continue
        values = line.split('|')
        label_dict[values[1].strip()] = int(values[0])
    return label_dict

model_dict = create_dict()

@cross_origin()
@app.route("/api/model", methods=["get","post"])
def apiModel():
    data = request.json

    value = None
    rating_dist = None
    try:
        vectorizer = CountVectorizer(vocabulary = model_dict, dtype = np.int16)
        X = vectorizer.fit_transform([data['text']])
        sums = X.sum(axis = 1)
        X = X/sums
        X = np.array(X)
        prediction = model.predict(X)
        dist = model.predict_proba(X)
        rating_dist = list(dist[0])
        value = int(prediction[0])
    except Exception as e:
        value = 0
        rating_dist = [0, 0, 0, 0]

    rating = None
    if value == 0:
        rating = 'T'
    if value == 1:
        rating = 'M'
    if value == 2:
        rating = 'K'
    if value == 3:
        rating = 'K+'
    #print(rating_dist[0])
    return jsonify({'status': 200, 'rating': rating, 'r_d': rating_dist}) 
    
@app.route("/")
def serve():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '_main_':
    app.run()