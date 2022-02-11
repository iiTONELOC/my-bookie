import os
import re


def get_environment():
    """The environment is set to 'development' by default."""
    # The Node build runs first and the environment is set to 'production'
    # during the build process. We will run in development mode by default.
    NODE_ENV = os.getenv('ENV')
    if NODE_ENV == 'production':
        return 'production'
    else:
        return 'development'


def email_regex():
    """Returns a regex for valid email addresses."""
    return r'^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'


def date_time_regex():
    return r'^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{1,}Z$'


def validate_date_time(date_time):
    if date_time is not None:
        if re.fullmatch(date_time_regex(), date_time) is not None:
            return True
        else:
            return False
    else:
        return None


def validate_email(email):
    if email is not None:
        if re.fullmatch(email_regex(), email) is not None:
            return True
        else:
            return False
    else:
        return None
