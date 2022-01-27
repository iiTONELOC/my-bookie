import os
import jwt
import time
from datetime import datetime, timedelta
secret_key = ""
encoding = ''


def set_expiration():
    return (datetime.now() + timedelta(hours=2)).timestamp()


def get_secret_keys():
    if os.getenv('NODE_ENV') != 'production':
        from env import set_auth_env
        set_auth_env()
        global secret_key, encoding
        secret_key = os.getenv('SECRET_KEY')
        encoding = os.getenv('TOKEN_ENCODING')


class Auth:
    @staticmethod
    def sign_token(username, email, _id):
        get_secret_keys()
        payload = {
            'exp': set_expiration(),
            'username': username,
            'email': email,
            '_id': _id
        }
        return jwt.encode(payload, secret_key, algorithm='HS256')

    @staticmethod
    def decode_token(token):
        get_secret_keys()

        try:
            return jwt.decode(token, secret_key, algorithms=['HS256'])
        except jwt.exceptions.ExpiredSignatureError:
            return {'Expired Auth': {
                'message': 'Session expired. Please log in again.'
            }}


def auth_test(num):
    print(f'Please wait the test is starting and will take {num} seconds')
    token = Auth.sign_token('test', 'test@test.com', '13')
    time.sleep(num)
    print(Auth.decode_token(token))


auth_test(10)
