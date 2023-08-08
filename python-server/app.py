
from flask import Flask, request
import openai
import os
from dotenv import load_dotenv
from provider.JD_Provider import enhance_jd
from helper.api_response import ApiResponse


app = Flask(__name__)
load_dotenv()
openai.api_key = os.getenv('API_KEY')

## -----------JD Improvement Request---------------##


@app.post('/enhance_jd')
def handle_enhance_jd():
    request_data = request.json
    request_id = request_data['request_id']
    job_description = request_data['job_description']
    if not request_id or not job_description:
        return app.response_class(ApiResponse(400, {"message": "request_id and job_description are required"}))
    enhanced_jd = enhance_jd(request_id, job_description)
    return app.response_class(ApiResponse(200, enhanced_jd))


## -----------Anaylyze Resume Starts---------------##
if __name__ == '__main__':
    app.run(debug=True)
