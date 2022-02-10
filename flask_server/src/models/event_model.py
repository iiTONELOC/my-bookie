from mongoengine import *


class Event(Document):
    name = StringField(required=True, max_length=50)
    description = StringField(required=True, max_length=280)
    start_time = DateTimeField(required=True)
    end_time = DateTimeField(required=True)
    location = StringField(default=None)
    owner = StringField(required=True)
    attendees = ListField(StringField())
