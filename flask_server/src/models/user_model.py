import bcrypt
from .validators import Validate as val


class User:
    def __init__(self, email, username, password) -> None:
        self.username = val.string(username, 5, 'Username')
        self.email = val.email(email)
        self.password = User.hash_password(
            val.string(password, 8, 'Password'))

    @staticmethod
    def hash_password(password) -> None or str:
        if 'validation_error' not in password:
            return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
        else:
            return None

    @staticmethod
    def check_password(password, hashed_password) -> bool:
        password = password.encode('utf-8')
        return bcrypt.checkpw(password, hashed_password)
