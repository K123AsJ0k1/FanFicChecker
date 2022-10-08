from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS, cross_origin

#app = Flask(__name__)
app = Flask(__name__,static_folder='./frontend/build',static_url_path='')

@cross_origin()
@app.route("/api/model", methods=["get","post"])
def model():
    data = request.json
    return jsonify({'status': 200}) 

@app.route("/")
def serve():
    return send_from_directory(app.static_folder, 'index.html')
