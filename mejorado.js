
const perso = document.getElementById('perso')
const paginaActual = document.getElementById('paginaActual')
let pagina = 1
let ultimaPage = 42

const genero = document.getElementById('genero')
const nombre = document.getElementById('nombre')
const btnAvanzar = document.getElementById('btn-avanzar')
const btnPagina = document.getElementById('btn-pagina')

const prevPagina = document.getElementById('atras')
const proximaPagina = document.getElementById('siguiente')
const ultimaPagina = document.getElementById('ultimo')

const primerPagina = document.getElementById('primero')

/* RENDER Pagina */
const traerPaginas = async (pagina) => {
    try {
        let resultadosJson = await getData()
        let arrayResultados = resultadosJson.results
        printPagina(arrayResultados)
        ultimaPage = resultadosJson.info.pages
        updatePag(pagina, ultimaPage)
    } catch (error) {
        console.log(error, 'entre al cacth de traer paginas')
        perso.innerHTML = ''
        perso.innerHTML = 'no se encontraron resultados'
        btnPagina.innerHTML = ''
        pagina = ''
    }
}
const printPagina = (arrayResultados) => {
    perso.innerHTML = ''
    console.log(arrayResultados)
    actualizarCantPersonajes(arrayResultados)
    console.log(arrayResultados)
    console.log('despues de print')
    arrayResultados.forEach((element) => {
        let div = document.createElement('div')
        div.classList = element['status'].toLowerCase() + ' cardEfect'
        div.innerHTML = crearCard(element)
        perso.appendChild(div)
    })
}


/*Render Botones */
const paginaActualRender = (pag) => {
    paginaActual.textContent = `${pag}`
}


/*traer data */
const getData = async () => {
    const URL = `https://rickandmortyapi.com/api/character?page=${pagina}`;
    const response = await fetch(URL);
    const json = await response.json();
    data = json;
    return json;
};
getData(pagina);
let data = getData(pagina);






const mujeres = document.getElementById('mujeres')
const hombres = document.getElementById('hombres')
const sinGenero = document.getElementById('sinGenero')
const desconocido = document.getElementById('desconocido')
const todos = document.getElementById('todos')
//Filtros
mujeres.addEventListener("click", () => {
    const arr = data.results
    const arrMujeres = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].gender === "Female") {
            arrMujeres.push(arr[i]);
        }
    }
    actualizarCantPersonajes(arrMujeres)
    printPagina(arrMujeres);
});
/*Filtros por pagina */

hombres.addEventListener("click", () => {
    const arr = data.results
    const arrHombres = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].gender === "Male") {
            arrHombres.push(arr[i]);
        }
    }
    actualizarCantPersonajes(arrHombres)
    printPagina(arrHombres);
});
sinGenero.addEventListener("click", () => {
    const arr = data.results;

    const arrSinGenero = [];
    arr.filter((element) => {

        if (element.gender === "genderless") {
            arrSinGenero.push(element);
        }
    })
    actualizarCantPersonajes(arrSinGenero)
    printPagina(arrSinGenero);
});

desconocido.addEventListener("click", () => {
    const arr = data.results;

    const arrDesconocido = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].gender == "unknown") {
            arrDesconocido.push(arr[i]);
        }
    }
    actualizarCantPersonajes(arrDesconocido)
    printPagina(arrDesconocido);
});

todos.addEventListener("click", () => {
    const arr = data.results;
    actualizarCantPersonajes(arr);
    printPagina(arr);

});



/*Card a print */

const crearCard = (element) => {
    return `
    <button onclick="cargaPersonaje(${element['id']})" class="card-span">ver mas...</button>
    <ul class="card-container ${element['gender'].toLowerCase()}1">
    <p class="card-status">${element['status'] === 'Alive' ? '🟢Vivo' : '' || element['status'] === 'Dead' ? '🔴Muerto' : '' || element['status'] === 'unknown' ? '⚪ N/S' : ''}</p>
    <p class="modal-gender ${element['gender'].toLowerCase()}"></p>        
    <li class="card-img-container">
                <img src=${element['image']} alt="">
            </li>
            <li class="card-text">
                <p class="name"><span>${element['name']}</span></p>
                <p><span>${element['species']}</span></p>
            </li>
        </ul>
        
`
}
const updatePag = (pagina, ultimaPage) => {
    if (pagina <= 1) {
        prevPagina.disabled = true;
        primerPagina.disabled = true;
    } else {
        prevPagina.disabled = false;
        primerPagina.disabled = false;
    }

    if (pagina === ultimaPage) {
        ultimaPagina.disabled = true;
        proximaPagina.disabled = true;
    } else {
        ultimaPagina.disabled = false;
        proximaPagina.disabled = false;
    }
};


/*Funcionalidades de los botones*/
const avanzar = () => {
    if (pagina !== ultimaPage) {
        perso.innerHTML = ''
        pagina += 1
        data = getData(pagina);
        paginaActualRender(pagina)
        traerPaginas(pagina)

    }
}
const atras = () => {
    if (pagina !== 1) {
        perso.innerHTML = ''
        pagina -= 1
        data = getData(pagina);
        paginaActualRender(pagina)
        traerPaginas(pagina)
    }
}


const primero = () => {
    if (pagina !== 1) {
        perso.innerHTML = ''
        pagina = 1
        data = getData(pagina);
        paginaActualRender(pagina)
        traerPaginas(pagina)

    }
}

const ultimo = () => {
    if (pagina !== ultimaPage) {
        perso.innerHTML = ''
        pagina = ultimaPage
        data = getData(pagina);
        paginaActualRender(pagina)
        traerPaginas(pagina)
    }
}



const cantPersonajes = document.getElementById('cantPersonaje')
const actualizarCantPersonajes = (nuevoArray) => {

    cantPersonajes.textContent = ''
    cantPersonajes.textContent = `Cantidad de Personajes: ${nuevoArray.length}`
}


/*Inicializando programa */

paginaActualRender(1)
traerPaginas(1)
getData(1)
