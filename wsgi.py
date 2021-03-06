import os
from flask import Flask, request, make_response, render_template
from flask_server.src.routes.user_routes import user_login
from flask_server.src.controllers import api_route_controller
static = 'client/build'
static = os.path.normpath(static)
app = Flask(__name__, static_url_path='',
            static_folder=static,
            template_folder=static,)


@app.route('/')
def index():
    return render_template('index.html')


@app.route("/<name>")
def react(name):
    return render_template('index.html')


@app.route('/users/<name>/dashboard')
def user_dash(name):
    return render_template('index.html')


@app.route('/api/<name>', methods=['GET', 'POST'])
def api(name):
    # add auth to all the api routes?
    return api_route_controller(name)


@app.route('/api/users/<name>',  methods=['GET', 'POST', 'PUT', 'DELETE'])
def api_1(name):
    if name == 'login':
        return user_login(make_response, request.json)
    return api_route_controller('users', name)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
