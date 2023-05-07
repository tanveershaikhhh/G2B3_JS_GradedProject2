let userName = document.getElementById('username');
let pass = document.getElementById('password');
let form = document.getElementById('form');
let error = document.getElementById('error');


form.addEventListener('submit', submitHandler);

function submitHandler(event){
event.preventDefault();

for(let val of credentials){
    console.log(val.username, userName.value);
    if(val.username===userName.value&&val.password===pass.value){
        location.replace('./resume.html')
    }else{
        error.style.display = 'block';
    }
}

}