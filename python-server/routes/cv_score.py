import os
from utils.conversions.extract_text_from_pdf import pdf_to_text
from utils.response.cv_response import generate_score
def cv_score(args):
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