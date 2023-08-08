
from flask import Flask, request
import openai,os
from dotenv import load_dotenv
from provider.JD_Provider import enhance_jd
from helper.api_response import ApiResponse


app = Flask(__name__)
load_dotenv()
openai.api_key = os.getenv('API_KEY')

##-----------JD Improvement Request---------------##
@app.post('/enhance_jd')
def handle_enhance_jd():
    request_data = request.json
    requestid = request_data['requestid']
    job_description = request_data['job_description']
    if not requestid or not job_description:
        return app.response_class(ApiResponse(400,{"message":"requestid and job_description are required"}))
    enhanced_jd = enhance_jd( requestid,job_description)
    return app.response_class(ApiResponse(200,enhanced_jd))

##-----------JD Improvement Request Ends---------------##
 
##-----------Anaylyze Resume Starts---------------##   
@app.post('/analyze_cv')
def handle_analyze_cv():
    request_data = request.json
    return cv_score(request_data)
##-----------Anaylyze Resume Starts---------------##   
if __name__ == '__main__':
    app.run(debug=True)