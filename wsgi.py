from flask_server.main import my_app
from dotenv import load_dotenv

load_dotenv()
app = my_app
if __name__ == '__main__':
    my_app.run()
