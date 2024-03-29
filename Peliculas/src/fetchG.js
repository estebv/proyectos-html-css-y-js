const fetchG = async(filtro = 'movie') =>{
    const tipo = filtro === 'movie' ? 'movie' : 'tv';

    const url = `https://api.themoviedb.org/3/genre/${tipo}/list?api_key=79115a911471455c3104a48ea0e98739&language=es-MX`;

    try{
        const respuesta = await fetch(url);
        const datos =  await respuesta.json();
        return datos.genres;
    }catch(error){
        console.log(error);

    }

};

export default  fetchG;