document.addEventListener('DOMContentLoaded', () => {
    function getCookie(cookieName) {
        // Split the document.cookie string into an array of key-value pairs
        const cookieArray = document.cookie.split('; ');
    
        // Loop through each pair to find the specified cookie
        for (const cookiePair of cookieArray) {
            const [name, value] = cookiePair.split('=');
    
            // Trim any leading or trailing whitespace
            const trimmedName = name.trim();
    
            // Check if the current cookie is the one we're looking for
            if (trimmedName === cookieName) {
                // Decode and return the cookie value
                return decodeURIComponent(value);
            }
        }
    
        // Return null if the cookie is not found
        return null;
    }
    if (!getCookie('author_id')) window.location.href='login.html'
    fetch('layout.html')
        .then(response => response.text())
        .then(data => {
            var div = document.createElement('div')
            div.innerHTML = data
            document.querySelector('div.header').innerHTML = div.querySelector('div.header').innerHTML
            // document.querySelector('.deznav').innerHTML = div.querySelector('.deznav').innerHTML

            fetch('../../backend/index.php?controller=author&action=findAuthor&id=' + getCookie('author_id'))
                .then(response => response.json())
                .then(data => {
                    document.querySelector('.header__name').textContent = data.name

                    if(data.role == '1'){
                        document.querySelectorAll('#menu li').forEach(item=>{
                            item.classList.remove('d-none')
                        })
                    } else {
                        document.querySelectorAll('#menu li').forEach((item,index)=>{
                            if (index != 0)
                                item.classList.add('d-none')
                        })
                    }
                })
        })
})