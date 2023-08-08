from export.export import *
from routes.routes_export import *
app = Flask(__name__)
api = Api(app)
load_dotenv()
openai.api_key = os.getenv('API_KEY')

##-----------JD Improvement Request---------------##
@api.route('/enhance_jd', methods=['POST'])
def handle_enhance_jd():
    request_data = request.json
    return improve_jd(request_data)
##-----------JD Improvement Request Ends---------------##
 
##-----------Anaylyze Resume Starts---------------##   
@api.route('/analyze_cv', methods=['GET'])
def handle_analyze_cv():
    request_data = request.json
    return cv_score(request_data)
##-----------Anaylyze Resume Starts---------------##   
if __name__ == '__main__':
    app.run(debug=True)