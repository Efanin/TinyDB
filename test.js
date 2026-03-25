document.getElementById("but").addEventListener('click', () => {
    const val1 = document.getElementById("val1").value; 
    const val2 = document.getElementById("val2").value; 
    
    if (val1 > val2)
        console.log("val1");
    else
        console.log("val2");

});