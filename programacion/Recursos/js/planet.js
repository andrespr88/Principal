function ObtenerTodos() {
    GetRequest("https://swapi.co/api/planets/", ProcesarPlanetas);
}

function ProcesarPlanetas(datos) {
    //obtengo el vector de planetas
    var vector = datos.results;
    imprimirPlanetas(vector);
    var url = datos.next;
    if (url){
        $("#seeMore").one("click",function(){
            GetRequest(url, ProcesarPlanetas);
        });
    } else $("#seeMore").remove();
}

function imprimirPlanetas(vector){
    vector.forEach(planeta => {
        var nodoPlaneta = '<tr><th scope="row">#</th><td>' + planeta.name + '</td><td>' + planeta.climate + '</td><td>' + planeta.diameter + ' km</td><td>' + planeta.rotation_period + ' hs</td><td>' + planeta.orbital_period + ' días</td></tr>';
        $("#tableBody").append(nodoPlaneta);                
    });
}