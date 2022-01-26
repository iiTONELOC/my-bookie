from flask import jsonify, request, make_response
from ..controllers import user_model_controller as mc


def user_get(param=None):
    """User get route."""
    if param is None:  # 'api/users'
        return jsonify(mc.get_all_users())
    else:  # 'api/users/param'
        # get user by _id
        return jsonify(mc.get_one_user(_id=param))


def user_post():
    """User post route."""
    print('User Post Route')
    # try to create a user here
    data = mc.create_user(request.json)
    if 'error' in data:
        return make_response(jsonify(error=data['error']), 400)
    else:
        return jsonify(data=data)


def user_put(param=None):
    """User put route."""
    if param is None:  # 'api/users/param'
        return
    else:  # 'api/users/param'
        print('UPDATE USER REQUEST:', param)
        return jsonify({'route': 'user_put', 'param': param})


def user_delete(param=None):
    """User delete route."""
    if param is None:  # 'api/users/param'
        return
    else:  # 'api/users/param'
        print('DELETE USER REQUEST:', param)
        return jsonify({'route': 'user_delete', 'param': param})
