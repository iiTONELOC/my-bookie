from flask import jsonify, make_response, request
from ..routes import user_routes


def api_controller(name):

    routes = {
        'users': {
            'PUT': lambda: user_routes.user_put(),
            'GET': lambda: user_routes.user_get(),
            'POST': lambda: user_routes.user_post(),
            'DELETE': lambda: user_routes.user_delete()
        },
    }

    if name in routes:
        func = routes[name][request.method]
        return func()
    else:
        return make_response(jsonify({'message': 'Not Found'}), 404)
