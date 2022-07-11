
from email import header
import imp
import json

from application import app

from plotly.offline import plot
from plotly.graph_objs import Scatter
import flask
from flask import Markup, jsonify, render_template, request, redirect, url_for
import ast
import base64
import pickle
import requests
import pandas as pd


count_clean = 0
count_offensive = 0
count_hate = 0
labels_doughnut = []
values_doughnut = []

# import numpy
# def convert(o):
#     if isinstance(o, numpy.int64): return int(o)  
#     raise TypeError

@app.route('/')
def home_page():
    return render_template('index.html',
    labels_doughnut = labels_doughnut,
    values_doughnut = values_doughnut,
    count_clean = count_clean,
    count_offensive = count_offensive,
    count_hate = count_hate)


@app.route('/refreshData')
def refresh_graph_data():
    global labels_doughnut, values_doughnut
    global count_clean, count_offensive, count_hate
    print("labels now: " + str(labels_doughnut))
    print("data now: " + str(values_doughnut))
    # print("count clean now: " + str(count_clean))
    # print("count offensive now: " + str(count_offensive))
    # print("count hate now: " + str(count_hate))
    
    return jsonify(labels_doughnut=labels_doughnut,
                   values_doughnut=values_doughnut,
                   count_clean = str(count_clean),
                   count_hate = str(count_hate),
                   count_offensive = str(count_offensive))


@app.route('/updateData', methods=["POST"])
def html_table():
    global labels_doughnut, values_doughnut
    global count_clean, count_offensive, count_hate
    if not request.form:
        return "error", 400
    pickled_str = request.form.get('data')
    df = pickle.loads(base64.b64decode(pickled_str.encode()))
    df['label'] = df['prediction'].replace(
        {0: 'Clean', 1: 'Offensive', 2: 'Hate'})

    data_doughnut = df['label'].value_counts()
    labels_doughnut = ast.literal_eval(str(list(data_doughnut.index.values)))
    values_doughnut = ast.literal_eval(str(list(data_doughnut.values)))
    if 'Clean' in labels_doughnut:
        count_clean = data_doughnut['Clean']
    if 'Offensive' in labels_doughnut:
        count_offensive = data_doughnut['Offensive']
    if 'Hate' in labels_doughnut:
        count_hate = data_doughnut['Hate']
    print("labels received: " + str(labels_doughnut))
    print("values received: " + str(values_doughnut))
    print("count clean received: " + str(count_clean))
    print("count offensive received: " + str(count_offensive))
    print("count hate received: " + str(count_hate))

    return "success", 201
