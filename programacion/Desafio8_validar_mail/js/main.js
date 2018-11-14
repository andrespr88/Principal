/*Crear una función que valide que un campo contenga un email valido cuando el usuario pierde el foco
La función tiene que validar el campo en el cual se dispara el evento y verificar que el valor del mismo sea un email valido (exista, tenga arroba y punto). En caso de que haya un error tiene que agregar una clase para mostrar el input en rojo, en caso contrario una clase para que se muestre en verde.

Video ejemplo // https://www.useloom.com/share/659ec51a08274bcfa33e04d72fb5113a

Si usamos Boostrap podemos mostrar que el campo es valido agregando la clase is-valid y mostrar que es invalido agregando la clase is-invalid.

Documentación:

Evento onblur
Add class
Remove class
Boostrap forms*/

document.onreadystatechange = function(){
    if (document.readyState == "complete"){
      var email = document.getElementById("inputEmail");
      email.addEventListener("blur",validarEmail);      
    }      
  }

  function validarEmail(){
    //verifica que tenga: string + "@" + string + "." + string(min 2 y max 4 caracteres) 
    var test = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/.test(this.value);
    if (test){
      //le saco la clase "is-invalid"; si no la tiene, no rompe ni hace nada        
      this.classList.remove("is-invalid");
      this.classList.add("is-valid");
      document.getElementById("emailHelp").innerText = "El Mail es válido";
    } else {
      this.classList.remove("is-valid");
      this.classList.add("is-invalid");
      document.getElementById("emailHelp").innerText = "El Mail es inválido";
    } 
  }