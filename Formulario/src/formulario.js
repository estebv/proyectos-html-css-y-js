import marcarPaso from "./marcarPaso";
import siguientePaso from "./siguientePaso";
import validarCorreo from "./validaciones/validarCorreo";
import validarNombre from "./validaciones/validarNombre";
import validarCantidad from "./validaciones/validarCantidad";

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
