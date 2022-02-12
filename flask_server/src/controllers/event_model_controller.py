from .db_config import db

from bson.objectid import ObjectId
from ..models.event_model import Event

# database connection to events collection
_db = db()['events']


def user_auth_for_events(data, context):
    is_auth = True
    for event in data:
        if ObjectId(event['owner_id']) != context:
            is_auth = False
    return is_auth


def package_event_data(event_data):
    for event in event_data:
        event['_id'] = str(event['_id'])
        event['owner_id'] = str(event['owner_id'])
    return event_data


# CRUD Controller for the Event Model
# ------------------------------------


def create_event(data=None):  # Create an event
    if data is None:
        return None
    else:
        try:
            event = Event(**data)
            did_save = _db.insert_one(event.__dict__)
            return {"data": {"_id": str(did_save.inserted_id)}}
        except ValueError as e:
            return {'error': {'message': f'{e}'}}
        except Exception as e:
            return {'error': {'message': f'{e}'}}


def get_all_events(data=None):  # Get all events
    if data is None:
        temp = []
        events = _db.find()
        # for event in events:
        #     _db.delete_one(event)
        for event in events:
            temp.append(event)
        temp = package_event_data(temp)
        return {'events': temp}
    else:
        # get all events for a user
        return get_user_events(data)


def get_user_events(data):  # Gets all events for a user based on a query
    acceptable_searches = (
        '_id',
        'title',
        'location',
        'owner_id',
        'end_date',
        'start_date',
        'owner_name',
        'description',
    )
    if data is not None:
        q = data['query']
        query = None
        for key, value in q.items():
            if key in acceptable_searches:
                if key == '_id' or key == 'owner_id':
                    query = {key: ObjectId(value)}
                else:
                    query = {key: value}
            else:
                return {
                    'error': {
                        'message': f'{key} is not an acceptable search parameter'
                    }
                }
        events = []
        for event in _db.find(query):
            events.append(event)
        events = package_event_data(events)
        if user_auth_for_events(events, data['context']) is not False:
            return {'events': events}
        else:
            return {'error': {'message': 'You are not authorized to view this event'}}


def get_one_event(param=None):  # Get one event
    if param is None:
        return None
    else:
        match = []
        events = _db.find({'_id': ObjectId(param['_id'])})
        for event in events:
            match.append(event)
        match = package_event_data(match)
        if user_auth_for_events(match, param['context']) is not False:
            return {'event': match[0]}
        else:
            return {'error': {'message': 'You are not authorized to view this event'}}


def edit_event(param=None, body=None):  # Edit an event
    if param is None and body is None:
        return None
    elif param and body:
        match = []
        events = _db.find({'_id': ObjectId(param)})
        for event in events:
            match.append(event)
        if len(match) > 0:
            match = package_event_data(match)
            update_set = {k: v for k, v in match[0].items() if k != '_id'}
            # the update_set is a dictionary of the event data to be updated
            # use as a scaffold and create a new event object with the users
            # new data. This will enforce a 'schema' on the data
            for key, value in body.items():
                if key in update_set:
                    update_set[key] = value
            # try to recreate the event object with the new data
            try:
                updated_event = Event(**update_set)
                # update the db with the new data
                did_update = _db.update_one(
                    {'_id': ObjectId(param)},
                    {'$set': updated_event.__dict__}
                )
                if (did_update.modified_count > 0):
                    return {'updated_event': updated_event.__dict__}
                else:
                    return {'error': {
                        'message': 'No event was updated.'
                            'This is likely due to invalid parameters'}}
            except ValueError as e:
                return {'error': {'message': f'{e}'}}
        else:
            return {'error': {'message': 'Event not found!'}}
    else:
        return {'error': {'message': 'Invalid request'}}


def delete_event(param=None):  # Delete an event
    if param is None:
        return None
    else:
        try:
            # need to look up the event first and verify that the user is
            #  the owner of the event
            event_to_delete = _db.find_one({'_id': ObjectId(param['_id'])})
            if event_to_delete is not None:
                if user_auth_for_events(
                    [event_to_delete],
                    param['context']
                ) is not False:
                    print(event_to_delete)
                    deleted_entry = _db.remove({'_id': ObjectId(param['_id'])})
                    if deleted_entry['n'] > 0:
                        return {'message': f'Event deleted!'}
                else:
                    return {'error': {'message': 'You are not authorized to delete this event'}}
            else:
                return {'error': {'message': f'Event not found!'}}
        except Exception as e:
            print(e)
            return {'error': {'message': f'{e}'}}
