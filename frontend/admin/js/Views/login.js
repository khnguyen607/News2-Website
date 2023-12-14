function defaultFunc() {
    var loginF= new URLSearchParams(window.location.search).get('loginF')
    if(loginF){
        document.querySelector('.loginF').classList.remove('d-none')
        document.querySelector('input[name="user"]').value = loginF
    }
}

document.addEventListener('DOMContentLoaded', defaultFunc)