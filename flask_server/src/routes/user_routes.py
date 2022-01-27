from flask import jsonify, request, make_response
from ..controllers import user_model_controller as mc


def handle_response(data):
    if 'error' in data:
        return make_response(jsonify(error=data['error']), 400)
    elif 'unauthorized' in data:
        return make_response(jsonify(unauthorized=data['unauthorized']), 401)
    else:
        return jsonify(data)


def user_get(param=None):
    """User get route."""
    if param is None:  # 'api/users'
        return jsonify(mc.get_all_users())
    else:  # 'api/users/param'
        # get user by _id
        return jsonify(mc.get_one_user(_id=param))


def user_post():
    """User post route."""
    data = mc.create_user(request.json)
    handle_response(data)


def user_put(param=None):
    """User put route."""
    if param is None:  # 'api/users/param'
        return
    else:  # 'api/users/param'
        d = request.json
        data = mc.edit_user({
            "param": param,
            "body": d
        })
        if data is not None:
            return handle_response(data)
        else:
            return None


def user_delete(param=None):
    """User delete route."""
    if param is None:  # 'api/users/param'
        return
    else:  # 'api/users/param'
        print('DELETE USER REQUEST:', param)
        return jsonify({'route': 'user_delete', 'param': param})
