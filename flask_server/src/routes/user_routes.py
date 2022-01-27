from ..auth.auth import Auth
from flask import jsonify, request, make_response
from ..controllers import user_model_controller as mc


def handle_response(data):
    if data is not None:
        if 'error' in data:
            return make_response(jsonify(error=data['error']), 400)
        elif 'unauthorized' in data:
            return make_response(jsonify(unauthorized=data['unauthorized']), 401)
        else:
            return jsonify(data)
    else:  # data is None
        return make_response(jsonify({'message': 'Not Found'}), 404)


def user_get(param=None):
    """User get route."""
    if param is None:  # 'api/users'
        return jsonify(mc.get_all_users())
    else:  # 'api/users/param'
        # get user by _id
        if Auth.is_authorized(request, param):
            return jsonify(mc.get_one_user(_id=param))
        else:
            return make_response(jsonify(Auth.unauthorized_msg(None)), 401)


def user_post():
    """User post route."""
    data = mc.create_user(request.json)
    return handle_response(data)


def user_put(param=None):
    """User put route."""
    if param is None:  # 'api/users/param'
        return
    else:  # 'api/users/param'
        # check if the request has the user object
        print('REQUEST', request)
        if Auth.is_authorized(request, param):
            data = mc.edit_user({
                "param": param,
                "body": request.json
            })
            if data is not None:
                return handle_response(data)
            else:
                return None
        else:
            return make_response(jsonify(Auth.unauthorized_msg(None)), 401)


def user_delete(param=None):
    """User delete route."""
    if param is None:  # 'api/users/param'
        return
    else:  # 'api/users/param'
        if Auth.is_authorized(request, param):
            data = mc.delete_user(param)
            return handle_response(data)
        else:
            return make_response(jsonify(Auth.unauthorized_msg(None)), 401)
