const galeria = document.getElementById('galeria');
export const cerrarGaleria = ()=>{
    galeria.classList.remove('galeria--active');

    document.body.style.overflow = '';

};

