import docx
def docx_to_text(docx_file):
    doc = docx.Document(docx_file)
    all_text = ""

    for para in doc.paragraphs:
        all_text += para.text + "\n"

    return all_text