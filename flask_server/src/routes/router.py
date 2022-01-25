from flask import jsonify


def Router(app):
    @app.route('/')
    def index():
        return jsonify({'message': 'Hello World!'})
