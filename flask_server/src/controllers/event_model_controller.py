from .db_config import db
# from bson.objectid import ObjectId
from ..models.event_model import Event


_db = db()  # database connection
# CRUD Controller for the Event Model
# ------------------------------------


def create_event(data=None):
    print(data)
    if data is None:
        return None
    else:
        try:
            event = Event(**data)
            did_save = _db['events'].insert_one(event.__dict__)
            return {"data": {"_id": str(did_save.inserted_id)}}
        except ValueError as e:
            return {'error': {'message': f'{e}'}}
        except Exception as e:
            print(e)
            return {'error': {'message': f'{e}'}}


def get_all_events():
    temp = []
    events = _db['events'].find()
    for event in events:
        temp.append(event)
    for item in temp:
        item['_id'] = str(item['_id'])
        item['owner_id'] = str(item['owner_id'])

    return {'events': temp}
