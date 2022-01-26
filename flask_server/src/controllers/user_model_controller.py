from db_config import db
from models.user_model import User, hash_password, check_password

m_db = db()


def create_user(data=None):
    """Create a new user in the database."""
    if data is None:
        return None
    else:
        user = None
        save = None
        try:
            username = data['username']
            email = data['email']
            password = data['password']
            password = hash_password(password)
            user = User(username=username, email=email, password=password)
            save = m_db['users'].insert_one(user.to_mongo())
        except AttributeError as e:
            return{'error': {'message': f'{e}'}}
        except KeyError as e:
            return{'error': {'message': f'{e} is required!'}}
        if save.inserted_id is not None:
            return user.get_info()
        else:
            return{'error': {'message': 'Unable to create user'}}


def get_user_by_email(email, password):
    """Get a user by email."""
    user = m_db.users.find_one(filter={"email": email})
    print("HERE", user)
    if user is not None:

        print(user)
        # check if password is correct
        match = check_password(
            password=password, hashed_password=user['password'])
        if match is True:
            return user
        else:
            return{'error': {'message': 'Invalid credentials'}}
    else:
        return{'error': {'message': 'Invalid credentials'}}


print(User)
