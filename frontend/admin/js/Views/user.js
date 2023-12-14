function defaultFunc() {
    var user__info = document.querySelector('.user__info').cloneNode(true)
    // hàm hiển thị bài viết 
    function show_user() {
        document.querySelector('.user__list').innerHTML = ''
        fetch('../../backend/index.php?controller=user')
            .then(response => response.json())
            .then(data => {
                data = data.filter(item=>{
                    return item.status == "1"
                })
                
                data.forEach(item => {
                    console.log(item)
                    var user__infoClone = user__info.cloneNode(true)
                    var td = user__infoClone.querySelectorAll('td')
                    td[0].textContent = item.name
                    td[1].textContent = item.user
                    td[2].textContent = item.email
                    td[3].querySelector('.delete').href = '../../backend/index.php?controller=user&action=delUser&id='+item.id
                    document.querySelector('.user__list').appendChild(user__infoClone)
                });

                $(document).ready(function () {
                    new DataTable('#example5', {
                        searching: false,
                        lengthChange: false
                    });
                });
            })

    }

    // thực thi func 
    show_user()

    document.querySelector('.search__form').addEventListener('input', () => {
        document.querySelectorAll('.user__info').forEach(item => {
            let check = item.querySelectorAll('td')[0].textContent.toLowerCase().includes(document.querySelector('.search__form').value.toLowerCase())
            || item.querySelectorAll('td')[1].textContent.toLowerCase().includes(document.querySelector('.search__form').value.toLowerCase())
            || item.querySelectorAll('td')[2].textContent.toLowerCase().includes(document.querySelector('.search__form').value.toLowerCase())
            if (check) {
                item.classList.remove('d-none')
            } else {
                item.classList.add('d-none')
            }
        })
    })
}

document.addEventListener('DOMContentLoaded', defaultFunc)