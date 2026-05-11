import requests
import re
import ast

def get_value(tag):
    url = 'http://tinywebdb.appinventor.mit.edu/getvalue'
    
    data = {
        'tag': tag, 
        'fmt': 'html'
        }
    

    response = requests.post(
        url,
        data=data
    )
    
    response.encoding = 'utf-8'
    text = response.text
    


    match = re.search(r'\[.*\]', text) 
    value = ast.literal_eval(match.group())
    return value[2]

get_value("gg")
