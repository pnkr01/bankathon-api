from flask import Flask, request,jsonify
import openai,os
from utils.response.cv_response import generate_score
from dotenv import load_dotenv
from utils.conversions.extract_text_from_pdf import pdf_to_text
from provider.JD_Provider import enhance_jd
from helper.api_response import ApiResponse
UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = {'pdf'}
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

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

## -----------JD Improvement Request Ends---------------##

## -----------Anaylyze Resume Starts---------------##


@app.post('/analyze_cv')
def analyze_cv():
    if 'file' not in request.files:
        return app.response_class(ApiResponse(400,{"message":"No file in request file"}))
    file = request.files['file']
    if file.filename == '' or not allowed_file(file.filename):
        return app.response_class(ApiResponse(400,{"message":"No file in request file"}))
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)
    if file.filename.endswith('.pdf'):
        try:
            resume_text = pdf_to_text(file_path)
            job_description = request.form.get('job_description')
            skills = request.form.get('skills')
            if not resume_text or not job_description or not skills:
                return app.response_class(ApiResponse(400,{"message":"resume_text, job_title and skills are required"}))
            score = generate_score(job_description,skills,resume_text)
            os.remove(file_path)
            return app.response_class(ApiResponse(200,score))
        except Exception as e:
            return app.response_class(ApiResponse(500,{"message":"Error extracting PDF data"}))
    else:
        return app.response_class(ApiResponse(400,{"message":"File is not a PDF"}))
    # request_data = request.json
    # resume_text = request_data['resume_text']
    # job_title = request_data['job_title']
    # skills = request_data['skills']
    # if not resume_text or not job_title or not skills:
    #     return app.response_class(ApiResponse(400,{"message":"resume_text, job_title and skills are required"}))
    # score = generate_score(job_title,skills,resume_text)
    # return app.response_class(ApiResponse(200,score))
##-----------Anaylyze Resume Starts---------------##   
# =======
#     request_data = request.json
#     resume_text = request_data['resume_text']
#     job_title = request_data['job_title']
#     skills = request_data['skills']
#     if not resume_text or not job_title or not skills:
#         return app.response_class(ApiResponse(400, {"message": "resume_text, job_title and skills are required"}))
#     score = generate_score(job_title, skills, resume_text)
#     return app.response_class(ApiResponse(200, score))


## -----------Anaylyze Resume End---------------##
if __name__ == '__main__':
    app.run(debug=True)
