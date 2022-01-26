from flask import jsonify, request, make_response


def user_get():
    """User get route."""
    print('User Get Route')
    return jsonify(data='user_get')


def user_post():
    """User post route."""
    print('User Post Route')
    return jsonify(data='user_post')


def user_put():
    """User put route."""
    print('User Put Route')
    return jsonify(data='user_put')


def user_delete():
    """User delete route."""
    print('User Delete Route')
    return jsonify(data='user_delete')

