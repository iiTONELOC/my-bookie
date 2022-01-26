import os
from flask import Flask
from .utils import get_environment
from .routes.router import app_router
# The environment is set to 'development' by default.
env_ = get_environment()
# Folders are set to work with a React.js project inside of a 'client' folder.
# The %PUBLIC_URL% in react only works when the project has been built
static = '../../client/build'
static = os.path.normpath(static)


class Server:
    def __init__(
            self,
            static_url_path='',
            static_folder=static,
            template_folder=static,
            host='0.0.0.0'):
        self.app = Flask(
            __name__, static_url_path=static_url_path,
            static_folder=static_folder,
            template_folder=template_folder
        )
        self.host = host
        self.app.config['ENV'] = env_  # uses the NODE_ENV environment variable

    def run(self):
        # routes here
        app_router(self.app)
        self.app.run(host=self.host, debug=True)

    def get_app(self):
        return self.app
