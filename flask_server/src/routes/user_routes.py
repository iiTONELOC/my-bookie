from flask import jsonify, request, make_response
from ..controllers import user_model_controller as mc


def user_get(param=None):
    """User get route."""
    if param is None:  # 'api/users'
        return jsonify(mc.get_all_users())
    else:  # 'api/users/param'
        print('GET USER REQUEST:', param)
        # check
        print(int('p'))
    return jsonify(data='user_get')


def user_post():
    """User post route."""
    print('User Post Route')
    # try to create a user here
    data = mc.create_user(request.json)
    if 'error' in data:
        return make_response(jsonify(error=data['error']), 400)
    else:
        return jsonify(data=data)


def user_put():
    """User put route."""
    print('User Put Route')
    return jsonify(data='user_put')


def user_delete():
    """User delete route."""
    print('User Delete Route')
    return jsonify(data='user_delete')

