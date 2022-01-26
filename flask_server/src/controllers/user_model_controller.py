import email
from .db_config import db
from ..models.user_model import User, hash_password, check_password
from ..utils import validate_email
m_db = db()

# utility functions
# ------------------


def filter_by_param(data, key, value):
    """Returns a list of users that match the key, value pair"""

    filtered_item = None
    for item in data:
        if item[key] == value:
            filtered_item = item
    return filtered_item


def check_if_user_exists(username, email):
    """Checks if a user exists in the database.
    return: True if the user exists, False if not.
    """
    user_list = get_all_users()
    matches = []
    for user in user_list:
        if user['username'] == username or user['email'] == email:
            matches.append(user)
    if len(matches) > 0:
        return True
    else:
        return False


def package_basic_user_data(search_result):
    """Returns user data without the password in a serializable format"""
    data = []
    for item in search_result:
        d = {
            '_id': str(item['_id']),
            'email': str(item['email']),
            'username': str(item['username'])
        }
        data.append(d)
    return data

# ---------------------
# END UTILITY FUNCTIONS

# CRUD Functions
# --------------


def get_all_users():  # (R)ead - get all users
    """Retrieves all the user documents from the DB with password removed"""
    users = m_db['users'].find()
    # for user in users:
    #     m_db['users'].delete_one(user)
    return package_basic_user_data(users)


def get_one_user(email=None, _id=None):  # (R)ead - get a single user
    """Retrieves a single user document from the DB with password removed"""
    all_users = get_all_users()
    if email is not None:
        return filter_by_param(all_users, 'email', email)
    elif _id is not None:
        return filter_by_param(all_users, '_id', _id)
    else:
        return None


def create_user(data=None):  # (C)reate - create a new user
    """Create a new user in the database"""
    if data is None:
        return None
    else:
        user = None
        did_save = None
        try:
            # Make sure the user doesn't already exist
            # usernames and emails are unique
            does_exist = check_if_user_exists(data['username'], data['email'])
            if does_exist is False:
                # check email
                is_valid_email = validate_email(data['email'])
                if is_valid_email is False:
                    return {
                        'error': {
                            'message': 'email is not in valid format!'
                        }
                    }
                elif is_valid_email is None:
                    return {
                        'error': {
                            'message': 'email is required!'
                        }
                    }
                elif is_valid_email:
                    pass
                # check password length
                if len(data['password']) < 8:
                    return {
                        'error': {
                            'message': 'passwords must be at least 8 characters!'
                        }
                    }
                else:
                    # create the user
                    user = User(
                        username=data['username'],
                        email=data['email'],
                        password=hash_password(data['password']))
                    # variable to check if the user was saved
                    did_save = m_db['users'].insert_one(user.to_mongo())
            else:
                return {'error': {'message': 'User already exists!'}}
        except AttributeError as e:
            return {'error': {'message': f'{e}'}}
        except KeyError as e:
            return {'error': {'message': f'{e} is required!'}}
        if did_save.inserted_id is None:
            return {'error': {'message': 'Unable to create user'}}
        else:
            return user.get_info()
