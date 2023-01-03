const all = document.querySelector('.all')

fetch('https://jsonplaceholder.typicode.com/todos').then(resp=>resp.json()).then(resp=>{

    resp.map(item=>{
        const oneT= document.createElement('div')
        all.append(oneT)
        return oneT.innerHTML = `<div class="block">
                                    <p>${item.userId}</p>
                                    <p>${item.id}</p>
                                    <p>${item.title}</p>
                                    <p>${item.completed}</p>
                                </div>
                                `
    })

})