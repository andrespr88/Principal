document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        var nombre = document.getElementById("inputNombre");
        var email = document.getElementById("inputEmail");
        nombre.addEventListener("blur", validarNombreEmail);
        email.addEventListener("blur", validarNombreEmail);
    }
}


function agregarClase(obj) {
    var test = obj.value;
    if (obj.id == "inputEmail") {
        //verifica que tenga: string + "@" + string + "." + string de min 2 y max 4 caracteres 
        test = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/.test(obj.value);
    }
    if (test) {
        //le saco la clase "is-invalid", en caso que no la tenga, no rompe ni hace nada        
        obj.classList.remove("is-invalid");
        obj.classList.add("is-valid");
    } else {
        obj.classList.remove("is-valid");
        obj.classList.add("is-invalid");
    }
}

function validarNombreEmail() {
    agregarClase(this);
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
        if (localStorage.getItem(key) !== null) {
            var resultado = JSON.parse(localStorage.getItem(key));
            return resultado;
        } else return [];
    }
}

function main() {
    var testList = ['CARLOS', 'GERONIMO', 'NICOLAS', 'LUCAS'];
    //agrego el la key y el array a localStorage
    setLocalList("studentsList", testList);
    //obtengo el array a traves de la key y lo almaceno en la variable studenstList
    var studentsList = getLocalList('studentsList');
    //muestro el array
    console.log(studentsList);
    //pruebo que devuelva un array vacio con una key incorrecta
    var vacio = getLocalList("a");
    console.log(vacio);
}

/*Crear una función que reciba como parámetro un objeto alumno y devuelva como resultado un nodo <li> con los datos del alumno.
var studentNode = createStudentNode(newStudent)
*/

function createStudentNode(newStudent) {
    //creo el nodo <li> y se lo asigno a nodoLi 
    var nodoLi = document.createElement("li");
    //asigno la clase a nodoLi
    nodoLi.className = "list-group-item";
    //verifico que el parametro sea un objeto
    if (typeof newStudent === "object") {
      //verifico que el objeto tenga la propiedad dni, si no la tiene, da undefined y no entra al if
      if (newStudent.dni) {
        //asigno el id (dni del estudiante) a nodoLi 
        nodoLi.id = newStudent.dni;
        if (newStudent.nombreCompleto() && newStudent.email) {
          nodoLi.innerHTML = '<h1>' + newStudent.nombreCompleto() + '</h1><h3>DNI: ' + newStudent.dni + '</h3><p>E-mail: ' + newStudent.email + '</p>';
        }
      }
    }
    //si el parametro no es un objeto alumno, devuelvo un nodo <li> con clase "list-group-item", pero vacio
    return nodoLi;
  }
  
  var student
  //asigno el nodo <li> con los datos del alumno a la variable studentNode
  var studentNode = createStudentNode(student);
  
  //recibe el nodo y lo agrega al html dentro del elemento con id: "lista"
  function agregarNodo(nodo) {
    //verifico que nodo tenga la clase "list-group-item", en caso contrario no lo agrego a #lista
    if (nodo !== undefined && nodo.className === "list-group-item")
      document.getElementById("listaPrincipal").appendChild(nodo);
    else console.log("El parametro pasado es un nodo sin la clase 'list-group-item' o simplemente no es un nodo");
  }
  
  //recibe el nodo que sera eliminado del elemento con id: "lista" del html
  function eliminarNodo(nodo) {
    //verifico que dentro de #lista existe algun elemento con la clase "list-group-item", si lenght da 0 quiere decir que no (0 equivale a false) 
    if (document.getElementById("listaPrincipal").getElementsByClassName("list-group-item").length)
      document.getElementById("listaPrincipal").removeChild(nodo);
    else console.log("La lista esta vacia");
  }