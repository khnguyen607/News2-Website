function defaultFunc() {
    fetch('../backend/index.php?controller=new')
        .then(response => response.json())
        .then(data => {
            data = data.filter(item=>{
                return item.status == '1'
            }).sort((a,b)=>{
                b.id-a.id
            })

            document.querySelectorAll('.news__1').forEach((item,index)=>{
                let new_1 = data.slice(0,5)
                item.querySelector('img').src = new_1[index].img
                item.querySelector('.thumb').textContent=new_1[index].category
                item.querySelector('a[href="new.html"]').textContent=new_1[index].title
                item.querySelector('a[href="new.html"]').href='new.html?id='+new_1[index].id
                item.querySelector('.author').textContent=new_1[index].author
                item.querySelector('.date').textContent=new_1[index].date
            })
            // document.querySelectorAll('.news__2').forEach((item,index)=>{
            //     let new_1 = data.slice(1,2)
            //     item.querySelector('img').src = new_1[index].img
            //     item.querySelector('.thumb').textContent=new_1[index].category
            //     item.querySelector('a[href="new.html"]').textContent=new_1[index].title
            //     item.querySelector('a[href="new.html"]').href='new.html?id='+new_1[index].id
            //     item.querySelector('.author').textContent=new_1[index].author
            //     item.querySelector('.date').textContent=new_1[index].date
            // })
        })
}

document.addEventListener('DOMContentLoaded', defaultFunc)