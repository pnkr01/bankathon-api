
from flask import Flask, request
import openai,os
from utils.response.cv_response import generate_score
from dotenv import load_dotenv
from provider.JD_Provider import enhance_jd
from helper.api_response import ApiResponse
from routes.cv_score import cv_score


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
def analyze_cv():
    request_data = request.json
    resume_text = request_data['resume_text']
    job_title = request_data['job_title']
    skills = request_data['skills']
    if not resume_text or not job_title or not skills:
        return app.response_class(ApiResponse(400,{"message":"resume_text, job_title and skills are required"}))
    score = generate_score(job_title,skills,resume_text)
    return app.response_class(ApiResponse(200,score))
##-----------Anaylyze Resume Starts---------------##   
if __name__ == '__main__':
    app.run(debug=True)