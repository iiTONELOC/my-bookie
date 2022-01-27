from src.server import Server
from src.routes.router import app_router

my_app = Server(
    route_controller=app_router,
    port=int('3000')
)

if __name__ == '__main__':
    print('Starting Server...')
    my_app.run()
