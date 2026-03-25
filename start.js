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



async function getValue(tag) {
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
            document.getElementById("answer").innerHTML = Number(mes) + 1;
            if(Number(mes) == 6)
            {
                document.getElementById("answer").innerHTML = "Комната заполнена";
                return mes;
            }
            if(mes == "")
            {
                console.log("1"); 
                storeValue(tag,"1");
               return mes;
            }
            for(let i=1;i<6;i++){
                if(Number(mes) == i)
                {
                    console.log("mes " + mes + " i "+ i);
                    storeValue(tag,i+1);
                    return mes;
                }
            }
            
            return mes;
        }
    } catch (error) {
        console.error('Ошибка при получении:', error);
    }
}
document.getElementById("send").addEventListener('click',  () =>{ 
    const tag = document.getElementById("tag").value;
    console.log(tag);
    getValue(tag);
 });

