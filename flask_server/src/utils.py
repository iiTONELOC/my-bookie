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


def validate_email(email):
    if email is not None:
        if re.fullmatch(email_regex(), email) is not None:
            return True
        else:
            return False
    else:
        return None

