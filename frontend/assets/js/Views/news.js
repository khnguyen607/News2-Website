function defaultFunc() {
    var cat = new URLSearchParams(window.location.search).get('cat')
    var query = new URLSearchParams(window.location.search).get('q')
    var divtoNew = document.querySelector('.news__info').cloneNode(true)
    // hàm hiển thị bài viết 
    function show_news() {
        document.querySelector('.news__list').innerHTML = ''
        fetch('../backend/index.php?controller=new')
            .then(response => response.json())
            .then(data => {
                if (query) {
                    data = data.filter(item => {
                        return item.title.toLowerCase().includes(query.toLowerCase()) && item.status == '1'
                    })
                } else if (cat) {
                    data = data.filter(item => {
                        return item.category_id == cat && item.status == '1'
                    })
                }

                data.forEach(item => {
                    console.log(item)
                    var divNew = divtoNew.cloneNode(true)
                    divNew.querySelector('h3 a').textContent = item.title
                    divNew.querySelector('.views').textContent = item.views
                    let date = item.date.split('-')
                    divNew.querySelector('.date').textContent = `${date[2]} Th${date[1]}, ${date[0]}`
                    divNew.querySelector('img').src = item.img
                    divNew.querySelectorAll('a').forEach(a => a.href = `new.html?id=` + item.id)
                    document.querySelector('.news__list').appendChild(divNew)
                });
            })

    }
    function news_hot() {
        var newhot__info = document.querySelector('.newhot__info').cloneNode(true)
        document.querySelector('.newhot__list').innerHTML = ''
        fetch('../backend/index.php?controller=new')
            .then(response => response.json())
            .then(data => {
                // Lấy ngày hiện tại
                var currentDate = new Date();
                // Lấy ngày bắt đầu của tuần hiện tại (ngày thứ Hai)
                var firstDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1));
                // Lấy ngày kết thúc của tuần hiện tại (ngày Chủ Nhật)
                var lastDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (7 - currentDate.getDay()));
                // Lọc các đối tượng có thuộc tính 'date' trong tuần hiện tại
                var new_hot = data.filter(item => {
                    var itemDate = new Date(item.date);
                    return itemDate >= firstDayOfWeek && itemDate <= lastDayOfWeek;
                });
                new_hot.sort((a, b) => {
                    return b.views - a.views
                }).slice(0, 5).forEach(item => {
                    var newhot__infoClone = newhot__info.cloneNode(true)
                    console.log(newhot__infoClone)
                    newhot__infoClone.querySelector('img').src = item.img
                    newhot__infoClone.querySelector('span').textContent = item.date
                    newhot__infoClone.querySelector('a').textContent = item.title
                    newhot__infoClone.querySelector('a').href = 'new.html?id=' + item.id
                    document.querySelector('.newhot__list').appendChild(newhot__infoClone)
                })
            })

    }
    // thực thi func 
    show_news()
    news_hot()
}

document.addEventListener('DOMContentLoaded', defaultFunc)