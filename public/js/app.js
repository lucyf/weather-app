
const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const msg1 = document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2');


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = searchElement.value
    
    msg1.textContent = 'Loading...'
    msg2.textContent = ''

    fetch('/weather?address=' + location).then((res)=>{
    res.json().then((data)=>{ // .json recibe la data y la parsea 
        if(data.error){
            msg1.textContent = data.error
            msg2.textContent = ''
        }else{
            msg1.textContent = data.location
            msg2.textContent = data.forecast
        }
    })
})
})