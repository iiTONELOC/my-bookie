from flask import jsonify
from ..auth.auth import Auth


def with_auth(req, res, next):
    token = Auth.get_token(req)
    if token is not None:
        decoded = Auth.decode_token(token)
        if 'Unauthorized' in decoded:
            return res(
                jsonify(
                    Auth.unauthorized_msg(
                        'Please log in to access this resource.'
                    )), 401)
        else:
            # attach the user's id to the request
            user = {
                '_id': str(decoded['_id']),
                'username': decoded['username'],
            }
            req['user'] = user
            return next
    else:
        return res(
            jsonify(
                Auth.unauthorized_msg(
                    'Please log in to access this resource.'
                )), 401
        )
