const number_buttons = document.querySelectorAll('.number');
const input = document.getElementById('calc_display');
const op = document.querySelectorAll('.operator');

const multiplication = document.querySelector('#multiply');
const division = document.querySelector('#divide');
const addition = document.querySelector('#add');
const subtraction = document.querySelector('#subtract');

const evaluate = document.querySelector('#evaluate');
const decimal = document.querySelector('#decimal button');
const clearAllData = document.querySelector('.clear button');

//Stored numbers used for calculation

let num_display = {
    result: 0,
};

//Stored operators used in calculations

let operatorStorage = {
};

//Used to index the stored numbers in num_display

let count = 0;

//Used to index the stored operators in operatorStorage
let operatorSequence = 0;

//Index of the second number used in operation
let iterable_for_post_result = 1;

//Index of the first number/ acummulative value
let iterable_for_result = 0;

let operatorType;

//Stored the result of the operation
let operationResult = 0;

let clicked = 1;

//Number of clicks on the decimal button
let decimalClicks = 0;

//Also used to index stored numbers
let postResGreaterThan1 = 1;

//Number of times equals button is clicked
let evalNumOfClicks = 0;

// Number of times operator button is clicked
let operatorClicks = 0;

// Check number of values in an object
let called = 1;

//performs operation

function operate(operator, num1, num2){
    switch(operator){
        case '+':
            // console.log(Number((add(num1, num2)).toFixed(2)));
            return Number((add(num1, num2)).toFixed(2));
            break;
        case '-':
            // console.log(Number((subtract(num1, num2)).toFixed(2)));
            return Number((subtract(num1, num2)).toFixed(2));
            break;
        case '*':
            // console.log(Number((multiply(num1, num2)).toFixed(2)));
            return Number((multiply(num1, num2)).toFixed(2));
            break;
        case '/':
            // console.log(Number((divide(num1, num2)).toFixed(2)));
            return Number((divide(num1, num2)).toFixed(2));
            break;
    }
}

// When numbers are clicked eventlistener

number_buttons.forEach(el => {
     el.addEventListener('click', () => {
        operatorClicks--;
        if(el.textContent == '.'){
            // console.log('deci');
            if(decimalClicks == 1){
                el.disabled = true;
                decimalClicks--;
            } else {
                decimalClicks++;
                el.disabled = false;
                input.value += el.textContent;
                if(count == 0){
                    // When an operation is called before a number is entered result becomes 0.
                    num_display.result = Number(input.value);
                } else if (count >= 1){
                    num_display[`post_op_result ${count}`] = Number(input.value);
                }
            }
        } else {
            input.value += el.textContent;
            if(count == 0){
                num_display.result = Number(input.value);
            } else if (count >= 1){
                num_display[`post_op_result ${count}`] = Number(input.value);
            }
            // console.log(num_display);
        } 
    });
});

// Eventlistener when the '=' is clicked

evaluate.addEventListener('click', () => {
   //Stop evaluation if user clicks equals more than once consecutively
   if(evalNumOfClicks <= 1){
        evalNumOfClicks++;
        iterable_for_result;
        iterable_for_post_result;
        // Condition for if user does not click an operator
        if(operatorType == undefined || isNaN(operatorType) == true && Object.keys(num_display).length == 1){
            return;
        } else {
        // Condition for if user does not input the first number
        if(input.value == ''){
            // if a user inputted the first number but did not enter an operator
            if(operatorType == undefined || isNaN(operatorType) == true){
                operatorType = '+';
            }
            input.value = `${num_display['result']}`;
            operationResult = Number(input.value);
            // console.log(operationResult);
            return operationResult;
        } else {
            let errorMessage = evaluateOperation(iterable_for_result, iterable_for_post_result);
            // if divide number by 0
            if(errorMessage == Infinity){
                // console.log('Bwana');
                errorMessage = 'YERRRRR';
                input.value = `${errorMessage}`;
                errorMessage = 0;
                operationResult = Number(input.value);
                num_display['result'] = operationResult;
            } else {
                //if for anyother reason the result is NaN
                if(isNaN(errorMessage) == true){
                    errorMessage = 0;
                    return errorMessage;
                }
                //If no problems with inputs, calls evaluateOperation function and calculates.
                input.value = `${errorMessage}`;
                operationResult = Number(input.value);
                num_display['result'] = operationResult;
                return num_display['result'];
            }
        }
        }
        iterable_for_post_result++;
        iterable_for_result++;
        console.log(num_display);
    } else {
        return;
    }
});

// operator click event listener

op.forEach(btn => {
    btn.addEventListener('click', () => {
        //Note: More on this in the evaluate eventlistener above
        evalNumOfClicks++;
        if(evalNumOfClicks > 1){
            while( evalNumOfClicks > 1){
                evalNumOfClicks--;
            }
        }
        // console.log(operatorType);
        if(clicked > 1){
            clicked-=2;
            count++;
            clear();
        } else if(clicked <= 1){
            count++;
            //Prevent multiple decimals in a number
            decimal.disabled = false;
            decimalClicks = 0;
            clicked++;
            clear();
        }
    })
});

//Stores the operator clicked into operator object

function operatorTypeFunction(operator){
    //Prevent operator from being added into operatorStorage when user clicks consecutively
    if(operatorClicks < 1){
        while (operatorClicks < 0){
            operatorClicks++;
        }
        operatorClicks++;
        // console.log(operatorClicks);
        operatorSequence++;
        operatorStorage[`Operator ${operatorSequence}`] = `${operator}`;
        operatorType = operatorStorage[`Operator ${operatorSequence}`];
        // console.log(operatorStorage);
    } else {
        if(operator != operatorType){
            operatorStorage[`Operator ${operatorSequence}`] = `${operator}`;
            operatorType = operatorStorage[`Operator ${operatorSequence}`];
            // console.log(operatorStorage);
        } else {
            return;
        }
    }
}

// clears only the inputted value

function clear(){
    input.value = "";
}

function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}

// second inputted value

function storedKeys(i){
    return num_display[Object.keys(num_display)[i]];
}

// first inputted value/ also stored as the final result of every operation performed
// Note: Check comments above evaluateOperation function for further detail


function resultNum1(i){
    //Selects the first number in num_display
    if(operationResult == 0 && Object.keys(num_display).length <= 2) {
        // console.log('result ' + num_display[Object.keys(num_display)[i]]);
        return num_display[Object.keys(num_display)[i]];
    } else {
        //Resolves issues with operation results
        if(isNaN(operationResult) == true && isNaN(num_display['result']) == true) {
            // console.log('both operationResult and result are NaN');
            operationResult = 0;
            num_display['result'] = 0;
            return operationResult, num_display['result'];
         } else if(isNaN(operationResult) == true || operationResult == undefined) {
            operationResult = 0;
            // console.log("operation result is NaN");
            return operationResult;
         } else if(isNaN(num_display['result']) == true) {
            // console.log("result is NaN")
            num_display['result'] = 0;
            return num_display['result'];
        } else {
            // console.log("operation result is !NaN");
            return num_display['result'];
        }
    }
}

function evaluateOperation(iterable_variable_1, iterable_variable_2) {
    let postResultIterable = 0;
    let resultNumIterable = -1;
    // console.log('hello');
    // if stored numbers exceeds 2
    if(Object.keys(num_display).length > 2){
        // console.log('Run');
        postResultIterable = 1;
        // if user 
        if(called >= 2){
            postResGreaterThan1++;
            // console.log('called is greater than 2 ' + called);
            for(let i = called; i <= Object.keys(operatorStorage).length; i++){
                // console.log("called is: " + called + " and " + "postResGreaterTan1 is " + postResGreaterThan1);
                if(called > postResGreaterThan1){
                    postResGreaterThan1++;
                }
                // The logging are to help to see the result and what is being used in the operate function
                resultNumIterable++;
                postResultIterable++;
                // console.log('called is ' + called);
                // console.log(operatorStorage[`Operator ${i}`]);
                // console.log(postResGreaterThan1);
                // console.log(storedKeys(postResultIterable));
                // console.log(num_display['result']);
                operationResult = operate(operatorStorage[`Operator ${i}`], resultNum1(resultNumIterable), storedKeys(postResGreaterThan1));
                num_display['result'] = 0;
                num_display['result'] += operationResult;
                // i.e. firstvalue = 10; secondvalue = 12;
                // newvalue = firstvalue + secondvalue;
                // Make firstvalue = 0 and then... 
                // firstvalue += newvalue
                called++;
            }
            return num_display['result'];
        } else {
            //If user entered 3 or more numbers before hitting equals operator
            for(let i = 1; i <= Object.keys(operatorStorage).length; i++){
                resultNumIterable++;
                // console.log(operatorStorage[`Operator ${i}`]);
                // console.log(storedKeys(postResultIterable));
                // console.log(postResultIterable);
                operationResult = operate(operatorStorage[`Operator ${i}`], resultNum1(resultNumIterable), storedKeys(postResultIterable));
                num_display['result'] = 0;
                num_display['result'] += operationResult;
                postResultIterable++;
                called++;
            }
            return num_display['result'];
        }
    } else {
        called++
        // console.log("Called is: " + called);
        return operate(operatorType, resultNum1(iterable_variable_1), storedKeys(iterable_variable_2));
    }
}

//Clears all data stored and the input

clearAllData.addEventListener('click', () => {
    for(let key in num_display){
        for(let i = count; i >= 0; i--){
            num_display['result'] = 0;
            delete num_display[`post_op_result ${i}`];
            delete operatorStorage[`Operator ${i}`];
        }
    }

    clear();
    operationResult = 0;
    count = 0;
    clicked = 1;
    decimalClicks = 0;
    iterable_for_post_result = 1;
    iterable_for_result = 0;
    operatorSequence = 0;
    called = 1;
    postResGreaterThan1 = 1;
    evalNumOfClicks = 0;
    operatorClicks = 0;
});