
import cargarG from "./cargarG";
import cargarT from "./cargarTitulos";
import fetchPeliculas from "./fetchPopulares";

const filtroP = document.getElementById('movie');
const filtroS = document.getElementById('tv');

filtroP.addEventListener('click', async(e) =>{
    e.preventDefault('movie');
    //generos barra lateral
    cargarG('movie');
//obtenemos los resultados
const resultados = await fetchPeliculas('movie');

//se carga al dom
cargarT(resultados);


filtroS.classList.remove('btn--active');
filtroP.classList.add('btn--active');
document.querySelector('#populares .main__titulo').innerText = 'Peliculas Populares';  
});

filtroS.addEventListener('click', async (e) =>{
    e.preventDefault();

//generos barra lateral
    cargarG('tv');
//obtenemos los resultados
const resultados = await fetchPeliculas('tv');

//se carga al dom
cargarT(resultados);


filtroP.classList.remove('btn--active');
filtroS.classList.add('btn--active');
document.querySelector('#populares .main__titulo').innerText = 'Series Populares';  
});  


