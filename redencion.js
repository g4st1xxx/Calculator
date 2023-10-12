const add = (num1, num2) => num1 + num2;
const substract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

let firstNumber = false
let operator = false
let secondNumber = false

const operate = () => {

    firstNumber = +firstNumber
    secondNumber = +secondNumber

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
    firstNumber = result
    operator = false
    secondNumber = false

    if(!(Number.isInteger(result))){
        result = result.toFixed(4)
    }
    
    if(result.toString().length >= 9){
        result = result.toExponential(2); 
    }else if(parseFloat(result).length <= 9){
        result = parseFloat(result)
    }

    return result
}


const numberInputs = document.getElementsByClassName('numberInput');
const operatorInputs = document.getElementsByClassName('operatorInput')
const equalButton = document.getElementById('equal')
const clearButton = document.getElementById('clear')

const display = document.getElementById('displayValue')
const formerCalculation = document.getElementById('displayFormerCalculation')

const numberInputsArray = [...numberInputs];
const operatorInputsArray = [...operatorInputs]

numberInputsArray.forEach((input) => input.addEventListener('click', () => {
    if (display.innerText == '') {
        display.innerText = input.innerText;

    } else {
        display.innerText += input.innerText
        if (firstNumber && operator && !secondNumber) {
            secondNumber = input.innerText
        } else if (firstNumber && operator && secondNumber) {
            secondNumber += input.innerText
        }
    }
}))

operatorInputsArray.forEach((input) => input.addEventListener('click', () => {
    let inputValue = input.innerText

    if (operator && !secondNumber) {
        firstNumber = display.innerText.slice(0, -1)

        operator = inputValue

        display.innerText = `${firstNumber}${operator} `

    } else if (!operator) {
        firstNumber = display.innerText

        operator = inputValue

        display.innerText = `${firstNumber}${operator} `
    } else if (operator, secondNumber) {
        formerCalculation.innerText = display.innerText
        display.innerText = operate()
    }
}))

equalButton.addEventListener('click', () => {
    formerCalculation.innerText = display.innerText
    display.innerText = operate()
})

clearButton.addEventListener('click', () => {
    display.innerText = ''
    formerCalculation.innerText = ''

    firstNumber = false
    operator = false
    secondNumber = false
})




