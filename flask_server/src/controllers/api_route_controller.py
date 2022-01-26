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
