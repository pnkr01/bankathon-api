import openai,json
def generate_score_reason(job_title, skills, resume_text):
    user_message = [
        {"role": "system", "content": """You are a HR. You want to hire candidates for your company. you get many resume for that job description Your job is to rank the resumes according to their alignment with the job title, skills, and resumes texts. 
                Input will be in the following format - 
                job title - job title will be provided here
                skills - skills will be provided here
                resume text - resume text will be provided here
                Output should be in the form of object with the following keys - 
                score -  the score of the resume based on job title, skills, and resumes texts
                """},
            {'role': 'user','content': f"""job title - {job_title} skills -{skills} and resume text - {resume_text}"""}
    ]
    
    response = openai.ChatCompletion.create(
        model="gpt-4",  
        messages=user_message
    )
    return response['choices'][0]['message']['content']

def generate_score(job_title,tech_stack,resume_text):
    response_data = generate_score_reason(job_title, tech_stack, resume_text)
    print(response_data)
    return json.loads(response_data), 200