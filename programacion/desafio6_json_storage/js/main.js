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