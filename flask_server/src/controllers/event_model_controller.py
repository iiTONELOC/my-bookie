from .db_config import db
from bson.objectid import ObjectId
from ..models.event_model import Event

_db = db()  # database connection
# CRUD Controller for the Event Model
# ------------------------------------


def create_event(data=None):
    print('Creating event')
    print(data)
    if data is None:
        return None
    else:
        try:
            event = Event(**data)
            did_save = _db['events'].insert_one(event.to_mongo())
            return did_save.inserted_id
        except Exception as e:
            print(e)
            return {'error': {'message': f'{e}'}}
