'use strict';

const producto$1 = document.getElementById('producto');
const productoImagen = producto$1.querySelector('.producto__imagen');
const thumbs = producto$1.querySelector('.producto__thumbs');

// Color
const propiedadColor = producto$1.querySelector('#propiedad-color');

// Cantidad
const btnIncrementarCantidad = producto$1.querySelector('#incrementar-cantidad');
const btnDisminuirCantidad = producto$1.querySelector('#disminuir-cantidad');
const inputCantidad = producto$1.querySelector('#cantidad');

// Funcionalidad de las thumbnails
thumbs.addEventListener('click', (e) => {
	if (e.target.tagName === 'IMG') {
		const imagenSrc = e.target.src;

		// Obtenemos la posicion del ultimo /
		const lastIndex = imagenSrc.lastIndexOf('/');

		// Cortamos la cadena de texto para obtener solamente una parte.
		const nombreImagen = imagenSrc.substring(lastIndex + 1);

		// Cambiamos la ruta de la imagen del producto.
		productoImagen.src = `./img/tennis/${nombreImagen}`;
	}
});

// Cambiamos la imagen del producto dependiendo de la propiedad que seleccionen
propiedadColor.addEventListener('click', (e) => {
	if (e.target.tagName === 'INPUT') {
		// Cambiamos la ruta de la imagen del producto.
		productoImagen.src = `./img/tennis/${e.target.value}.jpg`;
		
	}
});

// Cambiamos la cantidad a agregar al carrito
btnIncrementarCantidad.addEventListener('click', (e) => {
	inputCantidad.value = parseInt(inputCantidad.value) + 1;
});
btnDisminuirCantidad.addEventListener('click', (e) => {
	if (parseInt(inputCantidad.value) > 1) {
		inputCantidad.value = parseInt(inputCantidad.value) - 1;
	}
});

var data = {
	productos: [
		{
			id: '1',
			nombre: 'Tennis Converse Standard',
			descripcion: 'Consectetur adipisicing elit.',
			precio: 500.0,
			colores: ['negro', 'rojo', 'amarillo'],
			tamaños: ['1,5', '2', '2,5', '3', '4'],
		},
		{
			id: '2',
			nombre: 'Tennis Converse 2000',
			descripcion: 'Consectetur adipisicing elit.',
			precio: 450.0,
			colores: ['negro', 'rojo', 'amarillo'],
			tamaños: ['1,5', '2', '2,5', '3', '4'],
		},
	],
};

const btnAbrirCarrito = document.querySelectorAll('[data-accion="abrir-carrito"]');
const btnCerrarCarrito = document.querySelectorAll('[data-accion="cerrar-carrito"]');
const btnAgregarCarrito = document.getElementById('agregar-al-carrito');
const producto = document.getElementById('producto');
const ventanaCarrito = document.getElementById('carrito');
const carrito = [];
const formatearMoneda = new Intl.NumberFormat('es-MX',{style:'currency',currency:'COP'});

const renderCarrito = () => {
    ventanaCarrito.classList.add('carrito--active');
    //bug eliminar prodcutos
    const productosAnteriores = ventanaCarrito.querySelectorAll('.carrito__producto');
    productosAnteriores.forEach(producto => producto.remove());
     //creamos div
    const itemCarrito = document.createElement('div');
    itemCarrito.classList.add('carrito__producto');

    carrito.forEach((productoCarrito) => {
        //se obtiene precio de la base de datos
        //cuando el id igual del item del carrito sea igual al de la lista
        data.productos.forEach((productoDb) => {
            if(productoDb.id === productoCarrito.id){
                productoCarrito.precio = productoDb.precio;
            }
        });
// ruta de la imagen par mostrar
        let thumbSrc = producto.querySelectorAll('.producto__thumb-img')[0].scr;
        if(productoCarrito.color === 'rojo'){
            thumbSrc ='/img/thumbs/rojo.jpg';
        }else if(productoCarrito.color === 'amarillo'){
            thumbSrc = '/img/thumbs/amarillo.jpg';
        }else if(productoCarrito.color === 'negro'){
            thumbSrc = '/img/thumbs/negro.jpg';
        }
        //plantilla html
        const plantillaProducto = `
        <div class="carrito__producto-info">
            <img src="${thumbSrc}" alt="" class="carrito__thumb" />
            <div>
                <p class="carrito__producto-nombre">
                    <span class="carrito__producto-cantidad">${productoCarrito.cantidad} x </span>${productoCarrito.nombre}
                </p>

                <p class="carrito__producto-propiedades">Tamaño:<span>${productoCarrito.tamaño}</span> Color:<span>${
    productoCarrito.color
}</span></p>
            </div>
        </div>
        <div class="carrito__producto-contenedor-precio">
            <button class="carrito__btn-eliminar-item" data-accion="eliminar-item-carrito">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                >
                    <path
                        d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
                    />
                </svg>
            </button>
            <p class="carrito__producto-precio">${formatearMoneda.format(productoCarrito.precio * productoCarrito.cantidad)}</p>
        </div>
    `;

        itemCarrito.innerHTML = plantillaProducto;
        ventanaCarrito.querySelector('.carrito__body').appendChild(itemCarrito);
    });
};
//abrir
btnAbrirCarrito.forEach((boton) =>{
    boton.addEventListener('click',(e)  => {
        renderCarrito();
    });
});
//cerrar
btnCerrarCarrito.forEach((boton) => {
    boton.addEventListener('click', (e) => {
        ventanaCarrito.classList.remove('carrito--active'); 
    });
});


btnAgregarCarrito.addEventListener ('click', (e) => {
	// Obtenemos los datos del producto, en este caso los obtengo desde la pagina del producto.
	// pero tambien se puede hacer una peticion al servidor para validar los datos.
	const id = producto.dataset.productoId;
	const nombre = producto.querySelector('.producto__nombre').innerText;
	const cantidad = parseInt(producto.querySelector('#cantidad').value);
	const color = producto.querySelector('#propiedad-color input:checked').value;
	const tamaño = producto.querySelector('#propiedad-tamaño input:checked').value;

	// Comprobamos que haya mas de un elemento en el carrito.
	if (carrito.length > 0) {
		// Variable que usamos para saber si el producto ya esta en el carrito o no.
	let productoEnCarrito = false;

    carrito.forEach((item)=>{
        if(item.id === id && item.nombre === nombre && item.color === color && item.tamaño === tamaño){
            item.cantidad += cantidad;
            productoEnCarrito = true;

        }
    });

    if(!productoEnCarrito){
        carrito.push({
			id: id,
			nombre: nombre,
			cantidad: cantidad,
			color: color,
			tamaño: tamaño,
		});


    }
	} else {
		// Si no hay ningun elemento entonces lo agregamos directamente.
		carrito.push({
			id: id,
			nombre: nombre,
			cantidad: cantidad,
			color: color,
			tamaño: tamaño,
		});
	}
});
//btn eliminar del caritto  
ventanaCarrito.addEventListener('click',{

});
