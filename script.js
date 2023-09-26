const add = (num1, num2) => num1 + num2;
const substract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

let firstNumber;
let operator = false;
let secondNumber = false;

let actualFirstNumber = false

const operate = (firstNumber, operator, secondNumber) => {
    // firstNumber = parseInt(prompt('first number'))
    // operator = prompt('operator')
    // secondNumber = parseInt(prompt('second number'))

    let result;
    switch (operator) {
        case '+':
            result = add(firstNumber, secondNumber)
            break;
        case '-':
            result = substract(firstNumber, secondNumber)
            break
        case '*':
            result = multiply(firstNumber, secondNumber)
            break
        case '/':
            result = divide(firstNumber, secondNumber)
            break
    }

    // reset operator and second number
    secondNumber = false
    actualFirstNumber = result
    operator = false

    if(!(Number.isInteger(result))){
        result = result.toFixed(2)
    }

    return (
        result
    )
}





const numberInputs = document.getElementsByClassName('numberInput');
const operatorInputs = document.getElementsByClassName('operatorInput')
const equalButton = document.getElementById('equal')
const clearButton = document.getElementById('clear')


const display = document.getElementById('displayValue')

const numberInputsArray = [...numberInputs];
const operatorInputsArray = [...operatorInputs]

let displayValue

numberInputsArray.forEach((input) => input.addEventListener('click', () => {

    if(display.innerText.length >= 12 ){
        display.innerText = 'infinity'
    }

    if (operator) {
        console.log('if bueno')

        display.innerText += input.innerText

        console.log(parseInt(input.innerText))

        if (secondNumber === false) {
            secondNumber = input.innerText
        } else {
            secondNumber += input.innerText
        }
    }

    if ((display.innerText === '0' || display.innerText === 'error') && operator === false) {
        console.log('if malo')
        display.innerText = input.innerText
    } else if (operator === false) {
        display.innerText += input.innerText
    }
    if(Number.isInteger(actualFirstNumber)){
        displayValue = parseInt(display.innerText)
    }else{
        displayValue = parseFloat(display.innerText)
    }

    if(actualFirstNumber) {
        actualFirstNumber = displayValue
    }
}))


operatorInputsArray.forEach((operation) => operation.addEventListener('click', () => {

    if(display.innerText === 'error'){
        return 
    }

    if (!(firstNumber)) {
        firstNumber = displayValue
    }

    if(!(operator)) {
        operator = operation.innerText
        display.innerText += operator
    }else if(operator && secondNumber){
        secondNumber = parseInt(secondNumber)

        if (actualFirstNumber) {
            display.innerText = (operate(actualFirstNumber, operator, secondNumber))
        } else {
            display.innerText = (operate(firstNumber, operator, secondNumber))
        }
        secondNumber = false
        operator = operation.innerText
        display.innerText += operator
    }

    }
))

equalButton.addEventListener('click', () => {

    if((!(operator) || !(secondNumber) || !(firstNumber)) || operator === '/' && secondNumber == 0){
        firstNumber = undefined
        secondNumber = false
        operator = false
        actualFirstNumber = undefined

        return display.innerText = 'error'
    }

    secondNumber = parseInt(secondNumber)

    if (actualFirstNumber) {
        display.innerText = (operate(actualFirstNumber, operator, secondNumber))
    } else {
        display.innerText = (operate(firstNumber, operator, secondNumber))
    }
    secondNumber = false
    operator = false
})

clearButton.addEventListener('click', () => {
    firstNumber = undefined
    secondNumber = false
    operator = false
    actualFirstNumber = undefined

    display.innerText = ''
})

/*
Que formas se me ocurren para capturar los inputs numericos y el operador? con los recursos que cree hasta el momento, solo puedo conseguir un string

Desde el string, puedo hacer un split para obtener los dos argumentos, y acto seguido llamar a la funcion operate()
Para lograr esto, deberia buscar un metodo del tipo contiene() para que detecte el operador que se busca usar
Este bloque de funciones se ejecutaria al dar =, o al presionar otro operador cuando uno ya esta en uso, el problema con esta solucion es que
cuando quiera realizar esta ultima accion, se me va a dificultar porque el bloque de codigo evaluaria los 3 inputs al analizar el string efectuado

Otra solucion, mas efectiva, seria la de ejecutar una funcion al momento de llamar a un operador, al hacer esto tanto el primer argumento como el operador
quedan definidos, y queda a la espera del ultimo operador
Ahora si, al presionar otro operador, en caso de que se haya definido el segundo argumento, podria realizar el calculo y acto seguido la funcion calcular se 
ejecutaria de nuevo con los primeros dos argumentos ya definidos. 

Bugs a solucionar

Doble operador en display
funcion equal si hay presentes un operador y un secondNumber
*/