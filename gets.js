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
            console.log(mes); 
            document.getElementById("answer").innerHTML = mes;
            return mes;
        }
    } catch (error) {
        console.error('Ошибка при получении:', error);
    }
}
document.getElementById("get").addEventListener('click',  () =>{ 
    const mes = document.getElementById("mes").value;
    console.log(mes);
    getValue(mes);
 });

