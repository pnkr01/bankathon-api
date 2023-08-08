import json
def ApiResponse(status,data):
    response  = json.dumps(data)
    status = status
    mimetype = 'application/json'
    return (response, status, mimetype)