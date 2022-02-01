import os
from .src.server import Server
from .src.routes.router import app_router
from dotenv import load_dotenv

load_dotenv()
my_app = Server(
    route_controller=app_router,
    port=int(os.getenv('PORT') or '3001')
)

if __name__ == '__main__':
    print('Starting Server...')
    my_app.run()
