let value = document.querySelector(".value");
let operand1 = null;
let operatorToCalculate = null;
let hasSet = true;
let message = document.querySelector(".message");

let digitsButton = document.querySelectorAll(".digits");

digitsButton.forEach((digit) => {
    digit.addEventListener("click", () => {
        if (hasSet || value.textContent==="0") {
            value.textContent = digit.textContent;
            hasSet = false;
            message.textContent = "";
        } else if (value.textContent.length <= 14) {
            value.textContent += digit.textContent;
            message.textContent = "";
        }
        else
        {
            message.textContent = "Maximum number of allowed digits is 14";
        }
    })
});

let clearButton = document.querySelector(".clear");

clearButton.addEventListener("click", () => {
    value.textContent = "0";
    operand1 = null;
    operatorToCalculate = null;
    hasSet = true;
    message.textContent = "";
});

let deleteButton = document.querySelector(".delete");

deleteButton.addEventListener("click", () => {
    if(hasSet === false)
    {
        if (value.textContent !== "0") {
            if (value.textContent.length === 1) {
                value.textContent = "0";
                hasSet=true;
            } else {
                value.textContent = value.textContent.slice(0, value.textContent.length - 1);
            }
        }
    }
});

let equalButton = document.querySelector(".equal");

equalButton.addEventListener("click", () => {
    if (operand1 !== null && operatorToCalculate !== null) {
        operand1 = operate(operand1, value.textContent, operatorToCalculate);
        value.textContent = operand1;
        
        hasSet = true;
        operatorToCalculate = null;
    }
    console.log(operand1);
});

let operatorsButton = document.querySelectorAll(".operators");

operatorsButton.forEach(
    (operator) => {
        operator.addEventListener("click", () => {
            if (operand1 === null) {
                operand1 = value.textContent;
                operatorToCalculate = operator.textContent;
                console.log("Operand 1: " + operand1);
                console.log("Operator: " + operatorToCalculate);
            } else if(operatorToCalculate!==null)
                {
                operand1 = operate(operand1, value.textContent, operatorToCalculate);
                operatorToCalculate = operator.textContent;
                console.log("Operand 1: " + operand1);
                console.log("Operator: " + operatorToCalculate);
                value.textContent = operand1;
                }
            
            hasSet = true;

        })
    }
);

function operate(operand1, operand2, operator) {

    function parser(result) {
        if (result.toString().length >= 15) {
            operand1 = result;
            let copy = result;
            let start = 1;
            while (result.toString().length != 15) {
                result = copy.toExponential(start);
                start++;
            }
            hasSet=true;
        }
        return result;
    }

    if (operator === "+") {
        result = (parseFloat(operand1) + parseFloat(operand2));
        return parser(result);
    } else if (operator === "-") {
        result = (parseFloat(operand1) - parseFloat(operand2));
        return parser(result);
    } else if (operator === "x") {
        result = (parseFloat(operand1) * parseFloat(operand2));
        return parser(result);
    } else if (operator === "/") {
        if(operand2==="0")
        {
            message.textContent = "Error: Division by 0";
        }
        result = (parseFloat(operand1) / parseFloat(operand2));
        return parser(result);
    }
}