
from flask import jsonify, request, make_response
from ..auth.auth import Auth
from ..controllers.db_config import db
from ..controllers import user_model_controller as mc
from ..models.user_model import User
# database connection
m_db = db()


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
    # create a token for the user
    if 'error' or 'unauthorized' not in data:
        try:
            token = Auth.sign_token(
                data['email'],
                data['username'],
                str(data['_id'])
            )
            return {
                'token': token,
                'username': data['username'],
                'email': data['email'],
                "_id": str(data['_id'])
            }
        except KeyError:
            return make_response(jsonify(data), 400)
        except Exception as e:
            print(e)
            return make_response(jsonify({'error': e}), 500)
    else:
        return handle_response(data)


def user_put(param=None):
    """User put route."""
    if param is None:  # 'api/users/param'
        return
    else:  # 'api/users/param'
        # check if the request has the user object
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


# LOGIN/LOGOUT handlers
# ----------------------


def user_login(res, data=None):
    """Login a user. returns a JWT token"""
    err_msg = res(({'error': {'message': 'Incorrect credentials'}}), 400)
    if data is None:
        return err_msg
    else:
        # get user data
        user_req = {}
        if data.get('username'):
            user_req['username'] = data['username']
        if data.get('email'):
            user_req['email'] = data['email']
        try:
            user_req['password'] = data['password']
        except KeyError:
            return err_msg

        # variable to hold found user
        match_user = None
        if 'username' in user_req:
            match_user = m_db['users'].find_one(
                {'username': user_req['username']})
        if 'email' in user_req:
            match_user = m_db['users'].find_one(
                {'email': user_req['email']})
        # if match
        if match_user is not None:
            # user found now check password
            if User.check_password(user_req['password'], match_user['password']):
                # generate a token for the user
                token = Auth.sign_token(
                    match_user['username'],
                    match_user['email'],
                    str(match_user['_id'])
                )
                return {
                    'token': token,
                    'username': match_user['username'],
                    'email': match_user['email'],
                    "_id": str(match_user['_id'])
                }
            else:
                return err_msg
        else:
            return err_msg
