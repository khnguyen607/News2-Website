function defaultFunc() {
    var divtoNew = document.querySelector('.news__info').cloneNode(true)
    var divtoCategory = document.querySelector('.category__info').cloneNode(true)
    // hàm hiển thị bài viết 
    function show_news() {
        document.querySelector('.news__list').innerHTML = ''
        fetch('../../backend/index.php?controller=new')
            .then(response => response.json())
            .then(data => {
                data = data.filter(item=>{
                    return item.status == "1"
                }).sort((a,b)=>{
                    return b.id - a.id
                })
                
                data.forEach(item => {
                    var divNew = divtoNew.cloneNode(true)
                    divNew.querySelector('h4 a').textContent = item.title
                    divNew.querySelector('h4 a').href = '../new.html?id='+item.id
                    divNew.querySelector('.price').textContent = '#'+item.id
                    divNew.querySelector('span.item.date').textContent = item.date
                    divNew.querySelector('.author').textContent = item.author
                    divNew.querySelector('img').src = item.img
                    divNew.querySelector('.delete').href = '../../backend/index.php?controller=new&action=delNew&id='+item.id
                    divNew.querySelector('.edit').href = 'new_edit.html?edit='+item.id
                    document.querySelector('.news__list').appendChild(divNew)
                });
            })

    }

    function show_category() {
        document.querySelector('.category__list').innerHTML = ''
        fetch('../../backend/index.php?controller=category')
            .then(response => response.json())
            .then(data => {
                data = data.filter(item=>{
                    return item.status == "1"
                })

                data.forEach(item => {
                    var divCategory = divtoCategory.cloneNode(true)
                    divCategory.querySelector('span').textContent = item.name
                    divCategory.querySelector('button').setAttribute('onclick', `window.location.href= '../../backend/index.php?controller=category&action=delCategory&id=${item.id}'`)
                    document.querySelector('.category__list').appendChild(divCategory)
                });
            })

    }

    // thực thi func 
    show_news()
    show_category()

    document.querySelector('.search__form').addEventListener('input', () => {
        document.querySelectorAll('.news__info').forEach(item => {
            let check = item.querySelector('h4 a').textContent.toLowerCase().includes(document.querySelector('.search__form').value.toLowerCase())
            || item.querySelector('.author').textContent.toLowerCase().includes(document.querySelector('.search__form').value.toLowerCase())
            // || item.querySelector('span span').textContent.toLowerCase().includes(document.querySelector('.search__form').value.toLowerCase())
            if (check) {
                item.classList.remove('d-none')
            } else {
                item.classList.add('d-none')
            }
        })
    })
    
}

document.addEventListener('DOMContentLoaded', defaultFunc)