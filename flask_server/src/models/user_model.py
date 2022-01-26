import bcrypt
from mongoengine import *

# FIXME
#  Add email validation


def hash_password(password):
    password = password.encode("utf-8")
    return bcrypt.hashpw(password, bcrypt.gensalt())


def check_password(password, hashed_password):
    password = password.encode('utf-8')
    return bcrypt.checkpw(password, hashed_password.encode('utf-8'))


class User(Document):
    email = StringField(required=True)
    username = StringField(required=True, max_length=50)
    password = StringField(required=True, min_length=8)

    def get_info(self):
        return {
            'email': self.email,
            'username': self.username,
        }
