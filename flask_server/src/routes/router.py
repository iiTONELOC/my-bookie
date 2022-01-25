from flask import jsonify, make_response, request


def api_controller(name):
    routes = {
        'users': {
            'PUT': lambda: jsonify({'message': f'This is the {name} route for the {request.method} method.'}),
            'GET': lambda: jsonify({'message': f'This is the {name} route for the {request.method} method.'}),
            'POST': lambda: jsonify({'message': f'This is the {name} route for the {request.method} method.'}),
            'DELETE': lambda: jsonify({'message': f'This is the {name} route for the {request.method} method.'})
        },
    }

    if name in routes:
        func = routes[name][request.method]
        return func()
    else:
        return make_response(jsonify({'message': 'Not Found'}), 404)


def Router(app):
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
        return api_controller(name)

    # add switch controller here for availale
