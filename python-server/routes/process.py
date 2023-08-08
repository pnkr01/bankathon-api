from app import api
import json
from utils.response.jd_response import generate_responses
from helper.clean_response import clean_response
def improve_jd(request_data):
    requestid = request_data['requestid']
    jd_description = request_data['jd_description']
    generated_response = generate_responses(jd_description, requestid)
    return json.loads(clean_response(generated_response)), 200