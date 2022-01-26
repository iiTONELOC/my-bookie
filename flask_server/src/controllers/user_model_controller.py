from .db_config import db
from ..models.user_model import User, hash_password, check_password

m_db = db()


def check_if_user_exists(username, email):
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
    """Returns user data without the password"""
    data = []
    for item in search_result:
        # ensures the data types are compatible with the front end
        d = {
            '_id': str(item['_id']),
            'email': str(item['email']),
            'username': str(item['username'])
        }
        data.append(d)
    return data


def get_all_users():
    users = m_db['users'].find()
    # for user in users:
    #     m_db['users'].delete_one(user)
    return package_basic_user_data(users)


def create_user(data=None):
    """Create a new user in the database."""
    if data is None:
        return None
    else:
        user = None
        did_save = None
        try:
            does_exist = check_if_user_exists(data['username'], data['email'])
            if does_exist is False:
                if len(data['password']) >= 8:
                    user = User(
                        username=data['username'],
                        email=data['email'],
                        password=hash_password(data['password']))
                    did_save = m_db['users'].insert_one(user.to_mongo())
                else:
                    return {
                        'error': {
                            'message': 'passwords must be at least 8 characters!'
                        }
                    }
            else:
                return {'error': {'message': 'User already exists!'}}
        except AttributeError as e:
            print('ATTRIBUTE ERROR: ', e)
            return {'error': {'message': f'{e}'}}
        except KeyError as e:
            print('KEY ERROR: ', e)
            return {'error': {'message': f'{e} is required!'}}
        if did_save.inserted_id is None:
            return {'error': {'message': 'Unable to create user'}}
        else:
            return user.get_info()
