def clean_object(response):
    cleaned_response = response.replace('\n', '').replace('\"', '"')
    print(f'Cleaned response: {cleaned_response}')
    return cleaned_response