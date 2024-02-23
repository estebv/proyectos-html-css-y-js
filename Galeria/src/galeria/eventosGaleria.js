import './cerrarGaleria';

const galeria = document.getElementById('galeria');

galeria.addEventListener('click', (e) => {
    const boton = e.target.closest('button');
    //cerrar galeria
    if(boton?.dataset?.accion === 'cerrar-galeria'){
        cerrarGaleria();
    }
    //carousel slide click
    console.log(e.target.dataset.id)
    



});

