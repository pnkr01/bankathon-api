import PyPDF2,re
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

def pdf_to_text(pdf_file):
    with open(pdf_file, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        all_text = ""

        for page in pdf_reader.pages:
            all_text += page.extract_text()

    return clean_text(all_text)

def clean_text(text):
    cleaned_text = ' '.join(text.split())
    cleaned_text = re.sub(r'[^\x00-\x7F]+', '', cleaned_text)
    cleaned_text = re.sub(r'\s+([.,!?])', r'\1', cleaned_text)
    cleaned_text = re.sub(r'http\S+|www\S+', '', cleaned_text)
    return cleaned_text