from flask import jsonify, make_response


def handle_response(data):
    if data is not None:
        if 'error' in data:
            return make_response(jsonify(error=data['error']), 400)
        elif 'unauthorized' in data:
            return make_response(jsonify(unauthorized=data['unauthorized']), 401)
        else:
            return make_response(jsonify(data))
    else:  # data is None
        return make_response(jsonify({'message': 'Not Found'}), 404)
