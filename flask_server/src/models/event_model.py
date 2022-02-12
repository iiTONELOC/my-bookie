from .validators import Validate


class Event:

    def __init__(
        self,
        name,
        owner_id,
        end_time,
        start_time,
        description,
        owner_name,
        attendees=[],
        location=None,
    ):

        self.name = Validate.string(name, 5, 'Name', max_length=50)
        self.description = Validate.string(
            description, 5, 'Description', max_length=280)
        self.start_time = Validate.date_time(start_time)
        self.owner_name = Validate.string(
            owner_name, 5, 'Owner Name', max_length=50)
        self.end_time = Validate.date_time(end_time)
        self.location = location
        self.owner_id = owner_id
        self.attendees = attendees
