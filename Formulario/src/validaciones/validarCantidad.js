const formulario = document.getElementById('formulario');

const validarCantidad = () => {
    //(0-9 & . decimales)
    const expReg = /^\d+(\.\d+)?$/; 
    //input cantidad
    const inputCantidad = formulario.cantidad;
    
    if(expReg.test(inputCantidad.value)){
        inputCantidad.classList.remove('formulario__input--error');
        return true;
    }else{
        inputCantidad.classList.add('formulario__input--error');
        return false;

    }
};
export default validarCantidad;