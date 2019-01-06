function mostrarLocal(){
    var personajes = getLocalList("listaPersonajes");
    imprimirPersonajes(personajes);
}

function imprimirPersonajes(vector) {
    //oculta el personaje en el html
    for (let i = 0; i < vector.length; i++) {
      //obtengo la posicion a partir de la url
      var personaje = '<tr><th scope="row">' + (i+1) + '</th><td>' + vector[i].name + '</td><td>' + traducirGenero(vector[i].gender) + '</td><td>' + convertir(vector[i].height,"cm") + '</td><td>' + convertir(vector[i].mass,"kg") + '</td><td>' + traducirColorOjos(vector[i].eye_color) + '</td><td class=""><button type="button" class="btn btn-danger btn-block btn-sm p-0" data-url="' + encodeURIComponent(vector[i].url) + '" id="boton' + i + '">Eliminar</button></td></tr>';
      // agrego el personaje a la tabla en el html
      $("#tableBody").append(personaje);
      // asocio el evento al boton
      $("#boton" + i).click(eliminarPersonaje);
    }
}

function eliminarPersonaje(){
    var boton = $(event.target);
    //el boton es hijo de un td que a su vez es hijo del tr que quiero ocultar
    boton.parent().parent().fadeOut();
    var personajes = getLocalList("listaPersonajes");
    personajes.splice(boton.id,1);
    setLocalList("listaPersonajes",personajes);

}