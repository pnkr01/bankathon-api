def clean_response(response):
    cleaned_response = response.replace('\n', '').replace('\"', '"')
    print(f'Cleaned response: {cleaned_response}')
    return cleaned_response