# from flask_server.main import my_app
# from dotenv import load_dotenv

# load_dotenv()
# app = my_app
# if __name__ == '__main__':
#     my_app.run()
from flask_server.src.routes.router import app_router
from flask_server.src.server import Server
from flask_server.main import my_app
from flask import Flask
from dotenv import load_dotenv
import os
static = '/client/build'
static = os.path.normpath(static)
load_dotenv()


def init_server():
    app = Flask(
        __name__,
        static_url_path='',
        static_folder=static,
        template_folder=static
    )
    app_router(app)
    return app


app = init_server()

if __name__ == '__main__':
    my_app.run()
