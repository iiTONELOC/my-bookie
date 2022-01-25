import os


def get_environment():
    """The environment is set to 'development' by default."""
    # The Node build runs first and the environment is set to 'production'
    # during the build process. We will run in development mode by default.
    NODE_ENV = os.getenv('NODE_ENV')
    if NODE_ENV == 'production':
        return 'production'
    else:
        return 'development'
