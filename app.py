from flask import Flask, request, jsonify
from werkzeug.datastructures import FileStorage
from flask_restx import Api, Resource, fields, reqparse
import openai,PyPDF2,os,json,re
from dotenv import load_dotenv

app = Flask(__name__)
api = Api(app)
load_dotenv()
openai.api_key = os.getenv('API_KEY')
request_model = api.model('Request', {
    'requestid': fields.String(required=True, description='The request ID'),
    'text': fields.String(required=True, description='The text data')
})

ns = api.namespace('api', description='User Request API')

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

# def docx_to_text(docx_file):
#     doc = docx.Document(docx_file)
#     all_text = ""

#     for para in doc.paragraphs:
#         all_text += para.text + "\n"

#     return all_text

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
    
file_parser = reqparse.RequestParser()
file_parser.add_argument('file_type', type=str, required=True, help='The file type (pdf, docx, or txt)', location='form')

file_parser = reqparse.RequestParser()
file_parser.add_argument('file', type=FileStorage, location='files', required=True, help='The file to be processed (pdf, docx, or txt)')
file_parser.add_argument('file_type', type=str, required=True, help='The file type (pdf, docx, or txt)')

@api.route('/upload')
class FileUpload(Resource):
    @api.expect(file_parser)
    def post(self):
        args = file_parser.parse_args()
        file = args['file']
        file_type = args['file_type']

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

        return {'extracted_text': extracted_text}

def clean_response(response):
    cleaned_response = response.replace('\n', '').replace('\"', '"')
    print(f'Cleaned response: {cleaned_response}')
    return cleaned_response
if __name__ == '__main__':
    app.run(debug=True)
