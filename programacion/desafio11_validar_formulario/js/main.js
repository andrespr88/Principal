/*
Validar un formulario usando jQuery
El formulario deberá contar con los siguientes campos y validarlo la primera vez cuando el usuario pierda el foco, pero a partir de la siguiente validarlo en cada cambio del input usando jQuery para manipular el DOM.

Nombre: Deberá tener contenido.
Email: Deberá contener arroba, punto y contenido.
Comentarios: Deberá tener contenido.
Si existe algún error deberá mostrar el campo en rojo y un mensaje indicando el tipo de error debajo del input.

Deberá tener un botón para enviar la información que deberá habilitarse solo si todos los campos son validos.

Video ejemplo // https://www.useloom.com/share/155aa51507d943998b7d0fc827019c00

Si usamos Boostrap podemos mostrar que el campo es valido agregando la clase is-valid y mostrar que es invalido agregando la clase is-invalid. Para deshabilitar el botón hay que poner en true la propiedad disabled en el botón y para habilitarlo hay que cambiarla a false. Ej: $('myButton').attr('disabled', true).

Documentación:
Evento change jQuery
One jQuery
Listado de eventos jQuery 
*/



//En el enunciado dice usar el evento change, pero por lo que se ve en el video, usan alguno de los eventos key, en este caso use el keyup
$(document).ready(function () {
    $("#inputNombre").one("blur", validarCampoVacio);
    $("#inputApellido").one("blur", validarCampoVacio);
    $("#inputEmail").one("blur", validarEmail);
    $("#comentarios").one("blur", validarCampoVacio);
    $("#botonEnviar").attr("disabled",true);
});

function agregarClase(input, condicion, textoValido, textoError){
    if (condicion) {
        //le saco la clase "is-invalid"; si no la tiene, no rompe ni hace nada        
        input.removeClass("is-invalid");
        //le agrego la clase "is-valid"
        input.addClass("is-valid");
        //obtengo el elemento html que le sigue al input y muestro el mensaje de validacion
        input.next().text(textoValido);
    } else {
        input.removeClass("is-valid");
        input.addClass("is-invalid");
        //obtengo el elemento html que le sigue al input y muestro el mensaje de error
        input.next().text(textoError);
    }
}

function validarEmail() {
    //verifica que tenga: string + "@" + string + "." + string(min 2 y max 4 caracteres) 
    var test = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/.test($(this).val());
    var textoValido = "El Email es válido";
    var textoError = "El Email es inválido. Ejemplo: usuario@ejemplo.com";
    agregarClase($(this), test, textoValido, textoError);
    //compruebo que se cumplio el evento blur de one y le asocio el evento keyup
    if (event.type === 'blur') {
        $(this).keyup(validarEmail);
    }
    validarBoton();
}

function validarCampoVacio() { 
    //verifica que tenga: string + "@" + string + "." + string(min 2 y max 4 caracteres) 
    var test = $(this).val().trim();
    var textoValido = "";
    var textoError = "Complete este campo";
    agregarClase($(this), test, textoValido, textoError);
    //compruebo que se cumplio el evento blur de one y le asocio el evento keyup
    if (event.type === 'blur') {
        $(this).keyup(validarCampoVacio);
    }
    validarBoton();
}

function validarBoton() {
    //obengo los inputs con la clase is-valid 
    var inputs = $(".is-valid");
    //compruebo que esten validados los 4 campos; true: habilito el boton, false: lo deshabilito 
    (inputs.length === 4) ? $("#botonEnviar").attr("disabled",false) : $("#botonEnviar").attr("disabled",true)
}