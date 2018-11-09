/*
var nombre = "Alejandra";
var apellido = "Castro";
var nroDocumento = "36546987";
var tipoDocumento = "DNI";
var telefono = "1161845874";
var email = "ale@gmail.com";

var productos = ["Tj: Visa", "Tj Master", "Caja de Ahorro", "Caja Corriente"];

function mostraClienteYsusProductos() {
    document.getElementById("lblNombre").innerText = nombre;
    document.getElementById("lblApellido").innerText = apellido;
    document.getElementById("lblTipDoc").innerText = tipoDocumento;
    document.getElementById("lblNroDocumento").innerText = nroDocumento;
    document.getElementById("lblTelefono").innerText = telefono;
    document.getElementById("lblEmail").innerText = email;
}*/


function crearCliente (_nombre, _apellido, _tipoDoc, _nroDoc, _telefono, _email){
    function mostrarNombreCompleto() {
        return this.nombre + " " + this.apellido;
    }

    return {
        nombre: _nombre,
        apellido: _apellido,
        tipoDoc: _tipoDoc,
        nroDoc: _nroDoc,
        telefono: _telefono,
        email: _email,
        MostrarNombreCompleto: mostrarNombreCompleto
    }
}

function crearProductos (_codigo, _nombre, _estado){
    return {
        codigo: _codigo,
        nombre: _nombre,
        estado: _estado
    }
}

function mostraClienteYsusProductos (){
    var cliente01 = crearCliente ("Andres", "Cruz", "DNI", "34123350", "4488-3015", "andrescruz_pr@hotmail.com");
    document.getElementById("lblNombre").innerText = cliente01.nombre;
    document.getElementById("lblApellido").innerText = cliente01.apellido;
    document.getElementById("lblTipDoc").innerText = cliente01.tipoDoc;
    document.getElementById("lblNroDocumento").innerText = cliente01.nroDoc;
    document.getElementById("lblTelefono").innerText = cliente01.telefono;
    document.getElementById("lblEmail").innerText = cliente01.email;

    var productos01 = crearProductos ("01", "Tarjeta Visa", "Activo");
    document.getElementById("tblProductos").innerText = productos01.codigo + "/" + productos01.nombre + "/" + productos01.estado;
    console.log(productos01);
}

function crearHeader (){
    var header = document.createElement("header");
    var buttonAnt = document.createElement("button");
    var total = document.createElement("div");
    var promedio = document.createElement("div");
    var buttonSig = document.createElement("button");
    buttonAnt.innerText = "Ver Anterior";
    total.innerText = "Total Cliente";
    promedio.innerText = "Promedio de Productos";
    buttonSig.innerText = "Ver Siguiente";
    document.body.insertBefore(header, document.body.childNodes[0]);
    header.appendChild(buttonAnt);
    header.appendChild(total);
    header.appendChild(promedio);
    header.appendChild(buttonSig);
}

crearHeader();