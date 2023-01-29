document.addEventListener('click', event =>{
    if(event.target.dataset.type === 'remove'){
        const id = event.target.dataset.id

       remove(id).then(()=>{
           event.target.closest('li').remove()
       })
    }
    if(event.target.dataset.type === "editing"){
        const id = event.target.dataset.id
        const content = event.target.closest('li').querySelector('.title').textContent
        const newValue = prompt("Выберете новое название", content)

        console.log(newValue)
        editingContents(id, newValue).then(()=>{
            event.target.closest('li').querySelector('.title').innerText = newValue
        })


    }

})

async function remove(id){
   await fetch(`/${id}`, {
        method:'DELETE'
    })
}
async function editingContents(id, newValue){
    await fetch(`/${id}`, {
        method:'PUT',
        body: JSON.stringify({value: newValue}),
        headers: {
            'Content-Type': 'application/json'
        }


    })
}