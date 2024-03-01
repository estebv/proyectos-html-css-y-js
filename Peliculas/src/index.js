import fetchPeliculas from "./fetchPopulares";
import cargarT from './cargarTitulos';
import cargarG from './cargarG';
import './listenerFiltroG';
import './listenerBuscar';
import './listenerFiltro';
import './paginacion';
import './listenerItems';
import './listenerPopup';

const cargar = async()=>{
    const resultados = await  fetchPeliculas();
    cargarT(resultados);
    cargarG('movie');
};
cargar();


