function getCategorias(){
    /*
    var xmlHt = new XMLHttpRequest();
    xmlHt.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            var respuesta = this.response;
        }
    };

    xmlHt.open("get", "http://www.etnassoft.com/api/v1/get/?get_categories=all",true);
    xmlHt.send(); 
    
    */

    //$.getJSON('http://www.etnassoft.com/api/v1/get/?get_categories=all&callback=?',resultado);


}

// function resultado(res){
//     var categorias = "";
//     res.forEach(function (item, k) {
//         categorias += "<li data-id='" + item.category_id + "' data-name='" + item.name +
//            "' data-nicename='" + item.nicename +
//            "' onclick='ObtenerLibrosPorCategoria(\"" + item.name + "\")'>" + item.name + 
//            '<ol id="'+item.name+'"></ol>'+
//            "</li>"
//         $("#Categorias").html(categorias);
//         //$("#Categorias").selectable();

        
        
//     })
// }

getCategorias();

function ObtenerLibrosPorCategoria(){
    
    var categoria = $("#buscador").val();
    $.ajax({
        type: "GET",
        dataType: "Jsonp",
        async: false,
        mivar: categoria,
        url: "http://www.etnassoft.com/api/v1/get/?category="+categoria,
        success: resultadoLibros,
        error: function (a,b,c){
            //alert("Error...")
        }
    })
}

// function ResultadoLibros(res){
//     //mostrar libros
//     var libros='';
//     res.forEach(function(item,k){
//         libros += '<li>'+item.title+'</li>';
//     })
//     $("#"+this.mivar).html(libros);
// }

// $("#categoriasBoton").on("click",ObtenerLibrosPorCategoria);
// $("#idBoton").on("click",ObtenerLibrosPorId);
// $("#autorBoton").on("click",ObtenerLibrosPorAutor);

$("#categoriasBoton").on("click",buscarCategoria);
$("#idBoton").on("click",buscarId);
$("#autorBoton").on("click",buscarAutor);

function buscarCategoria(){
    $("#buscar").off("click",ObtenerLibrosPorAutor);
    $("#buscar").off("click",ObtenerLibrosPorId);
    $("#buscar").on("click",ObtenerLibrosPorCategoria);
}

function buscarId(){
    $("#buscar").off("click",ObtenerLibrosPorCategoria);
    $("#buscar").off("click",ObtenerLibrosPorAutor);
    $("#buscar").on("click",ObtenerLibrosPorId);
}

function buscarAutor(){
    $("#buscar").off("click",ObtenerLibrosPorCategoria);
    $("#buscar").off("click",ObtenerLibrosPorId);
    $("#buscar").on("click",ObtenerLibrosPorAutor);
}

function resultadoLibros(res){
    var libros='';
    res.forEach(function(item,k){
        libros += '<li>'+item.title+'</li>';
    })
    $("#lista").html(libros);
}

function ObtenerLibrosPorId(){
    var id = $("#buscador").val();
    $.ajax({
        type: "GET",
        dataType: "Jsonp",
        async: false,
        url: "http://www.etnassoft.com/api/v1/get/?id="+id,
        success: resultadoLibros,
        error: function (a,b,c){
            //alert("Error...")
        }
    })
}


function ObtenerLibrosPorAutor(){

    var autor = $("#buscador").val();
    $.ajax({
        type: "GET",
        dataType: "Jsonp",
        async: false,
        url: "http://www.etnassoft.com/api/v1/get/?book_author="+autor,
        success: resultadoLibros,
        error: function (a,b,c){
            //alert("Error...")
        }
    })
}
