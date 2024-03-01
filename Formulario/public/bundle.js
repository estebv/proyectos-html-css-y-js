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

const validarCantidad = () => {
    //(0-9 & . decimales)
    const expReg = /^\d+(\.\d+)?$/; 
    //input cantidad
    const inputCantidad = formulario$3.cantidad;
    
    if(expReg.test(inputCantidad.value)){
        inputCantidad.classList.remove('formulario__input--error');
        return true;
    }else {
        inputCantidad.classList.add('formulario__input--error');
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

const validarCorreo = () => {
    //(0-9 & . decimales)
    const expRegCorreo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    //input cantidad
    const inputCorreo = formulario$1['correo-receptor'];
    
    if(expRegCorreo.test(inputCorreo.value)){
        inputCorreo.classList.remove('formulario__input--error');
        return true;
    }else {
        inputCorreo.classList.add('formulario__input--error');
        return false;

    }
};

const formulario = document.getElementById('formulario');

// Reiniciando scroll al cargar el formulario.
formulario.querySelector('.formulario__body').scrollLeft = 0;

// Eventlistener para comprobar los campos de formulario cuando el usuario corrige.
formulario.addEventListener('keyup', (e) => {
	if (e.target.tagName === 'INPUT') {
		if (e.target.id === 'cantidad') {
			validarCantidad();
		} else if (e.target.id === 'nombre-receptor') {
			validarNombre();
		} else if (e.target.id === 'correo-receptor') {
			validarCorreo();
		}
	}
});

const btnFormulario = document.getElementById('formulario__btn');
btnFormulario.addEventListener('click', (e) => {
	e.preventDefault();

	// Validamos el paso actual.
	const pasoActual = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso')
		.dataset.paso;

	if (pasoActual === 'cantidad') {
		if (validarCantidad()) {
			marcarPaso('cantidad');
			siguientePaso();
		}
	} else if (pasoActual === 'datos') {
		if (validarNombre() && validarCorreo()) {
			marcarPaso('datos');
			siguientePaso();
		}
	} else if (pasoActual === 'metodo') {
		marcarPaso('metodo');

		// Paso final, confirmación
		const opciones = { style: 'currency', currency: 'MXN' };
		const formatoMoneda = new Intl.NumberFormat('es-MX', opciones);

		// Obtenemos los valores del formulario y los pasamos a la seccion de confirmar.
		document.querySelector('[data-valor="cantidad"] span').innerText = formatoMoneda.format(
			formulario.cantidad.value
		);
		document.querySelector('[data-valor="nombre-receptor"] span').innerText = formulario['nombre-receptor'].value;
		document.querySelector('[data-valor="correo-receptor"] span').innerText = formulario['correo-receptor'].value;
		document.querySelector('[data-valor="metodo"] span').innerText = formulario.metodo.value;

		// Cambiamos el texto del btn a 'Transferir'
		btnFormulario.querySelector('span').innerText = 'Transferir';

		// Agregamos la clase que deshabilita el boton.
		btnFormulario.classList.add('formulario__btn--disabled');

		// Ocultamos el icono de siguiente.
		btnFormulario
			.querySelector('[data-icono="siguiente"]')
			.classList.remove('formulario__btn-contenedor-icono--active');

		// Mostramos el icono del banco.
		btnFormulario.querySelector('[data-icono="banco"]').classList.add('formulario__btn-contenedor-icono--active');

		siguientePaso();

		// Eliminamos la clase de disabled despues de 4 segundos.
		setTimeout(() => {
			btnFormulario.classList.remove('formulario__btn--disabled');
		}, 4000);

		// Comprobamos si estamos en el paso actual y el boton no tiene la clase de disabled
	} else if (pasoActual === 'confirmacion' && !btnFormulario.matches('.formulario__btn--disabled')) {
		// Aqui se haria una peticion al servidor, una redireccion, etc.

		// Cambiamos el texto del btn a 'Transferir'
		btnFormulario.querySelector('span').innerText = 'Transfiriendo';
		// Agregamos la clase que deshabilita el boton.
		btnFormulario.classList.add('formulario__btn--disabled');

		setTimeout(() => {
			formulario.classList.add('formulario--hidden');
			document.getElementById('alerta').classList.add('alerta--active');
		}, 4000);
	} else {
		siguientePaso();
	}
});

const linea = document.getElementById('linea-pasos');

linea.addEventListener('click', (e) => {
	// Validamos que el click sea en un paso
	if (!e.target.closest('.linea-pasos__paso')) return false;

	// Validamos el campo actual antes de saltar a otro.
	// Obtenemos el paso actual.
	const pasoActual = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso').dataset.paso;

	// Validamos el campo actual.
	if (pasoActual === 'cantidad') {
		if (!validarCantidad()) return false;
	} else if (pasoActual === 'datos') {
		if (!validarNombre() || !validarCorreo()) return false;
	}

	// Obtenemos el paso al que queremos navegar.
	const pasoANavegar = e.target.closest('.linea-pasos__paso');

	// Comprobamos si el paso tiene el icono de palomita.
	// Solo queremos poder dar click a los que tienen palomita.
	if (pasoANavegar.querySelector('.linea-pasos__paso-check--checked')) {
		// Obtenemos el paso actual.
		const pasoActual = linea.querySelector('.linea-pasos__paso-check--active');
		if (pasoActual) {
			// Le quitamos la clase de activo.
			pasoActual.classList.remove('linea-pasos__paso-check--active');
		}

		// Obtenemos el id del paso a navegar.
		const id = pasoANavegar.dataset.paso;

		// Nos aseguramos de que el texto del boton sea siguiente.
		const btnFormulario = document.querySelector('.formulario__btn');
		btnFormulario.querySelector('span').innerText = 'Siguiente';

		// Nos aseguramos de ocultar el icono de banco.
		btnFormulario.querySelector('[data-icono="banco"]').classList.remove('formulario__btn-contenedor-icono--active');

		// Nos aseguramos de mostrar el icono del siguiente.
		btnFormulario.querySelector('[data-icono="siguiente"]').classList.add('formulario__btn-contenedor-icono--active');

		// Nos aseguramos de que no tenga la clase de disabled.
		btnFormulario.classList.remove('formulario__btn--disabled');

		// Navegamos al paso.
		document.querySelector(`.formulario__body [data-paso="${id}"]`).scrollIntoView({
			inline: 'start',
			behavior: 'smooth',
		});

		// Agregamos la clase de active al nuevo paso.
		linea.querySelector(`[data-paso="${id}"] span`).classList.add('linea-pasos__paso-check--active');
	}
});
//# sourceMappingURL=bundle.js.map
