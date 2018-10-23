var studentsList = [
  {
    firstName: 'Juan',
    lastName: 'Pérez',
    dni: 45678987
  },
  {
    firstName: 'Ana',
    lastName: 'Fernandez',
    dni: 45678989
  },
  {
    firstName: 'Pedro',
    lastName: 'Mármol',
    dni: 45678956
  },
  {
    firstName: 'Pablo',
    lastName: 'Picapiedras',
    dni: 45678983
  }
]

function buscarAlumno(busqueda, lista) {
  for (var i = 0; i < lista.length; i++) {
    if (busqueda === lista[i].firstName || busqueda === lista[i].lastName) {
// pongo el return aca tambien, para que si encuentra al alumno, salga de la funcion y no siga recorriendo el array           
      return i;
    }
  }
  return -1;
}

function imprimirBusqueda() {
  var nombre = document.getElementById('name').value;
  var mostrar = buscarAlumno(nombre, studentsList);
  if (mostrar === -1) {
    document.getElementById('mostrar_busqueda').innerText = "No se encontró el alumno";
  } else {
    document.getElementById('mostrar_busqueda').innerText = "Se encontró al alumno en la posición: " + mostrar;
  }
}