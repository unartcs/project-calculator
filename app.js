const getButtonNumbers = document.querySelectorAll('.num')
const getButtonClear = document.querySelector('.clear')
const getButtonDelete = document.querySelector('.delete')
const getButtonEqual = document.querySelector('.equal')
const getScreenTop = document.querySelector('.calc-screen-top')
const getScreenBottom = document.querySelector('.calc-screen-bottom')
const getButtonOperators = document.querySelectorAll('.operator')
const getAllButtons = document.querySelectorAll('button')
const getDecimalButton = document.querySelector('.decimal')


num1 = '';
num2 = '';
operator = '';
sum = ''
sameNum = '';
decimal = false;

function cc() {
    console.log(`num1: ${num1}`)
    console.log(`num2: ${num2}`)
    console.log(`operator: ${operator}`)
}

function clearAll() {
    num1 = '';
    num2 = '';
    operator = '';
    sum = ''
    sameNum = '';
    decimal = false;
    updateScreen();
    getScreenBottom.textContent = 'Cleared!';
}

function checkDecimal() {
    if (decimal == false && operator !== '' && num2 !== '') {
        num2 += '.'
        decimal = true;
        updateScreen();
    } else if (decimal == false && operator === '' && num1 !== '') {
        num1 += '.'
        decimal = true;
        updateScreen();
    }
    else if (decimal == true) {
        return;
    }
}


function deleteNumber() {
    if (operator !== '' && num2.endsWith(".")) {
        num2 = num2.split('');
        num2.pop();
        num2 = num2.join('');
        decimal = false;
    }
    else if (num1 !== '' && operator == '' && num1.endsWith(".")) {
        num1 = num1.split('');
        num1.pop();
        num1 = num1.join('');
        decimal = false;
    }
    else if (operator !== '' && num2 !== '') {
        num2 = num2.split('');
        num2.pop();
        num2 = num2.join('');
    }
    else if (num1 !== '' && operator == '') {
        num1 = num1.split('');
        num1.pop();
        num1 = num1.join('');
    }
    else { return }
    updateScreen();
}

function checkNumbers(value) {
    if (operator !== '') {
        num2 += value;
        updateScreen();
    } else if (operator === '') {
        num1 += value;
        updateScreen();
    }
}
function equalNumbers() {
    const sameNum = num1;
    if (num2 == 0 && operator == '/') {
        getScreenBottom.textContent = 'Cannot divide by 0!'
    }
    else if (num1 !== '' && num2 !== '') {
        calculate(operator, num1, num2);
        updateLowerScreen();
    }
    // else if (num2 === '') { /// Need to set a certain variable if I want to be able to do num1 + = (lets say 5+ and then = will be 5>10>15>20 etc and not 10 > 20 >40 etc)
    //     calculate(operator, num1, sameNum)
    // }
}
function checkOperator(value) {
    if (num2 == 0 && operator == '/') {
        getScreenBottom.textContent = 'Cannot divide by 0!'
    }
    else if (num1 !== '' && num2 !== '') {
        calculate(operator, num1, num2)
        operator = value;
        decimal = false;
        updateScreen();
    } else if (num1 !== '') {
        operator = value;
        decimal = false;
        updateScreen();
    }
}

function updateScreen(b) {
    if (b == 0) {
        getScreenBottom.textContent = "0";
        b == '';
    } else {
        getScreenBottom.textContent = num1;
        getScreenTop.textContent = `${num1}${operator}${num2}`
    }
}

function updateLowerScreen() {
        getScreenBottom.textContent = num1;
}

getDecimalButton.addEventListener('click', function () {
    checkDecimal();
})

getButtonDelete.addEventListener('click', function () {
    deleteNumber();
})

getButtonClear.addEventListener('click', function () {
    clearAll();
})

getButtonNumbers.forEach((button) => {
    button.addEventListener('click', function () {
        checkNumbers(button.textContent);
    })
})

getButtonOperators.forEach((button) => {
    button.addEventListener('click', function () {
        checkOperator(button.textContent);
    })
})

getButtonEqual.addEventListener('click', function () {
    equalNumbers();
})

function calculate(op, a, b) {
    a = Number(a)
    b = Number(b)
    if (op == '/' && b == 0) {
        console.log(op, b)
        getScreenBottom.textContent = "Invalid"
        num2 == '';
        // num1 == ''
    }
    else {
        switch (op) {
            case '+':
                num1 = add(a, b);
                num2 = ''
                break;
            case '-':
                num1 = minus(a, b);
                num2 = ''
                break;
            case '*':
                num1 = multiply(a, b);
                num2 = ''
                break;
            case '/':
                num1 = divide(a, b);
                num2 = ''
                break;
            case '^':
                num1 = power(a, b);
                num2 = ''
                break;
        }
    }
}



function add(a, b) {
    return parseFloat(a) + parseFloat(b);
}
function minus(a, b) {
    return parseFloat(a) - parseFloat(b);
}
function multiply(a, b) {
    return parseFloat(a) * parseFloat(b);
}
function divide(a, b) {
    return parseFloat(a) / parseFloat(b);
}
function power(a, b) {
    return Math.pow(parseFloat(a), parseFloat(b))
}