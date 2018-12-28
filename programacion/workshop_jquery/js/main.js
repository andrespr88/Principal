document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        cargaInicial();
        //obtengo los elementos html y les agrego los eventos; deshabilito los botones de agregar y eliminar
        var nombre = document.getElementById("inputNombre");
        var email = document.getElementById("inputEmail");
        var dni = document.getElementById("inputDni");
        var botonAgregarAlumno = document.getElementById("agregarAlumno");
        var inputEliminarDni = document.getElementById("inputEliminarDni");
        var botonEliminarAlumno = document.getElementById("eliminarAlumno");
        botonAgregarAlumno.disabled = true;
        botonEliminarAlumno.disabled = true;
        nombre.addEventListener("keyup", validarNombre);
        email.addEventListener("keyup", validarEmail);
        dni.addEventListener("keyup", validarDni);
        botonAgregarAlumno.addEventListener("click", agregarAlumno);
        inputEliminarDni.addEventListener("keyup", validarEliminar);
        botonEliminarAlumno.addEventListener("click", eliminarAlumno);
        var botonBuscarAlumno = document.getElementById("buscarAlumno");
        botonBuscarAlumno.addEventListener("click", buscarAlumnoNombre);        
    }
}

// Carga inicial de los alumnos del local Storage en el html
function cargaInicial() {
    //obtengo el vector de alumnos del localStorage
    var listaAlumnos = getLocalList("alumnosLocal");
    var listaPrincipal = document.getElementById("accordion");
    var alumno;
    //borro la lista para que, cuando se vuelva a llamar, sobreescriba todos los alumnos
    listaPrincipal.innerHTML = "";
    //agregro cada alumno del vector al html
    for (var i = 0; i < listaAlumnos.length; i++) {
        alumno = crearNodo(listaAlumnos[i]);
        listaPrincipal.innerHTML += (alumno);
    }
    $( "#accordion" ).accordion();
    $( "#accordion" ).accordion("refresh");
}

//recibe como parametro un objeto alumno y crea el nodo en el html con los datos del alumno
function crearNodo(nuevoAlumno) {
    var nodo ='<h3 id="'+ nuevoAlumno.dni +'">'+nuevoAlumno.nombre + ' ' + nuevoAlumno.apellido + '</h3>' +
    '<div>'+
        '<p>Dni: ' + nuevoAlumno.dni +'</p><p>E-mail: ' +
        nuevoAlumno.email +'</p>' +
        '<input type="button" class="btn btn-block btn-warning" value="Modificar Notas" onclick = "agregarNotas('+JSON.stringify(nuevoAlumno).replace(/"/g,"'")+')">'+
    '</div>';
    return nodo;
}

// recibe un objeto input y una condicion a evaluar, y le agrega o quita la clase para validar o invalidar el input
function agregarClase(obj, condicion) {
    if (condicion) {
        //le saco la clase "is-invalid", en caso que no la tenga, no rompe ni hace nada        
        obj.classList.remove("is-invalid");
        obj.classList.add("is-valid");
    } else {
        obj.classList.remove("is-valid");
        obj.classList.add("is-invalid");
    }
}


function validarNombre() {
    //si el nombre es un string vacio, lo toma como falso
    agregarClase(this, this.value.trim());
    validarBotonAgregar();
}

function validarEmail() {
    //verifica que tenga: string + "@" + string + "." + string de min 2 y max 4 caracteres 
    var test = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/.test(this.value);
    agregarClase(this, test);
    (test) ? document.getElementById("emailHelp").innerText = "" : document.getElementById("emailHelp").innerText = "Ejemplo: usuario@ejemplo.com";
    validarBotonAgregar();
}

function validarDni () {
    var test = false;
    var dni = this.value.trim();
    //verifico que dni sea un numero, que sea positivo y que no exista otro alumno con ese dni 
    if (parseInt(dni) > 0 && buscarAlumnoDni(dni) == -1 && dni.length == 8){
        test = true;
        document.getElementById("dniHelp").innerText = "";                
    } else document.getElementById("dniHelp").innerText = "Debe contener 8 caracteres y no debe coincidir con ningun dni de la lista"
    agregarClase (this, test);
    validarBotonAgregar();
}

//busca si existe un alumno con ese dni en el localStorage, si lo encuentra retorna la posicion, si no, retorna -1
function buscarAlumnoDni (dni) {
    var vectorAlumnos = getLocalList("alumnosLocal");
    for (i=0; i < vectorAlumnos.length; i++ ){
        if (vectorAlumnos[i].dni == dni) {
            return i;
        } 
    }  
    return -1;  
}
//comprueba que en el formulario haya 3 inputs con la clase "is-valid", ya que tanto el campo nombre, dni y email tienen que ser validos, solo entonces habilita el boton
function validarBotonAgregar () {    
    var formularioAgregar = document.getElementById("formularioAgregar");
    var inputs = formularioAgregar.getElementsByClassName("is-valid");
    var botonAgregarAlumno = document.getElementById("agregarAlumno");
    var botonModificarAlumno = document.getElementById("modificarAlumno"); 
    if (inputs.length === 3){        
        botonAgregarAlumno.disabled = false;
        botonModificarAlumno.disabled = false;
    } else {
        botonAgregarAlumno.disabled = true;
        botonModificarAlumno.disabled = true;
    }
}

//borra los campos de ayuda, los value y las clases de los inputs
function resetearFormulario(formulario) {
    formulario.reset();
    document.getElementById("dniHelp").innerText = "";
    document.getElementById("emailHelp").innerText = "";
    //obtengo todos los inputs con clase "is-valid" y les remuevo dicha clase 
    var inputs = formulario.getElementsByClassName("is-valid");
    while (0 < inputs.length) {
        inputs[0].classList.remove("is-valid");        
    }
}

function agregarAlumno () {
    //obtengo los datos de los inputs sin los espacios del principio y del final
    var nombre = document.getElementById("inputNombre").value.trim();
    var apellido = document.getElementById("inputApellido").value.trim();
    var email = document.getElementById("inputEmail").value.trim();
    var dni = document.getElementById("inputDni").value.trim();
    var vectorAlumnos = getLocalList("alumnosLocal");
    var alumno = new crearAlumno(nombre, apellido, dni, email);
    //agrego el alumno al vector
    vectorAlumnos.push(alumno);
    setLocalList("alumnosLocal", vectorAlumnos);
    crearNodo(alumno);
    var formulario = document.getElementById("formularioAgregar");
    resetearFormulario(formulario);
    //desactivo el boton
    this.disabled = true;
    cargaInicial();

}

function crearAlumno (nombre, apellido, dni, email, notas){
    return {
        nombre: nombre,
        apellido: apellido,
        dni: dni,
        email: email,
        //si recibe un vector de notas, lo setea en la propiedad, si no recibe nada, crea un vector vacio
        notas: notas || []
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

//funcion que muestra las notas del alumno en el html
function agregarNotas(alumno){
    var liNotas = document.getElementById("dialog");
    liNotas.innerHTML = "";
    var vectorNotas = alumno.notas;
    for (var i = 0; i < vectorNotas.length; i++) {             
        liNotas.innerHTML += '<p"><input type="number" class="form-control form-control-sm" onkeyup="validarNota()" value="'+vectorNotas[i]+'"></p>';
    } 
    //muestro el input para agregar una nota nueva y el boton para actualizarlas
    liNotas.innerHTML +=
    '<p><input class="form-control form-control" type="number" id="inputNota" onkeyup="validarNota()" placeholder="Nueva nota"></p>'+
    '<p class="col"><input type="button" class="btn btn-block btn-success" value="Actualizar" onclick="actualizarNotas('+JSON.stringify(alumno).replace(/"/g,"'")+')"><p>'; 
    $( "#dialog" ).dialog();
}

//cuando la nota este entre 0 y 10 agrega la clase "is-valid", si no, la clase "is-invalid"
function validarNota() {
    var nota = parseFloat(event.target.value.trim());
    var test = (nota >= 0 && nota <=10);
    agregarClase(event.target, test);
}

function actualizarNotas(alumno){
    //obtengo todos los input con type number que esten dentro la lista #listaNotas
    var inputs = document.querySelectorAll("#dialog input[type=number]");
    var notas = [];
    for (i=0; i < inputs.length; i++){
        var numero = parseFloat(inputs[i].value.trim()).toFixed(2);
        //agrego la nota solo cuando es mayor a 0 y menor a 10
        //si el input esta vacio, el parseFloat me daria un NaN, pero NaN >= 0 es falso y tmp entraria
        if (numero >= 0 && numero <= 10)
            notas.push(numero);
    }    
    //obtengo el vector de alumnos del localStorage
    var vectorAlumnos = getLocalList("alumnosLocal");
    //busco la posicion del alumno
    var posicion = buscarAlumnoDni(alumno.dni);
    //le seteo el nuevo vector de notas al alumno
    vectorAlumnos[posicion].notas = notas;
    //guardo el vector en el localStorage
    setLocalList("alumnosLocal", vectorAlumnos);
    //vuelvo a mostrar la lista de alumnos (para que actualice el json del evento onclick = actualizarNotas vinculado al boton de la ficha del alumno)    
    cargaInicial();
    //vuelvo a mostrar el alumno con las notas actualizadas    
    agregarNotas(vectorAlumnos[posicion]);

}

//borra todo el contenido de #listaNotas
function cerrar () {
    var listaNotas = document.getElementById("listaNotas");
    listaNotas.innerHTML = "";
}

//funcion que comprueba y valida que exista un alumno que coincida con el dni ingresado en el input; si existe, agrega la clase "is-valid" al input y habilita el boton, si no, agrega la clase "is-invalid" y deshabilita el boton
function validarEliminar () {
    var botonEliminarAlumno = document.getElementById("eliminarAlumno");
    var test = false;
    var dni = this.value;
    if (buscarAlumnoDni(dni) != -1){
        test = true;
        botonEliminarAlumno.disabled = false;
    } else botonEliminarAlumno.disabled = true;              
    agregarClase (this, test);
}

//obtiene el dni ingresado en el input, busca la posicion del alumno en el vector y lo elimina. Agrega el nuevo vector al localStorage y vuelve a mostrar la lista de alumnos en el html 
function eliminarAlumno () {    
    var dni = document.getElementById("inputEliminarDni").value;
    var posicion = buscarAlumnoDni(dni);
    var vectorAlumnos = getLocalList("alumnosLocal");
    if (posicion != -1){
        vectorAlumnos.splice(posicion,1);
        setLocalList("alumnosLocal",vectorAlumnos);
        cargaInicial();
    }
}

function buscarAlumnoNombre () {    
    //objeto html donde voy a infomar al usuario si no se encontró el alumno
    var nombreAyuda = document.getElementById("nombreHelp");
    //si existe un elemento con clase active en la lista, se la remuevo, ya que si se busca un alumno y luego se busca otro sin haber modificado el primero, quedarian ambos items con la clase active; y necesito que haya solo 1 por vez
    var vector = document.getElementsByClassName("active");
    if (vector.length) 
        vector[0].classList.remove("active");
    //obtengo el nombre del input, lo paso a minuscula y le quito los espacios del principio y del final
    var inputBuscar = document.getElementById("inputBuscarNombre");
    var nombre = inputBuscar.value.toLowerCase().trim();
    //verifico que haya ingresado como minimo 3 caracteres
    if (nombre.length >= 3){
        //obtengo el vector de alumnos del localStorage
        var vectorAlumnos = getLocalList("alumnosLocal");
        var nombreVector
        var apellidoVector
        for (var i = 0; i < vectorAlumnos.length; i++) {
            nombreVector = vectorAlumnos[i].nombre.toLowerCase();
            apellidoVector = vectorAlumnos[i].apellido.toLowerCase();
            //comparo el nombre del input con el nombre y el apellido de cada alumno
            if (nombreVector.indexOf(nombre) !== -1 || apellidoVector.indexOf(nombre) !== -1){
                //si hay coincidencia, muestro los datos en los inputs
                var inputDni = document.getElementById("inputDni");
                inputDni.value = vectorAlumnos[i].dni;
                document.getElementById("inputNombre").value = vectorAlumnos[i].nombre;
                document.getElementById("inputApellido").value = vectorAlumnos[i].apellido;
                document.getElementById("inputEmail").value = vectorAlumnos[i].email;
                //oculto el boton agregar
                var botonAgregarAlumno = document.getElementById("agregarAlumno");
                botonAgregarAlumno.classList.add("d-none");
                //muestro el boton modificar
                var botonModificarAlumno = document.getElementById("modificarAlumno");
                botonModificarAlumno.classList.remove("d-none");
                //agrego el evento al boton modificar
                botonModificarAlumno.addEventListener("click", modificarAlumno);
                //le agrego la clase "is-valid" a los inputs, para que se habilite el boton sin la necesidad de andar entrando a cada input y presionando alguna tecla (las validaciones estan asociadas al evento keyup)
                agregarClase(document.getElementById("inputNombre"),true);
                agregarClase(document.getElementById("inputDni"),true);
                agregarClase(document.getElementById("inputEmail"),true);
                inputDni.removeEventListener("keyup", validarDni);
                inputDni.addEventListener("keyup", validarModificarDni);
                //pinto la ficha del alumno buscado
                var lista = document.getElementById("accordion").getElementsByTagName("h3");
                lista[i].classList.add("active");
                $( "#accordion" ).accordion( "option", "active", i );
                //reseteo el campo que indica que no se encontró el alumno
                nombreAyuda.innerText = "";
                inputBuscar.value = "";                
                return 
            }         
        }
        nombreAyuda.innerText = "No se encontró el alumno";
    } else {
        nombreAyuda.innerText = "Debe ingresar 3 caracteres como mínimo";
    }
}

//tengo que cambiar la validacion del dni, ya que ahora puede haber una coincidencia entre el dni ingresado y el dni de un alumno del vector, siempre y cuando estemos hablando del mismo alumno 
function validarModificarDni () { 
    // obtengo el dni desde el id del elemento de la lista con clase "active"
    var dni = document.querySelectorAll("#accordion h3.active")[0].id;
    //busco la posicion del alumno en el vector del localStorage
    var posicion = buscarAlumnoDni(dni);
    var inputDni = document.getElementById("inputDni");
    //busco si existe algun alumno con el dni obtenido del inputDni
    var posicion2 = buscarAlumnoDni(inputDni.value.trim());
    //si (el inputDni no esta vacio && (no coincide con los otros dni || coincide con el mismo alumno que estoy modificando)) le agrego la clase "is-valid", si no, agrego la clase "is-invalid"
    var condicion = inputDni.value.trim() && (posicion2 == -1 || posicion == posicion2);
    agregarClase(inputDni,condicion);
    validarBotonAgregar();
}

function modificarAlumno () {
    /* no sabia como pasar la posicion del alumno encontrado por la funcion buscarAlumnoNombre sin usar una variable global; y se me ocurrio obtener el dni desde el id del elemento de la lista con clase "active"*/
    var dni = document.querySelectorAll("#accordion h3.active")[0].id;
    //busco la posicion del alumno en el vector del localStorage
    var posicion = buscarAlumnoDni(dni);
    //obtengo los datos de los inputs
    var nombre = document.getElementById("inputNombre").value.trim();
    var apellido = document.getElementById("inputApellido").value.trim();
    var inputDni = document.getElementById("inputDni");
    var email = document.getElementById("inputEmail").value.trim();
    //obtengo el vector de alumnos del localStorage
    var vectorAlumnos = getLocalList("alumnosLocal");
    //obtengo las notas del alumno encontrado
    var notas = vectorAlumnos[posicion].notas;
    //agrego el alumno modificado al vector de alumnos
    vectorAlumnos[posicion] = new crearAlumno(nombre, apellido, inputDni.value.trim(), email, notas);
    //agrego el vector al localStorage
    setLocalList("alumnosLocal", vectorAlumnos);
    //muestro el boton agregar
    var botonAgregarAlumno = document.getElementById("agregarAlumno");
    botonAgregarAlumno.classList.remove("d-none");
    //oculto el boton modificar
    var botonModificarAlumno = document.getElementById("modificarAlumno");
    botonModificarAlumno.classList.add("d-none");
    //reseteo los value y las clases del formulario
    var formulario = document.getElementById("formularioAgregar");
    resetearFormulario(formulario);     
    //agrego y remuevo los eventos para que cambie la forma de validar el input 
    inputDni.removeEventListener("keyup", validarModificarDni);
    inputDni.addEventListener("keyup", validarDni);        
    //vuelvo a cargar los alumnos en pantalla
    cargaInicial();
}