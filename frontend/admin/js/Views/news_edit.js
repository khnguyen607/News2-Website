function defaultFunc() {
    // hàm hiển thị bài viết 
    function show_category() {
        fetch('../../backend/index.php?controller=category')
            .then(response => response.json())
            .then(data => {
                data = data.filter(item => {
                    return item.status == '1'
                })
                data.forEach(item => {
                    var option = document.createElement('option')
                    option.textContent = item.name
                    option.value = item.id
                    document.querySelector('select[name="category_id"]').appendChild(option)
                });

                // hàm hiển thị phần edit 
                function show_edit(edit) {
                    fetch('../../backend/index.php?controller=new&action=findNew&id=' + edit)
                        .then(response => response.json())
                        .then(data => {
                            document.querySelector('input[name="title"]').value = data.title
                            document.querySelector('input[name="img"]').value = data.img
                            document.querySelector('select[name="category_id"]').value = data.category_id
                            document.querySelector('#editor').innerHTML = data.content
                            new Quill('#editor', {
                                theme: 'snow'
                            });
                        })
                }
                var edit = new URLSearchParams(window.location.search).get('edit')
                if (edit) show_edit(edit)
                else {
                    new Quill('#editor', {
                        theme: 'snow'
                    });
                }
            })
    }

    function submit__form() {
        document.getElementById('form__news').addEventListener('submit', function (event) {
            event.preventDefault(); // Ngăn chặn form submit mặc định

            // Lấy dữ liệu từ form
            const formData = new FormData(event.target);
            const jsonData = {};
            formData.forEach((value, key) => {
                jsonData[key] = value;
            });
            jsonData['content'] = document.querySelector('.ql-editor').innerHTML
            console.log(jsonData)
            // Gửi dữ liệu đến PHP
            var edit = new URLSearchParams(window.location.search).get('edit')
            var url = '../../backend/index.php?controller=new&action=addNew'
            if (edit) url = '../../backend/index.php?controller=new&action=editNew&id=' + edit
            else url = '../../backend/index.php?controller=new&action=addNew'
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(jsonData)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Server response:', data);
                    window.location.href = 'index.html'
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Xử lý lỗi (nếu cần)
                });
        });

    }

    // thực thi func 
    show_category()
    submit__form()


}

document.addEventListener('DOMContentLoaded', defaultFunc)