function defaultFunc() {
    var loginF = new URLSearchParams(window.location.search).get('loginF')
    if (loginF) {
        document.querySelector('#user').value = loginF
        document.querySelector('.loginF').classList.remove('d-none')
    }
    document.querySelector('.reveal6').onclick = () => document.querySelector('#pass').type = document.querySelector('#pass').type == 'password' ? 'text' : 'password'
}

document.addEventListener('DOMContentLoaded', defaultFunc)