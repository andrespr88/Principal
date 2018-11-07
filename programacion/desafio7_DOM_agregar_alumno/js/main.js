//Datos de prueba:

var student = {
  firstName: 'Juan',
  lastName: 'Peréz',
  dni: "22999333",
  email: 'juan@gmail.com',
  nombreCompleto: function () {
    return this.firstName + " " + this.lastName;
  }
}

/*Crear una función que reciba como parámetro un objeto alumno y devuelva como resultado un nodo <li> con los datos del alumno.
var studentNode = createStudentNode(newStudent)

Resultado ejemplo:

<li class="list-group-item" id="22999333">
  <h1>
    Juan Peréz
  </h1>
  <h3>
    DNI: 22999333
  </h3><p>
    E-mail: juan@gmail.com
  </p>
</li>

Documentación:

List group Bootstrap // https://getbootstrap.com/docs/4.1/components/list-group/
CreateElement // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
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

//asigno el nodo <li> con los datos del alumno a la variable studentNode
var studentNode = createStudentNode(student);

//recibe el nodo y lo agrega al html dentro del elemento con id: "lista"
function agregarNodo(nodo) {
  //verifico que nodo tenga la clase "list-group-item", en caso contrario no lo agrego a #lista
  if (nodo !== undefined && nodo.className === "list-group-item")
    document.getElementById("lista").appendChild(nodo);
  else console.log("El parametro pasado es un nodo sin la clase 'list-group-item' o simplemente no es un nodo");
}

//recibe el nodo que sera eliminado del elemento con id: "lista" del html
function eliminarNodo(nodo) {
  //verifico que dentro de #lista existe algun elemento con la clase "list-group-item", si lenght da 0 quiere decir que no (0 equivale a false) 
  if (document.getElementById("lista").getElementsByClassName("list-group-item").length)
    document.getElementById("lista").removeChild(nodo);
  else console.log("La lista esta vacia");
}