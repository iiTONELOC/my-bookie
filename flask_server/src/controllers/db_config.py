import os
import pymongo


mongo_uri = f"{os.getenv('MONGO_URI')}"
ENV = os.getenv('ENV')


def get_conn_str():
    """Returns the connection string for the MongoDB database."""
    if ENV != 'production':
        return f"mongodb://localhost:27017/"
    else:
        return mongo_uri


conn_str = get_conn_str()
client = pymongo.MongoClient(host=conn_str)


def db():
    """Returns the database object.
    @param: db_name: The name of the database.
    """
    return client[str(os.getenv('MONGO_DB_NAME'))]
