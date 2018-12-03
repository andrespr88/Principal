/*Validar el campo email usando jQuery
El formulario deberá validar el campo email verificando que contenga arroba, punto y contenido. Si existe algún error deberá mostrar el campo en rojo

Si usamos Boostrap podemos mostrar que el campo es valido agregando la clase is-valid y mostrar que es invalido agregando la clase is-invalid.

Documentación:

Obtener o cambiar valor de un input jQuery
Evento blur jQuery
Add class jQuery
Remove class jQuery
Boostrap forms*/

$(document).ready(function(){
  var email = $("#inputEmail")   
  email.on("blur",validarEmail);
});

function validarEmail() {
  //verifica que tenga: string + "@" + string + "." + string(min 2 y max 4 caracteres) 
  var test = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/.test($(this).val());
  if (test) {
    //le saco la clase "is-invalid"; si no la tiene, no rompe ni hace nada        
    $(this).removeClass("is-invalid");
    //le agrego la clase "is-valid"
    $(this).addClass("is-valid");
    $("#emailHelp").text("El Mail es válido");
  } else {
    $(this).removeClass("is-valid");
    $(this).addClass("is-invalid");
    $("#emailHelp").text("El Mail es inválido");
  }
}