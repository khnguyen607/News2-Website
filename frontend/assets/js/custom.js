document.addEventListener('DOMContentLoaded', () => {
    function getCookie(cookieName) {
        var name = cookieName + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var cookieArray = decodedCookie.split(';');
        for (var i = 0; i < cookieArray.length; i++) {
            var cookie = cookieArray[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) == 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }

        return "";
    }

    fetch('layout.html')
        .then(response => response.text())
        .then(data => {
            var div = document.createElement('div')
            div.innerHTML = data
            document.querySelector('#header').innerHTML = div.querySelector('#header').innerHTML
            document.querySelector('footer.wpo-site-footer').innerHTML = div.querySelector('footer.wpo-site-footer').innerHTML
            if (getCookie('user_id')) {
                fetch('../backend/index.php?controller=user&action=findUser&id=' + getCookie('user_id'))
                    .then(response => response.json())
                    .then(data => {
                        document.querySelector('.header__username').classList.remove('d-none')
                        document.querySelector('.header__username').innerHTML = 'Chào, '+data.name
                        document.querySelector('.header__loginBtn').classList.add('d-none')
                    })
            }
            fetch('../backend/index.php?controller=category')
                .then(response => response.json())
                .then(data => {
                    data = data.filter(item=>{
                        return item.status == '1'
                    })
                    data.forEach(item => {
                        var li = document.createElement('li')
                        li.classList.add('menu-item-has-children')
                        li.innerHTML = `<a href="news.html?cat=${item.id}">${item.name}</a>`
                        document.querySelector('.menu__nav').appendChild(li)

                        if (window.location.href.includes('/news.html?cat=') || window.location.href.includes('/new.html?id=')) {
                            let li_m = document.createElement('li')
                            li_m.innerHTML = `<a href="news.html?cat=${item.id}">${item.name}</a>`
                            let li_m2 = li_m.cloneNode(true)
                            document.querySelector('.category-widget ul').appendChild(li_m)
                            document.querySelector('.tag-widget ul.footer__li').appendChild(li_m2)
                        }
                    });

                    // kiểm soát catgory của news 
                    var cat = new URLSearchParams(window.location.search).get('cat')
                    var query = new URLSearchParams(window.location.search).get('q')
                    if (window.location.href.includes('/index.html')) {
                        document.querySelector('ul.navbar-nav li a[href="index.html"]').classList.add('active')
                    }
                    else if (window.location.href.includes('/news.html?cat=' + cat)) {
                        document.querySelector(`ul.navbar-nav li a[href="news.html?cat=${cat}"]`).classList.add('active')
                        document.querySelector('.wpo-breadcumb-wrap h2').textContent = document.querySelector(`ul.navbar-nav li a[href="news.html?cat=${cat}"]`).textContent
                        document.querySelector('.wpo-breadcumb-wrap li span').textContent = document.querySelector(`ul.navbar-nav li a[href="news.html?cat=${cat}"]`).textContent
                    } else if (window.location.href.includes('/news.html?q=')){
                        document.querySelector('.wpo-breadcumb-wrap h2').textContent = 'Tìm nội dung: '+query
                        document.querySelector('.wpo-breadcumb-wrap li span').textContent = 'Tìm kiếm'
                    } else if (window.location.href.includes('/contact.html')){
                        document.querySelector('.wpo-breadcumb-wrap h2').textContent = `Liên hệ với chúng tôi`
                        document.querySelector('.wpo-breadcumb-wrap li span').textContent = 'Trang liên hệ'
                    }
                })

        })
})
