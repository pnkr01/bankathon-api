from flask import Flask, request, jsonify
from werkzeug.datastructures import FileStorage
from flask_restx import Api, Resource, fields, reqparse
import openai,PyPDF2,os,json,re
from dotenv import load_dotenv

app = Flask(__name__)
api = Api(app)
load_dotenv()
ns = api.namespace('api', description='User Request API')
openai.api_key = os.getenv('API_KEY')

file_parser = reqparse.RequestParser()
file_parser.add_argument('file', type=FileStorage, location='files', required=True, help='The file to be processed (pdf, docx, or txt)')
file_parser.add_argument('file_type', type=str, required=True, help='The file type (pdf, docx, or txt)')
file_parser.add_argument('job_title', type=str, required=True, help='Job title')
file_parser.add_argument('skills', type=str, required=True, help='Job tech stack')
request_model = api.model('Request', {
    'requestid': fields.String(required=True, description='The request ID'),
    'text': fields.String(required=True, description='The text data')
})
# job_model = api.model('Job', {
#     'job_title': fields.String(required=True, description='Job title'),
#     'tech_stack': fields.String(required=True, description='Job tech stack'),
#     'resume_text': fields.String(required=True, description='Resume text')
# })

def extract_text(file_path):
    file_extension = file_path.split(".")[-1].lower()

    if file_extension == "pdf":
        text = pdf_to_text(file_path)
    elif file_extension == "docx":
        pass
        #text = docx_to_text(file_path)
    else:
        text = "Unsupported file type"
    return text

def generate_score_reason(job_title, tech_stack, resume_text):
    user_message = [
        {
            'role': 'system',
            'content': f'Job Title is {job_title}\nTech Stack is {tech_stack}\nResume Text: {resume_text}\nPlease score the resume based on job title and tech stack and provide a scoring reason. give the response in {{"score":"score of resume","scoring_reason":"why it scored that much?"}} just give the response no explanations.'
        }
    ]
    
    response = openai.ChatCompletion.create(
        model="gpt-4",  
        messages=user_message
    )
    return response['choices'][0]['message']['content']

@ns.route('/process')
class ProcessRequest(Resource):
    @api.expect(request_model, validate=True)
    def post(self):
        """Process user request"""
        request_data = api.payload
        requestid = request_data['requestid']
        text = request_data['text']

        generated_response = generate_responses(text, requestid)
        print(generated_response)
        return json.loads(clean_response(generated_response)), 200
    
@api.route('/upload')
class FileUpload(Resource):
    @api.expect(file_parser)
    def post(self):
        args = file_parser.parse_args()
        file = args['file']
        file_type = args['file_type']
        job_title = args['job_title']
        tech_stack = args['skills']

        if file.filename == '':
            return {'error': 'No file selected'}, 400
        temp_filename = 'temp_file' + os.path.splitext(file.filename)[1]
        file.save(temp_filename)

        if file_type == 'txt':
            with open(temp_filename, 'r') as text_file:
                extracted_text = text_file.read()
        elif file_type == 'pdf':
            extracted_text = pdf_to_text(temp_filename)
        elif file_type == 'docx':
            pass
            #extracted_text = docx_to_text(temp_filename)
        else:
            os.remove(temp_filename)
            return {'error': 'Unsupported file type'}, 400

        os.remove(temp_filename)
        return generate_score(job_title,tech_stack,extracted_text)
    
def generate_score(job_title,tech_stack,resume_text):
    response_data = generate_score_reason(job_title, tech_stack, resume_text)
    print(response_data)
    return json.loads(response_data), 200


def clean_response(response):
    cleaned_response = response.replace('\n', '').replace('\"', '"')
    print(f'Cleaned response: {cleaned_response}')
    return cleaned_response

def generate_responses(prompt, request_id):
    user_message = [
        {
            'role': 'system',
            'content': f'my JD is {prompt} and request id is {request_id}. I am trying to provide recommendations to change the Job description, {{"request_id": {request_id}, "score": "score of previous JD", "enhanced_jd": "from the given JD enhance paragraph and maintain the same format as previous JD", "enhanced_score": "score of enhanced JD", "similarity_percentage": "similarity score between old and enhanced JD out of 100%"}} in enhanced JD make sure to add complete previous JD with enhancement. just give output in this form do not give any explanation in output'
        }
    ]
    response = openai.ChatCompletion.create(
        model="gpt-4",  
        messages=user_message
    )
    return response['choices'][0]['message']['content']

def clean_text(text):
    cleaned_text = ' '.join(text.split())
    cleaned_text = re.sub(r'[^\x00-\x7F]+', '', cleaned_text)
    cleaned_text = re.sub(r'\s+([.,!?])', r'\1', cleaned_text)
    cleaned_text = re.sub(r'http\S+|www\S+', '', cleaned_text)
    return cleaned_text

def pdf_to_text(pdf_file):
    with open(pdf_file, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        all_text = ""

        for page in pdf_reader.pages:
            all_text += page.extract_text()

    return clean_text(all_text)
if __name__ == '__main__':
    app.run(debug=True)
