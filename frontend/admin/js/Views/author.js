function defaultFunc() {
    var author__info = document.querySelector('.author__info').cloneNode(true)
    // hàm hiển thị bài viết 
    function show_author() {
        document.querySelector('.author__list').innerHTML = ''
        fetch('../../backend/index.php?controller=author')
            .then(response => response.json())
            .then(data => {
                data = data.filter(item=>{
                    return item.status == "1"
                })
                
                data.forEach(item => {
                    var author__infoClone = author__info.cloneNode(true)
                    var td = author__infoClone.querySelectorAll('td')
                    td[0].textContent = item.name
                    td[1].textContent = item.user
                    td[2].textContent = item.email
                    td[3].querySelector('.delete').href = '../../backend/index.php?controller=author&action=delAuthor&id='+item.id
                    document.querySelector('.author__list').appendChild(author__infoClone)
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
    show_author()

    document.querySelector('.search__form').addEventListener('input', () => {
        document.querySelectorAll('.author__info').forEach(item => {
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