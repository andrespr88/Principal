$(document).ready(function (){
    //asocio el evento al boton motrar
    $("#mostrar").on("click", mostrarTodos);
    
    cargarPersonajes ("https://swapi.co/api/people/",1);
    
});

function cargarPersonajes(url, contador) {
    //borro el boton Ver mas    
    $("#boton").html("");
    var res = new XMLHttpRequest();
    res.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //obtengo el objeto parseando el JSON
            var res = JSON.parse(this.response)
            //obtengo el vector de los personajes
            var vector = res.results;
            //recorro el vector y voy mostrando cada uno de los personajes en la tabla del html
            imprimirPersonajes(vector, contador);
            //obtengo la url de la siguiente pag de personajes
            var pagina = res.next;
            // si la pagina existe vuelvo a llamar a la funcion
            if (pagina) {
                //uso el contador para mostrar el numero de personajes
                contador += 10
                //agrego el boton Ver mas y le asocio el evento con la url de la siguiente pagina
                $("#boton").html($("#boton").html()+'<div class="text-center"><button type="button" class="btn btn-success" onclick="cargarPersonajes(\''+pagina+'\','+contador+')">Ver mas</button></div>');
            }
        }
    }

    res.open("GET", url, true);
    res.send();
}

//muestro todos los personajes que esten ocultos
function mostrarTodos(){
    $("tr:hidden").show("slow");
}

//oculta el personaje en el html
function eliminarPersonaje(){
    var boton = $(event.target);
    //el boton es hijo de un td que a su vez es hijo del tr que quiero ocultar
    boton.parent().parent().fadeOut("slow");
}

function imprimirPersonajes(vector,contador){
    for (let i = 0; i < vector.length; i++) {
        var personaje = '<tr class="table-secondary"><th scope="row">' + (contador + i) + '</th><td>' + vector[i].name + '</td><td>' + traducirGenero(vector[i].gender) + '</td><td>' + convertir(vector[i].height,"cm") + '</td><td>' + convertir(vector[i].mass,"kg") + '</td><td>' + traducirColorOjos(vector[i].eye_color) + '</td><td class=""><button type="button" class="btn btn-danger btn-block btn-sm p-0" onclick="eliminarPersonaje()">Eliminar</button></td></tr>';
        $("#personajes").html($("#personajes").html() + personaje);
    }                
}

function traducirGenero(texto){
    switch (texto){
        case "male":
            texto = "masculino";
            break;
        case "female":
            texto = "femenino";
            break;
        case "hermaphrodite":
            texto = "hermafrodita";
            break;
        case "n/a":
            texto = "no aplica";
            break;
        default:
            break;
    }
    return texto;
}

function traducirColorOjos(texto){
    switch (texto){
        case "blue":
            texto = "azul";
            break;
        case "yellow":
            texto = "amarillo";
            break;
        case "red":
            texto = "rojo";
            break;
        case "brown":
            texto = "marrón";
            break;
        case "blue-gray":
            texto = "azul grisáceo";
            break;
        case "orange":
            texto = "naranja";
            break;
        case "black":
            texto = "negro";
            break;
        case "hazel":
            texto = "avellana";
            break;
        default:
            break;
    }
    return texto;
}

function convertir(alturaOPeso, medida){
    return (alturaOPeso === "unknown") ? "desconocido" : alturaOPeso + medida; 
}