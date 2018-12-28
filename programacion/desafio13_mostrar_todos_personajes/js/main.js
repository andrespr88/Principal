$(document).ready(function (){
    //asocio el evento al boton motrar
    $("#mostrar").on("click", mostrarTodos);
    
    cargarPersonajes ("https://swapi.co/api/people/",1);
    
    function cargarPersonajes(url,contador){

        var res = new XMLHttpRequest();
        res.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                //obtengo el objeto parseando el JSON
                var res = JSON.parse(this.response)
                //obtengo el vector de los personajes
                var vector = res.results;
                //recorro el vector y voy mostrando cada uno de los personajes en la tabla del html
                imprimirPersonajes(vector,contador);
                //obtengo la url de la siguiente pag de personajes
                var pagina = res.next;
                // si la pagina existe vuelvo a llamar a la funcion
                if (pagina){
                    //uso el contador para mostrar el numero de personajes
                    contador += 10
                    cargarPersonajes(pagina,contador);    
                }
            }
        }
        
        res.open("GET", url, true);
        res.send();
    }


    //----------------------------------------------------------------------------------------------------
    // Hace lo mismo que lo de arriba, pero lo primero es solo con javascript y esto con jquery
    //----------------------------------------------------------------------------------------------------

    // var req = $.ajax({
    //     method: "GET",
    //     url: "https://swapi.co/api/people/",
    //     async: true,
    // });
    
    // req.done(function(data){
    //     //obtengo el vector de los personajes proporcionados en la url
    //     var vector = data.results;
    //     //recorro el vector y voy mostrando cada uno de los personajes en la tabla del html
    //     imprimirPersonajes(vector);
    // });
    
        
    // req.fail(function (error) {
    //     console.log(error);
    // });

});

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
        var personaje = '<tr class="table-secondary"><th scope="row">' + (contador + i) + '</th><td>' + vector[i].name + '</td><td>' + vector[i].gender + '</td><td>' + vector[i].height + 'cm</td><td>' + vector[i].mass + 'kg</td><td>' + vector[i].eye_color + '</td><td class=""><button type="button" class="btn btn-danger btn-block btn-sm p-0" onclick="eliminarPersonaje()">Eliminar</button></td></tr>';
        $("#personajes").html($("#personajes").html() + personaje);
    }                
}