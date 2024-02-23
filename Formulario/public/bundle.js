'use strict';

const marcarPaso = (paso) => {
    document.querySelector(`.linea-pasos [data-paso="${paso}"] span`).classList.add('linea-pasos__paso-check--checked');

};

const siguientePaso = () =>{
    //crear array
    const pasos = [...document.querySelectorAll('.linea-pasos__paso')];

    //paso activo
    const pasoActivo = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso');
    //index paso activo
    const indexPasoActivo = pasos.indexOf(pasoActivo);

    if(indexPasoActivo < pasos.length -1){
        pasoActivo.querySelector ('span').classList.remove('linea-pasos__paso-check--active'); 
        //se desplaza el punto
        pasos[indexPasoActivo + 1].querySelector('span').classList.add('linea-pasos__paso-check--active');

        const id = pasos[indexPasoActivo + 1].dataset.paso; 
        document.querySelector(`.formulario__body [data-paso="${id}"]`).scrollIntoView({
            inline: 'start',
            behavior: 'smooth',
        });
    }


};

const formulario$3 = document.getElementById('formulario');

const validarCorreo = () => {
    //(0-9 & . decimales)
    const expRegCorreo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    //input cantidad
    const inputCorreo = formulario$3['correo-receptor'];
    
    if(expRegCorreo.test(inputCorreo.value)){
        inputCorreo.classList.remove('formulario__input--error');
        return true;
    }else {
        inputCorreo.classList.add('formulario__input--error');
        return false;

    }
};

const formulario$2 = document.getElementById('formulario');

const validarNombre = () => {
    //(0-9 & . decimales)
    const expRegNombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;

    //input 
    const inputNombre = formulario$2['nombre-receptor'];
    
    if(expRegNombre.test(inputNombre.value)){
        inputNombre.classList.remove('formulario__input--error');
        return true;
    }else {
        inputNombre.classList.add('formulario__input--error');
        return false;

    }
};

const formulario$1 = document.getElementById('formulario');

const validarCantidad = () => {
    //(0-9 & . decimales)
    const expReg = /^\d+(\.\d+)?$/; 
    //input cantidad
    const inputCantidad = formulario$1.cantidad;
    
    if(expReg.test(inputCantidad.value)){
        inputCantidad.classList.remove('formulario__input--error');
        return true;
    }else {
        inputCantidad.classList.add('formulario__input--error');
        return false;

    }
};

const formulario = document.getElementById('formulario');
//reinio del scroll
formulario.querySelector('.formulario__body').scrollLeft = 0;

//sirve para comprobar los datos cuando el usuario esta escribiendo.
formulario.addEventListener('keyup', (e) => {
    if(e.target.tagName === 'INPUT'){
        if(e.target.id === 'cantidad') {
            validarCantidad();

        }else if(e.target.id === 'nombre-receptor' ){
            validarNombre();
        }else if (e.target.id === 'correo-receptor' ){
            validarCorreo();

        }
    }

});
//click boton
const bntFormulario = document.getElementById('formulario__btn');

bntFormulario.addEventListener('click', (e) => {
    e.preventDefault();

    const pasoActual = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso').dataset.paso;

    if(pasoActual === 'cantidad'){
        if(validarCantidad()){
            marcarPaso('cantidad');
            siguientePaso();
        }
    }else if(pasoActual === 'datos'){
        if(validarNombre() && validarCorreo()){
            marcarPaso('datos');
            siguientePaso();
        }
    }else if(pasoActual === 'metodo'){
        marcarPaso('metodo');
        //formato moneda
        const opciones = {style: 'currency', currency: 'COP'};
        const formatoMoneda = new Intl.NumberFormat('es-mx', opciones);

        document.querySelector('[data-valor = "cantidad"] span').innerText = formatoMoneda.format(formulario.cantidad.value);
        document.querySelector('[data-valor = "nombre-receptor"] span').innerText = formulario['nombre-receptor'].value;
        document.querySelector('[data-valor = "correo-receptor"] span').innerText = formulario['correo-receptor'].value;
        document.querySelector('[data-valor = "metodo"] span').innerText = formulario['metodo'].value;
//texto boton tranferir
        bntFormulario.querySelector('span').innerHTML = 'transferir';
        //clase desabilitar btn
        bntFormulario.classList.add('formulario__btn-disabled');
        //ocultar btn siguiente
        bntFormulario.querySelector('[data-icono="siguiente"]').classList.remove('formulario__btn-contenedor-icono--active');

        //mostrar icono 
        bntFormulario.querySelector('[data-icono="banco"]').classList.add('formulario__btn-contenedor-icono--active');


        siguientePaso();

        //4sg
        setTimeout(() =>{
            bntFormulario.classList.remove('formulario__btn-disabled');
        },4000);
    }else if(pasoActual === 'confirmacion' && !bntFormulario.matches('.formulario__bnt--disabled')){


        //peticioon al servidor
        
        //cambiamos texto boton 
        bntFormulario.querySelector('span').innerText = 'Transfiriendo';
        //dehabilita el boton
        bntFormulario.classList.add('.formulario__bnt--disabled');

        setTimeout(()=>{
            formulario.classList.add('formulario--hidden');
            document.getElementById('alerta').classList.add('alerta--active');
        },4000);

    }

});
//# sourceMappingURL=bundle.js.map
