from flask import jsonify, request, make_response
from ..controllers import event_model_controller as event_controller
from .helpers import handle_response
from bson.objectid import ObjectId
from ..auth.auth import Auth


def with_auth(data):  # This ensures a user is logged in
    is_logged_in = Auth.is_logged_in(request)
    if is_logged_in:
        return handle_response(data)
    else:
        return make_response(jsonify(Auth.unauthorized_msg(None)), 401)


def event_post():
    token = Auth.decode_token(Auth.get_token(request))
    if '_id' in token:
        # try to create a new event
        d = {**request.json,
             'owner_id': ObjectId(token["_id"])}
    return with_auth(event_controller.create_event(d))


def event_put(param=None):
    if param is None:
        return
    else:
        print(param, request.json)
        return with_auth(event_controller.edit_event(param, request.json))


def event_get(param=None):

    #  a context parameter is provided to the controller
    #  to ensure that the user can only see their own events
    token = Auth.decode_token(Auth.get_token(request))
    # gets the event by id
    if param is not None:
        return with_auth(event_controller.get_one_event({
            '_id': param,
            'context': ObjectId(token["_id"])
        }))
    else:
        # no param was provided ie 'api/events/eventId'
        # look for a request
        try:

            if request.json is not None:
                have_request = len(request.json) > 0
                if have_request:
                    if '_id' in token:
                        data = {
                            'query': request.json,
                            'context': ObjectId(token["_id"])
                        }
                        return with_auth(event_controller.get_all_events(data))
                    else:
                        return make_response(jsonify(Auth.unauthorized_msg(None)), 401)
            else:
                # if none was provided only return the users events
                if '_id' in token:
                    data = {
                        'query': {'owner_id': ObjectId(token["_id"])},
                        'context': ObjectId(token["_id"])
                    }
                    return with_auth(event_controller.get_all_events(data))
                else:
                    return make_response(jsonify(Auth.unauthorized_msg(None)), 401)
        except AttributeError as e:
            print("No request", e)
            return make_response(jsonify({'error': e}), 500)


def event_delete(param=None):
    return with_auth(event_controller.delete_event(param))
