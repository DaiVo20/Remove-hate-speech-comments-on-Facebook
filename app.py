from flask import Flask, request, redirect, render_template,jsonify
app = Flask(__name__)

@app.route('/')
def dashboard():
    sum_user = 10

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)