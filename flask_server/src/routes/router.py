from flask import jsonify
from ..controllers import api_route_controller


def app_router(app):
    # FIXME: This is a temporary solution to get the app to work.
    #   When we have the front end, we can remove this.
    #   this route should return the index.html file from the
    #   client's build folder
    @app.route('/')
    def index():
        return jsonify({'message': 'Hello World!'})

    @app.route("/<name>")
    def react(name):
        # we will return the front end here
        # handles all routes except for the api routes
        return jsonify({'message': 'Hello World!'})

    @app.route('/api/<name>', methods=['GET', 'POST', 'PUT', 'DELETE'])
    def api(name):
        return api_route_controller(name)

