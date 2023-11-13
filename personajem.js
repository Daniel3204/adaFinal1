const modal=document.getElementById('modal')
const cargaPersona=document.getElementById('cargaPersona-modal')
const x=document.getElementById('x')
const body=document.querySelector('body')
const crearCard2 = (element) => {
    return `
        
    <button onclick="cerrarModal()" class="x">x</button>
        <ul class="modal-container">
        <p class="modal-status">${element['status']==='Alive'?'🟢Vivo':''||element['status']==='Dead'?'🔴Muerto':''||element['status']==='unknown'?'⚪ N/S':''}</p>
        <p class="modal-gender ${element['gender'].toLowerCase()}"></p>  
            <li class="modal-img-container">
                <img src=${element['image']} alt="">
            </li>
            <li class="modal-text">
                <p>nombre: <span class='name'>${element['name']}</span></p>
                <p>especie: <span>${element['species']}</span></p>
                <p>estado: <span>${element['status']==='Alive'?'vivo':''||element['status']==='Dead'?'muerto':''||element['status']==='unknown'?'desconocido':''}</span></p>
                <p>origen: <span>${element['origin'].name}</span></p>
                <p>genero: <span>${element['gender']==='Male'?'hombre':''||element['gender']==='Female'?'mujer':''||element['gender']==='Genderless'?'sin genero':''||element['gender']==='unknown'?'desconocido':''}</span></p>
                <p>localizacion: <span>${element['location'].name}</span></p>
            </li>
        </ul>
        
`
}
const cargaPersonaje = async (personajeId) => {
    try {
        const personaje = await fetch(`https://rickandmortyapi.com/api/character/${personajeId}`)
        const personajeJson = await personaje.json()
        // console.log(crearCard2(personajeJson))
        cargaPersona.innerHTML = crearCard2(personajeJson)
        cargaPersona.classList ='modal'+ personajeJson['status'].toLowerCase()
        cargaPersona.style.zIndex = 1000
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
        body.style.overflow = 'hidden'
        // console.log(cargaPersona)
    } catch (error) {
        console.log(error)
    }
}

const cerrarModal = () => {
    cargaPersona.innerHTML = ''
    cargaPersona.style.zIndex = -1
    body.style.overflow = 'auto'

}
















