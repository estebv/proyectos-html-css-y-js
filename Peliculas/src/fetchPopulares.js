import fetchG from "./fetchG";
import obtenerG from "./obtenerG";

const fetchPeliculas = async(filtro = 'movie') =>{
const tipo = filtro === 'movie' ? 'movie' :'tv';

    const url = `https://api.themoviedb.org/3/${tipo}/popular?api_key=79115a911471455c3104a48ea0e98739&language=es-MX&page=1`;

    try{
        const respuesta = await fetch(url);
        const datos =  await respuesta.json();
        const resultados =  datos.results;

        const generos = await fetchG()
        resultados.forEach((resultado) => {
            resultado.genero = obtenerG(resultado.genre_ids[0],generos);

        });


        return resultados;
    }catch(error){
        console.log(error);

    }

};

export default  fetchPeliculas;