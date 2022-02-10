from flask import jsonify, request, make_response
from ..auth.auth import Auth
from ..controllers.db_config import db
from ..controllers import event_model_controller as event_controller


def event_post():
    return {'message': 'event post route'}


def event_put(param=None):
    return {'message': 'event put route'}


def event_get(param=None):
    return {'message': 'event get route'}


def event_delete(param=None):
    return {'message': 'event delete route'}
