from flask import jsonify


def ApiResponse(status, data):
    return data, status
