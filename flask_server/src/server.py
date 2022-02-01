import os
from flask import Flask
from .utils import get_environment
from dotenv import load_dotenv

load_dotenv()

static = '../../client/build'
static = os.path.normpath(static)


class Server:
    """A class to represent a Flask Server.

    Parameters
    ----------
    static_url_path : str (path)
        default: ''
    static_folder : str (path)
        relative location to the static folder
        default: os.path.normpath('../../client/build')
    template_folder : str (path)
        relative location to the html template folder  
        (we are using React.js and not Flask's template engine)
        default: os.path.normpath('../../client/build')
    route_controller : Function
        default: None
        Provides a wrapper for a custom route controller.
    port : int
        default: environment variable PORT || 5000
    host : str
        default: '0.0.0.0'

    Methods
    -------
    run():
        Starts the server with desired settings
    """

    def __init__(
            self,
            static_url_path='',
            static_folder=static,
            template_folder=static,
            route_controller=None,
            port=os.getenv('PORT') or 5000,
            host='0.0.0.0'):
        self.app = Flask(
            __name__, static_url_path=static_url_path,
            static_folder=static_folder,
            template_folder=template_folder
        )
        self.port = port
        self.host = host
        self.route_controller = route_controller
        self.app.config['ENV'] = os.getenv('ENV')  # uses the NODE_ENV environment variable

    def run(self):
        if self.route_controller is not None:
            try:
                self.route_controller(self.app)
            except Exception as e:
                print(f'Error loading route_controller: {e}')
        self.app.run(host=self.host, port=self.port, debug=True)
