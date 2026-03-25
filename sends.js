// Функция для отправки POST запроса
async function storeValue(tag, value) {
    const url = 'http://tinywebdb.appinventor.mit.edu/storeavalue';
    
    // Создаем FormData
    const formData = new URLSearchParams();
    formData.append('tag', tag);
    formData.append('value', value);
    formData.append('fmt', 'html');
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString()
        });
        
        if (response.ok) {
            const text = await response.text();
            console.log('Успешно сохранено!', text);
            return text;
        } else {
            console.error('Ошибка:', response.status);
        }
    } catch (error) {
        console.error('Ошибка при отправке:', error);
    }
}

async function getValue(tag, val) {
    const url = 'http://tinywebdb.appinventor.mit.edu/getvalue';
    
    const formData = new URLSearchParams();
    formData.append('tag', tag);
    formData.append('fmt', 'html');
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString()
        });
        
        if (response.ok) {
            const text = await response.text();
            const match = text.match(/\["VALUE","[^"]*","([^"]*)"\]/);
            const mes = match[1];
            console.log(mes); 
            const new_mes = mes + "</br>" + val;
            storeValue(tag, new_mes);
            return mes;
        }
    } catch (error) {
        console.error('Ошибка при получении:', error);
    }
}


document.getElementById("send").addEventListener('click',  () =>{ 
    const tag = document.getElementById("tag").value;
    const val = document.getElementById("val").value;
    console.log(tag);
    console.log(val);
    getValue(tag, val);
 });