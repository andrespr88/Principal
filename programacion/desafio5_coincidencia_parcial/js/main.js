/* Crear una función que reciba como parámetros dos string y devuelva true en caso de encontrar una coincidencia parcial y false en caso 
contrario, la función no tiene que distinguir mayúsculas de minúsculas. El primer parámetro pasado a la función es el que se va a tratar 
de encontrarse dentro del segundo, si alguno de los parámetros no es un string también deberá devolver false.

includesText('Pa', 'Patricia') // Deberá devolver true
includesText('Patricia', 'Pa') // Deberá devolver false
includesText(2, 'Pa') // Deberá devolver false

Hint: Se deberán pasar los parámetros recibidos a mayúsculas y luego hacer la comparación mediante indexOf para poder encontrar 
coincidencias parciales sin importar mayúsculas y minúsculas. */

function includesText(cadena,cadena2){
    var res= false;
    if (typeof cadena === 'string' && typeof cadena2 === 'string'){
        var cadenaMay = cadena.toUpperCase().trim(); //uso trim porque si no, no reconoceria, x ej, "Pa ", "Patricia"
        var cadena2May = cadena2.toUpperCase();
        if (cadena2May.indexOf(cadenaMay) !== -1){
            res = true;
        }
    }  
    return res;
}

function imprimirResultado(){
    var cadena = document.getElementById("cadena").value;
    var cadena2 = document.getElementById("cadena2").value;
    if (includesText(cadena,cadena2)) 
        document.getElementById("resultado").innerText = "Hay coincidencia"; 
    else 
        document.getElementById("resultado").innerText = "No hay coincidencia"; 
}

//hago las siguientes comparaciones manualmente, porque los input siempre devuelven un string:

//compruebo que si alguno de los parametros no es un string, devuelva false
console.log(includesText(2,23));
console.log(includesText(2,"23"));
console.log(includesText("2",23));
//compruebo que devuelva true, ya que ambos son strings y "2" está incluído en "23"
console.log(includesText("2","23"));