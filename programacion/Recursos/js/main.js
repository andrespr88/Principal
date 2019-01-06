function GetRequest(url,procesar) {

    $.ajax({
        type: "GET",
        dataType: "json",
        //timeout: 10000 ,
        contentType: "application/json",
        async: true,
        url: url,

        success: procesar,
        error: function (a, b, c) {
            debugger;
            // alert("Error..")
        }
    }); 
}

/*La función tiene que recibir como parámetro una key y buscar en el localStorage por esa key devolviendo 
un objeto de JavaScript, si no existe el elemento debe devolver un Array vacío. La función tiene que
validar los parámetros que recibe, en caso de que alguno sea incorrecto no debe romper ni borrar nada.*/

function getLocalList(key) {
    if (typeof key === "string") {
        //recupero la lista del local storage
        var localList = localStorage.getItem(key);
        //verifico que sea distinto de null o undefined
        if (localList) {
            //si existe, la transformo en Javascript y la devuelvo
            var resultado = JSON.parse(localList);
            return resultado;
        } else return [];
    }
}

/*La función tiene que recibir como parámetros una key y un Array y convertir el Array en JSON para 
guardarlo en el localStorge. La función tiene que validar los parámetros que recibe, en caso de que 
alguno sea incorrecto no debe romper ni guardar nada*/

function setLocalList(key, testList) {
    if (typeof key === "string" && Array.isArray(testList)) {
        //convertimos en JSON el array
        testList = JSON.stringify(testList);
        //creo el localStorage
        localStorage.setItem(key, testList);
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
        case "none":
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
    return (alturaOPeso === "unknown") ? "desconocido" : alturaOPeso + " " + medida; 
}

function buscarPersonajeLocal(url){
    var condicion = false
    var personajes = getLocalList("listaPersonajes");
    personajes.forEach(personaje => {
        if (personaje.url === url){
            condicion = true;
        }
    });
    return condicion;
}