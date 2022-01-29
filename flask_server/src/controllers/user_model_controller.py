from .db_config import db
from ..auth.auth import Auth
from bson.objectid import ObjectId
from ..utils import validate_email
from ..models.user_model import User, hash_password, check_password

m_db = db()

# utility functions
# ------------------


def filter_by_param(data, key, value):
    """Returns an item that matches the key, value pair"""
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


# CRUD Functions
# --------------


def get_all_users():  # (R)ead - get all users
    """Retrieves all the user documents from the DB with password removed"""
    users = m_db['users'].find()
    # for user in users:
    #     m_db['users'].delete_one(user)
    return package_basic_user_data(users)


def get_one_user(email=None, _id=None):  # (R)ead - get a single user by _id or email
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


def edit_user(data=None):  # (U)update - edit a new user
    """Edit a user in the database"""
    if data is None:
        return None
    else:
        # check if the user exists
        # get_all_users does not return the password
        # to edit the password use the edit_user_password function
        user_list = get_all_users()
        user_by_id = filter_by_param(user_list, '_id', data['param'])
        if user_by_id is not None:
            # request body
            body = data['body']
            # verify the params passed are valid
            if 'email' in body:
                # validate the email
                if validate_email(body['email']) is False:
                    return {
                        'error': {
                            'message': 'email is not in valid format!'
                        }
                    }
                else:
                    # check uniqueness
                    if filter_by_param(
                            user_list, 'email', body['email']) is not None:
                        return {
                            'error': {
                                'message': 'email already exists!'
                            }
                        }
                    else:
                        # continue
                        pass
            if 'username' in body:
                # verify the username is unique
                if filter_by_param(
                        user_list, 'username', body['username']) is not None:
                    return {
                        'error': {'message': 'user already exists!'}
                    }
                else:
                    # continue
                    pass
                # update the user with the cleaned data
                # find the user by id and update
            cleaned = {k: v for k, v in body.items() if k in [
                'username', 'email']}
            updated_user = m_db['users'].find_one_and_update(
                {'_id': (ObjectId(data['param']))}, {'$set': cleaned}
            )
            if updated_user is not None:
                return cleaned
            else:
                return {'error': {'message': 'Unable to update user'}}
        else:
            return {'unauthorized': {'message': 'You are not authorized!'}}


def delete_user(data=None):  # (D)elete - delete a user
    """Delete a user in the database"""
    if data is None:
        return None
    else:
        del_user = m_db['users'].find_one_and_delete(
            {'_id': ObjectId(data)}
        )
        if del_user is not None:
            return {'message': 'User deleted!'}
        else:
            return None

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
            if check_password(user_req['password'], match_user['password']):
                # generate a token for the user
                token = Auth.sign_token(
                    match_user['email'],
                    match_user['username'],
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
