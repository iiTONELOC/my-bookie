from flask_server.main import my_app
from dotenv import load_dotenv
load_dotenv()
def app(): return my_app.run()


if __name__ == '__main__':
    app()