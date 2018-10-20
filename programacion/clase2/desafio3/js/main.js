var textoOp = 'Ingrese la operación a realizar: sum, res, mul o div';
do {
  var operacion = prompt(textoOp);
  if (operacion !== 'sum' && operacion !== 'res' && operacion !== 'mul' && operacion !== 'div') {
    textoOp = 'Usted no ha ingresado ninguna de las operaciones solicitadas. Ingrese la operación a realizar: sum, res, mul o div'
  }
} while (operacion !== 'sum' && operacion !== 'res' && operacion !== 'mul' && operacion !== 'div');

var textoNum = 'Ingrese el primer número';
do {
  var numero1 = prompt(textoNum);
  if (isNaN(parseInt(numero1))) {
    textoNum = 'Usted no ha ingresado un número. Por favor vuelva a ingresar el primer número';
  }
} while (isNaN(parseInt(numero1)));

var textoNum2 = 'Ingrese el segundo número';
do {
  var numero2 = prompt(textoNum2);
  if (isNaN(parseInt(numero2))) {
    textoNum2 = 'Usted no ha ingresado un número. Por favor vuelva a ingresar el segundo número';
  } else if (operacion === 'div' && parseInt(numero2) === 0) {
    textoNum2 = 'Ingrese un número que sea distinto de 0';
  }
} while ((operacion === 'div' && parseInt(numero2) === 0) || isNaN(parseInt(numero2)));

switch (operacion) {
  case 'sum':
    alert("El resultado de la suma es: " + (parseInt(numero1) + parseInt(numero2)));
    break;
  case 'res':
    alert("El resultado de la resta es: " + (parseInt(numero1) - parseInt(numero2)));
    break;
  case 'mul':
    alert("El resultado de la multiplicación es: " + (parseInt(numero1) * parseInt(numero2)));
    break;
  case 'div':
    alert("El resultado de la división es: " + (parseInt(numero1) / parseInt(numero2)));
    break;
  default:
  //En el prompt ya estoy validando que solo pueda ingresar alguna de las operaciones pedidas, pero por las dudas vuelvo a validar aqui
    alert("Usted no ingresó ninguna de las operaciones solicitadas");
    break;
}