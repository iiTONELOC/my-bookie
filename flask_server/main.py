from src.routes.router import app_router
from src.server import Server
server = Server(route_controller=app_router, port=int('3000'))

if __name__ == '__main__':
    print('Starting Server...')
    server.run()
