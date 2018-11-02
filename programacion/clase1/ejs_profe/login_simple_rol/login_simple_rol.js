function simularSubmit(){
    var user_form = document.getElementById("user").value; 
    var pass_form = document.getElementById("password").value; 
    var rol_form = document.getElementById("rol").value; 
    console.log('Usuario ingresado: '+user_form);
    console.log('Password ingresado: '+pass_form);
    console.log('Rol ingresado: '+rol_form);
    // Consigna
    // Generar dos variables con el user y password que serán los correctos
    
    var user = 'andres';
    var password = "123456"; 
  
    // Verificar si el user Y el password ingresados son iguales a los de nuestra variable
    // Mediante switch cambiar segun rol_form el tipo de rol ej 1 = administrador 2 = ventas....
    // Solo si ambos son iguales mostrar en un alert "Usted inició sesión correctamente con el rol de administrador"
    
    var rolTexto = '';

    if(user_form === user && pass_form === password){
      switch (rol_form){
        case '1':
          rolTexto = 'administrador';
          break;
        case '2':
          rolTexto = 'ventas';
          break;
        case '3':
          rolTexto = 'recursos humanos';
          break;
        case '4':
          rolTexto = 'sistemas';
          break;
        case '5':
          rolTexto = 'contabilidad';
          break;
        default:
          alert('Usted no pertenece a ningun area');
          break;
      }
      alert("Usted inició sesión correctamente con el rol de " + rolTexto);
    } else{
      alert("Login Incorrecto")
    }
  
    // Si el usuario o el password son incorrectos (uno debe ser al menos correcto)
    // Mostrar un alert "usuario/ password incorrectos"
  
  
    // Si ninguno de los dos son iguales 
    // Mostrar un alert donde diga "el usuario no existe"
  }