/* Mostrar un contandor en pantalla manejado por teclado
Crear un contador que se vaya incrementando al presionar las flechas de arriba y abajo del teclado, siguiendo la siguiente lógica:

Empezar en cero.
Si el usuario presiona Enter tiene que empezar de nuevo.
Sumar uno si el usuario presiona arriba.
Restar uno si el usuario presiona abajo.
Video ejemplo

Códigos de letras

Enter: 13
Up: 38
Down: 40
Documentación:
Evento keydown jQuery */

var contador=0;

$(document).ready(function () {
    $(document).keydown(contar);
});

function contar(){
    // debugger
    switch (event.which){
        case 13: 
            contador = 0;
            break;
        case 38: 
            contador++;
            break;
        case 40: 
            contador--;
            break;
        default:
            break;
    }
    $("#contador").text(contador);
}