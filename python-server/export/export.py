# from flask import Flask, request, jsonify
# from werkzeug.datastructures import FileStorage
# from flask_restx import Api, Resource, fields, reqparse
# import openai,PyPDF2,os,json,re
# from dotenv import load_dotenv
# from utils.conversions.extract_text_from_pdf import pdf_to_text
# from utils.response.cv_response import generate_score
# from utils.response.cv_response import clean_response
# from helper.parser import file_parser, request_model
# from routes.process import improve_jd
# from routes.process import cv_score
from flask import Flask, request
from flask_restx import Api, Resource, fields, reqparse
from dotenv import load_dotenv
import openai,os