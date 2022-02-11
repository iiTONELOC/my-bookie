import bcrypt
from .validators import Validate


class User:
    def __init__(self, email, username, password):
        self.email = Validate.email(email)
        self.username = Validate.string(username, 5, 'Username')
        self.password = User.hash_password(
            Validate.string(password, 8, 'Password'))

    @staticmethod
    def hash_password(password):
        if 'validation_error' not in password:
            password = password.encode("utf-8")
            return bcrypt.hashpw(password, bcrypt.gensalt())

    @staticmethod
    def check_password(password, hashed_password):
        password = password.encode('utf-8')
        return bcrypt.checkpw(password, hashed_password.encode('utf-8'))
