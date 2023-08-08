from flask_restx import Api, Resource, fields, reqparse
from werkzeug.datastructures import FileStorage
from app import api
file_parser = reqparse.RequestParser()
file_parser.add_argument('file', type=FileStorage, location='files', required=True, help='The file to be processed (pdf, docx, or txt)')
file_parser.add_argument('file_type', type=str, required=True, help='The file type (pdf, docx, or txt)')
file_parser.add_argument('job_title', type=str, required=True, help='Job title')
file_parser.add_argument('skills', type=str, required=True, help='Job tech stack')
request_model = api.model('Request', {
    'requestid': fields.String(required=True, description='The request ID'),
    'text': fields.String(required=True, description='The text data')
})
