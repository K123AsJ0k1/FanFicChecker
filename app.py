from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS, cross_origin
from sklearn import preprocessing
from sklearn.feature_extraction.text import CountVectorizer
import numpy as np
import pandas as pd
import pickle
app = Flask(__name__,static_folder='./frontend/build',static_url_path='')
#app = Flask(__name__)
rating_model = pickle.load(open('./new_rating_model.pkl', 'rb'))
category_model = pickle.load(open('./categories_model_27_correct_index.pkl', 'rb'))
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

    #categories = ['Action', 'Biography', 'Essay', 'Fable', 'Family', 'Fantasy', 'Friendship', 'General', 'Haiku', 'Historical', 'Horror', 'Humor', 'Kids', 'Life', 'Love', 'Manga', 'Mystery', 'Mythology', 'Nature', 'Play', 'Politics', 'Religion', 'Romance', 'School', 'Sci-Fi', 'Song', 'Spiritual', 'Supernatural', 'Thriller', 'War', 'Western', 'Work', 'Young Adult']
    categories = ['Action', 'Biography', 'Fable', 'Family', 'Fantasy', 'Friendship', 'Historical', 'Horror', 'Humor', 'Kids', 'Life', 'Love', 'Manga', 'Mystery', 'Mythology', 'Nature', 'Play', 'Politics', 'Religion', 'Romance', 'School', 'Sci-Fi', 'Spiritual', 'Supernatural', 'Thriller', 'War', 'Young Adult']
    #categories = ['Action', 'Biography', 'Fable', 'Family', 'Fantasy', 'Friendship', 'Historical', 'Horror', 'Humor', 'Kids', 'Life', 'Love', 'Manga', 'Mystery', 'Mythology', 'Nature', 'Play', 'Politics', 'Religion', 'Romance', 'School', 'Sci-Fi', 'Spiritual', 'Supernatural', 'Thriller', 'War', 'Western', 'Work', 'Young Adult']
    rating_value = None
    rating_dist = None
    category_value = None
    category_dist = None
    category_top_6_labels = None
    category_top_6_dist = None
    #print(len(categories))
    try:
        rating_vectorizer = CountVectorizer(vocabulary = model_dict, dtype = np.int16)
        X = rating_vectorizer.fit_transform([data['text']])
        sums = X.sum(axis = 1)
        X = X/sums
        X = np.array(X)
        rating_prediction = rating_model.predict(X)
        r_dist = rating_model.predict_proba(X)
        category_prediction = category_model.predict(X)
        c_dist = category_model.predict_proba(X)
        #index = int(category_prediction[0])
        category_dist = list(c_dist[0])
        category = categories[int(category_prediction[0])]

        min = np.median(np.array(category_dist))
        #print(min)
        radar_dist = 5*(category_dist-min)/(max(category_dist)-min)
        #temp_index = np.argsort(radar_dist)
        #temp_6 = temp_index[len(temp_index)-6:,]
        
        li = []
        for i in range(len(radar_dist)):
            li.append([radar_dist[i],i])
        
        li.sort()
        sort_index = []
        for x in li:
            sort_index.append(x[1])
        #print(category_top_6_index)
        category_top_6_index = sort_index[21:28]
        #print(category_top_6_index)
        category_top_6_index.sort()
        
        #category_top_6_index.reverse()
        category_top_6_dist = []
        for x in category_top_6_index:
            category_top_6_dist.append(radar_dist[x])

        category_top_6_labels = []
        for x in category_top_6_index:
            category_top_6_labels.append(categories[x])
        #print(category_top_6_index)
        #print(category_top_6_labels)
        #print(category_top_6_labels)
        #print(radar_dist)
        #print(category_top_6_index)
        #print(category_top_6_dist)
        rating_dist = list(r_dist[0])
        rating_value = int(rating_prediction[0])
    except Exception as e:
        rating_value = 0
        rating_dist = [0, 0, 0, 0]
        category = 'Null'
        category_dist = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        category_top_6_labels = ['Null','Null','Null','Null','Null','Null']
        category_top_6_dist = [0, 0, 0, 0, 0, 0]

    rating = None
    if rating_value == 0:
        rating = 'T'
    if rating_value == 1:
        rating = 'M'
    if rating_value == 2:
        rating = 'K'
    if rating_value == 3:
        rating = 'K+'
    #print(rating_dist[0])
    #'category':category,
    return jsonify({'status': 200, 'rating': rating, 'r_d': rating_dist, 'c_d': category_dist, 'c_top_6_l':category_top_6_labels, 'c_top_6_d':category_top_6_dist}) 
    
@app.route("/")
def serve():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '_main_':
    app.run()