from ..middleware.auth import with_auth
from ..controllers import api_route_controller
from flask import jsonify, request, make_response, render_template
from ..controllers import user_model_controller as uc


def app_router(app):
    # FIXME: This is a temporary solution to get the app to work.
    #   When we have the front end, we can remove this.
    #   this route should return the index.html file from the
    #   client's build folder
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
            return uc.user_login(make_response, request.json)
        return api_route_controller('users', name)
