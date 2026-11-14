/* Varibales Globales */
let valorActual = '0'; /*El número que se está mostrando en la pantalla */
let valorAnterior = ''; /* El número que se guarda antes de presionar una operación */
let operadorActual = null; /*El signo de la operación (+, -, *, /) */ 
let previousKeyType = 'number'; 

/* Trae el elemento de la pantalla del HTML para poder modificarlo */
const pantalla = document.getElementById('pantalla');

/* Funciones Matemáticas */
/* Se utiliza parseFloat  para convertir los textos a números y aceptar decimales */
function sumar(n1, n2) { return parseFloat(n1) + parseFloat(n2); }
function restar(n1, n2) { return parseFloat(n1) - parseFloat(n2); }
function multiplicar(n1, n2) { return parseFloat(n1) * parseFloat(n2); }
function dividir(n1, n2) {
    if (parseFloat(n2) === 0) return "Error";
    return parseFloat(n1) / parseFloat(n2);
}

/* Función principal: Agregar Número */
/* Se ejecuta cada vez que se presiona un número del 0 al 9 o el punto decimal */
function agregarNumero(numero) {
    /* Si la pantalla muestra un error, se limpia antes de empezar de nuevo */
    if (valorActual === 'Error') limpiar();

    /* Si el último clic fue un operador o el botón igual, se reemplaza la pantalla con el nuevo número */
    if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
        valorActual = numero;
    } else {
        if (numero === '.' && valorActual.includes('.')) return;
        valorActual = valorActual === '0' && numero !== '.' ? numero : valorActual + numero;
    }
    
    previousKeyType = 'number';
    actualizarPantalla();
}

/* Funcion principal: Operacione */
function operacion(siguienteOperador) {
    /* Si ya hay una operación pendiente, se calcula el resultado parcial */
    if (operadorActual !== null && previousKeyType === 'number') {
        calcular();
    }

    /*Guardamos el número actual en la memoria y el operador seleccionado */
    valorAnterior = valorActual;
    operadorActual = siguienteOperador;
    previousKeyType = 'operator';
}

/* Función principal: Calcular (=) */
function calcular() {
    if (operadorActual === null || previousKeyType === 'operator') return;

    let resultado = 0;
    
    /* Switch para evaluar el operador y llamar a la función matemática correspondiente */
    switch (operadorActual) {
        case '+': resultado = sumar(valorAnterior, valorActual); break;
        case '-': resultado = restar(valorAnterior, valorActual); break;
        case '*': resultado = multiplicar(valorAnterior, valorActual); break;
        case '/': resultado = dividir(valorAnterior, valorActual); break;
    }

    /* Se guarda el resultado en la variable actual */
    valorActual = resultado.toString();
    operadorActual = null;
    previousKeyType = 'calculate';
    actualizarPantalla();
}

/* Funcion: Limpiar (C) */
/* Reinicia todas las variables a su estado inicial */
function limpiar() {
    valorActual = '0';
    valorAnterior = '';
    operadorActual = null;
    previousKeyType = 'number';
    actualizarPantalla();
}

/* Funcion: Actualizar Pantalla */
function actualizarPantalla() {
    pantalla.value = valorActual;
}