from flask import jsonify, request, make_response
from ..auth.auth import Auth
from bson.objectid import ObjectId
from ..controllers import event_model_controller as event_controller


def event_post():
    token = Auth.decode_token(Auth.get_token(request))
    if '_id' in token:
        # try to create a new event
        print()
        d = {**request.json,
             'owner_id': ObjectId(token["_id"])}
        data = event_controller.create_event(d)
        print(data)
        if 'error' not in data:
            return data
        else:
            return make_response(jsonify(data), 400)
    else:
        return make_response(jsonify(Auth.unauthorized_msg(None)), 401)


def event_put(param=None):
    return {'message': 'event put route'}


def event_get(param=None):
    if param is not None:
        return {'message': 'event get route'}
    else:
        return jsonify(event_controller.get_all_events())


def event_delete(param=None):
    return {'message': 'event delete route'}
