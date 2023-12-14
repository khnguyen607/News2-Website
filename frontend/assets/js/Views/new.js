function defaultFunc() {
    // hàm hiển thị bài viết 
    var cmt__info = document.querySelector('.cmt__info').cloneNode(true)
    function show_new() {
        var id = new URLSearchParams(window.location.search).get('id')
        // tăng lượt xem 
        fetch('../backend/index.php?controller=new&action=incViews&id=' + id)

        // đẩy nội dung 
        fetch('../backend/index.php?controller=new&action=findNew&id=' + id)
            .then(response => response.json())
            .then(data => {
                document.querySelector('.new__author').textContent = data.author
                document.querySelector('.new__views').textContent = data.views
                document.querySelector('.new__title').textContent = data.title
                document.querySelector('.new__content').innerHTML = data.content
                document.querySelector('.new__date').textContent = data.date
                document.querySelector('.new__img').src = data.img
                // ** thêm thông tin tác giả và bình luận 
                document.querySelector('.comment-form').action = '../backend/index.php?controller=comment&action=addComment&new_id=' + id
                fetch('../backend/index.php?controller=comment&action=getinNew&id=' + id)
                    .then(response => response.json())
                    .then(data => {
                        data = data.filter(item=>{
                            return item.status == '1'
                        })
                        document.querySelectorAll('.cmt__count').forEach(item => {
                            item.textContent = data.length
                        })
                        document.querySelector('.cmt__list').innerHTML = ''
                        data.forEach(item => {
                            var cmt__infoClone = cmt__info.cloneNode(true)
                            let date = item.date.split('-')
                            cmt__infoClone.querySelector('h4').innerHTML = `${item.user} <span class="comments-date">${date[2]} Th${date[1]}, ${date[0]}</span>`
                            cmt__infoClone.querySelector('p').textContent = item.content
                            document.querySelector('.cmt__list').appendChild(cmt__infoClone)
                        });
                    })
            })
    }

    // lây ra thông tin nóng trong tuần hiện tại
    function news_hot() {
        var newhot__info = document.querySelector('.newhot__info').cloneNode(true)
        document.querySelector('.newhot__list').innerHTML = ''
        fetch('../backend/index.php?controller=new')
            .then(response => response.json())
            .then(data => {
                data = data.filter(item=>{
                    return item.status == '1'
                })
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
                    newhot__infoClone.querySelector('a').href = 'new.html?id='+item.id
                    document.querySelector('.newhot__list').appendChild(newhot__infoClone)
                })
            })

    }

    // thực thi func 
    show_new()
    news_hot()
}

document.addEventListener('DOMContentLoaded', defaultFunc)