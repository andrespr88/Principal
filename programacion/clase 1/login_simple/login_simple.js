function simularSubmit(){
    var user_form = document.getElementById("user").value; 
    var pass_form = document.getElementById("password").value; 
    console.log('Usuario ingresado: '+user_form);
    console.log('Password ingresado: '+pass_form);
    // Consigna
    // Generar dos variables con el user y password que serán los correctos
    var user = 'andres';
    var password = "123456";    
  
    // Verificar si el user Y el password ingresados son iguales a los de nuestra variable
    // Solo si ambos son iguales mostrar en un alert "login completed"
    if(user_form === user && pass_form === password){
      alert("Login completed");
    } else if(user_form === user || pass_form === password) {
        if(user_form === user){
          alert("password incorrecto");
        } else {
          alert("usuario incorrecto");
        }
    } else {
      alert("El usuario no existe");
    }
  
    // Si el usuario o el password son incorrectos (uno debe ser al menos correcto)
    // Mostrar un alert "usuario/ password incorrectos"
  
  
    // Si ninguno de los dos son iguales 
    // Mostrar un alert donde diga "el usuario no existe"
  }