import os
from flask_server.src.routes.user_routes import user_login
from flask_server.src.controllers import api_route_controller
from flask_server.src.controllers.user_model_controller import get_one_user
from flask import Flask, request, make_response, render_template, send_from_directory


static = 'client/build'
static = os.path.normpath(static)
app = Flask(__name__, static_url_path='',
            static_folder=static,
            template_folder=static,)

# front end routes


@app.route('/')
def index():
    return render_template('index.html')


@app.route("/<name>")
def react(name):
    if name in os.listdir(static):
        try:
            return send_from_directory(static, name)
        except FileNotFoundError:
            return make_response(f"{name} not found", 404)
    else:
        return render_template('index.html')


@app.route('/users/<name>/dashboard')
def user_dash(name):
    # look up user in db
    if get_one_user(_id=name) is not None:
        print(get_one_user(_id=name))
        return render_template('index.html')
    else:
        # FIXME redirect to the not found page
        return make_response(f"{name} not found", 404)

# api routes


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
    app.run(debug=True, port=5000, host='0.0.0.0')
