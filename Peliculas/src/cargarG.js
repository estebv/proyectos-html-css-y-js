import fetchG from "./fetchG";

const contenedorG = document.getElementById('filtro-generos')


const cargarG = async(filtro) =>{

    const generos = await fetchG(filtro);

    contenedorG.innerHTML = '';

    generos.forEach((genero) => {
        const btn = document.createElement('button');
        btn.classList.add('btn');
        btn.innerText = genero.name;
        btn.setAttribute('data-id', genero.id);
        
        contenedorG.appendChild(btn);
    });


}

export default cargarG;