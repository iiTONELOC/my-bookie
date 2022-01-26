import os

import pymongo

PRODUCTION = os.getenv('NODE_ENV') == 'production'
#  UN-DEPLOYED ONLY, remove for production
if PRODUCTION is False or PRODUCTION == 'development':
    from env import *
    mongo_production_server_settings()

MONGO_DB = os.getenv('MONGO_DB')
MONGO_HOST = os.getenv('MONGO_HOST')
MONGO_USERNAME = os.getenv('MONGO_USERNAME')
MONGO_PASSWORD = os.getenv('MONGO_PASSWORD')
MONGO_URI = f"mongodb+srv://{MONGO_USERNAME}:{MONGO_PASSWORD}@{MONGO_HOST}/{MONGO_DB}\?retryWrites=true&w=majority"


def get_conn_str():
    """Returns the connection string for the MongoDB database."""
    if PRODUCTION != 'production':
        return f"mongodb://localhost:27017/"
    else:
        return MONGO_URI


conn_str = get_conn_str()
client = pymongo.MongoClient(host=conn_str)


def db(db_name=None):
    """Returns the database object.
    @param: db_name: The name of the database.
    """
    if PRODUCTION == 'development':
        return client[db_name]
    else:
        return client[MONGO_DB]
