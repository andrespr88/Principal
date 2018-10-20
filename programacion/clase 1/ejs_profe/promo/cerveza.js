function simularSubmit(){
  // variable que obtiene lo ingresado en el input de apellido  
  var apellido_form = document.getElementById("apellido").value; 
  // variable que obtiene lo ingresado en el input de nombre 
  var nombre_form = document.getElementById("nombre").value; 
  // variable que obtiene lo ingresado en el input de edad 
  var edad_form = document.getElementById("edad").value; 
  console.log(apellido_form);
  console.log(nombre_form);
  console.log(edad_form);

  // chequear si el usuario es mayor 0 igual a 18 años
  // si es mayor de 18 años mostrar un alert con el mensaje "nombre apellido puedes participar de la promo"
  if(parseInt(edad_form) >= 18){
    alert(nombre_form + " " + apellido_form + " sos mayor de edad, puedes participar")
  } else{
    alert(nombre_form + " " + apellido_form + " No puedes participar de la promo")
  }
  // si es menor a 18 años mostrar un mensaje alert "nombre apellido usted no puede participar de la promo"
 

}