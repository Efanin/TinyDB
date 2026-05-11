import requests

def store_value(tag, value):
    url = 'http://tinywebdb.appinventor.mit.edu/storeavalue'
    data = {
        'tag': tag,
        'value': value,
        'fmt': 'html'
    }
    

    response = requests.post(
        url,
        data=data
    )
    print("отправлено")
        
store_value("gg","какдела")
