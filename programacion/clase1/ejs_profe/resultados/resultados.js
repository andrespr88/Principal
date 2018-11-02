function simularSubmit(){
    var inglaterra_form = document.getElementById("inglaterra").value; 
    var alemania_form = document.getElementById("alemania").value; 
    console.log('Goles Inglaterra: '+inglaterra_form);
    console.log('Goles Alemania: '+alemania_form);
    // Consigna
    // general un alert donde me indique si gano alguno de los dos o si empataron
    // ej gano Alemani a inglaterra por 2 - 0

    if(parseInt(inglaterra_form) === parseInt(alemania_form)){
      alert("Empataron");
    } else if(parseInt(inglaterra_form) > parseInt(alemania_form)){
        alert("Gano Inglaterra");
    } else {
        alert("Gano Alemania");
    }
    
  }