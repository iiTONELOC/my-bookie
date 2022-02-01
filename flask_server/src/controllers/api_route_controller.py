from flask import jsonify, make_response, request
from ..routes import user_routes


def api_controller(name, param=None):
    routes = {
        'users': {
            'POST': lambda: user_routes.user_post(),
            'PUT': lambda: user_routes.user_put(param),
            'GET': lambda: user_routes.user_get(param),
            'DELETE': lambda: user_routes.user_delete(param)
        },
    }

    if name in routes:
        func = routes[name][request.method]
        return func()
    else:
        return make_response(jsonify({'message': 'Not Found'}), 404)
