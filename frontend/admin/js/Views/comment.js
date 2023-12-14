function defaultFunc() {
    var comment__info = document.querySelector('.comment__info').cloneNode(true)
    // hàm hiển thị bài viết 
    function show_comment() {
        document.querySelector('.comment__list').innerHTML = ''
        fetch('../../backend/index.php?controller=comment')
            .then(response => response.json())
            .then(data => {
                data = data.filter(item => {
                    return item.status == "1"
                })
                data.forEach(item => {
                    console.log(item)
                    var comment__infoClone = comment__info.cloneNode(true)
                    comment__infoClone.querySelector('h3 a').textContent = item.new
                    comment__infoClone.querySelector('span.fs-15').textContent = item.date
                    comment__infoClone.querySelector('span span').textContent = item.user
                    comment__infoClone.querySelector('.text-dark').textContent = item.content
                    comment__infoClone.querySelector('.delete').href = '../../backend/index.php?controller=comment&action=delCmt&id=' + item.id
                    document.querySelector('.comment__list').appendChild(comment__infoClone)
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
    show_comment()

    document.querySelector('.search__form').addEventListener('input', () => {
        document.querySelectorAll('.comment__info').forEach(item => {
            let check = item.querySelector('h3').textContent.toLowerCase().includes(document.querySelector('.search__form').value.toLowerCase())
            || item.querySelector('.text-dark').textContent.toLowerCase().includes(document.querySelector('.search__form').value.toLowerCase())
            || item.querySelector('span span').textContent.toLowerCase().includes(document.querySelector('.search__form').value.toLowerCase())
            if (check) {
                item.classList.remove('d-none')
            } else {
                item.classList.add('d-none')
            }
        })
    })
}

document.addEventListener('DOMContentLoaded', defaultFunc)