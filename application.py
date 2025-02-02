from flask import Flask , request , jsonify , render_template , redirect  , url_for
import pickle
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler


application=Flask(__name__)
app=application

ridge_model=pickle.load(open("models/ridge.pkl" , 'rb'))
standard_scaler=pickle.load(open("models/scaler.pkl" , 'rb'))

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/result/<float:result>")
def result(result):
    return render_template("result.html" , result=result)
    

@app.route("/predict" , methods=["GET" , "POST"])
def predict():
    if request.method=="POST":
        
        Temperature=float(request.form.get('Temperature'))
        RH = float(request.form.get('RH'))
        WS = float(request.form.get('Ws'))
        Rain = float(request.form.get('Rain'))
        FFMC = float(request.form.get('FFMC'))
        DMC = float(request.form.get('DMC'))
        ISI = float(request.form.get('ISI'))
        Classes = float(request.form.get('Classes'))
        Region = float(request.form.get('Region'))
        
        
        new_data_scaled=standard_scaler.transform([[Temperature, RH, WS, Rain, FFMC, DMC, ISI, Classes, Region]])
        result=ridge_model.predict(new_data_scaled)
        
        return redirect(url_for('result',result=result[0]))
        
    else:
        return render_template("home.html")

if __name__=="__main__":
    app.run(debug=True)