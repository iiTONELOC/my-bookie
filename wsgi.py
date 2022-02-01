from flask_server.main import my_app
from dotenv import load_dotenv

load_dotenv()
if __name__ == '__main__':
    my_app.run()
