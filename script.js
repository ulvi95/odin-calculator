let value = document.querySelector(".value");
let operand1 = null;
let operand2 = null;
let operatorToCalculate = null;
let hasSet = true;
let hasDot = false;
let isNeg = false;
let message = document.querySelector(".message");

let digitsButton = document.querySelectorAll(".digits");

digitsButton.forEach((digit) => {
    digit.addEventListener("click", () => {
        if (hasSet || value.textContent === "0") {
            value.textContent = digit.textContent;
            hasSet = false;
            message.textContent = "";
        } else if (value.textContent.length <= 14) {
            value.textContent += digit.textContent;
            message.textContent = "";
        } else {
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
    hasDot = false;
    message.textContent = "";
});

let deleteButton = document.querySelector(".delete");

deleteButton.addEventListener("click", () => {
    if (hasSet === false) {
        if (value.textContent !== "0") {
            if (value.textContent.length === 1) {
                value.textContent = "0";
                hasSet = true;
            } else {
                value.textContent = value.textContent.slice(0, value.textContent.length - 1);
                if (!value.textContent.includes(".")) {
                    hasDot = false;
                }
            }
        }
    }
});

let equalButton = document.querySelector(".equal");

equalButton.addEventListener("click", () => {
    if (operatorToCalculate === null) {
        return;
    }
    if(hasSet)
    {
        return;
    }
    operand2 = value.textContent;
    value.textContent = clearLastDot(value.textContent);
    value.textContent = operate(operand1, value.textContent, operatorToCalculate);


    operatorToCalculate = null;
    hasSet = true;
});

let operatorsButton = document.querySelectorAll(".operators");

operatorsButton.forEach(
    (operator) => {
        operator.addEventListener("click", () => {
            if (operatorToCalculate !== null) {
                equalButton.click();
            }
            value.textContent = clearLastDot(value.textContent);
            value.textContent = (Number(value.textContent) * 1).toString();
            operand1 = value.textContent;
            operatorToCalculate = operator.textContent;
            hasSet = true;

        })
    }
);


function clearLastDot(operand1) {
    if (operand1[operand1.length - 1] === ".") {
        return operand1.slice(0, operand1.length - 1);
    } else {
        return operand1.slice(0, operand1.length);
    }
}


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
            hasSet = true;
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
        if (operand2 === "0") {
            message.textContent = "Error: Division by 0";
        }
        result = (parseFloat(operand1) / parseFloat(operand2));
        return parser(result);
    }
}

let dotButton = document.querySelector(".dot");

dotButton.addEventListener("click", () => {
    if (!hasDot) {
        if (value.textContent.length <= 13) {
            value.textContent += ".";
        } else {
            message.textContent = "Maximum number of allowed digits is 14";
        }
        hasDot = true;
        hasSet = false;
    }
});

signButton = document.querySelector(".sign");

signButton.addEventListener("click", () => {
    if (value.textContent !== "0") {
        if (isNeg) {
            value.textContent = value.textContent.slice(1, value.textContent.length);
            isNeg = false;
        } else {
            if (value.textContent.length === 14) {
                message.textContent = "Maximum number of allowed symbols is 14";
            } else {
                if (value.textContent !== "0") {
                    value.textContent = "-" + value.textContent;
                    isNeg = true;
                }
            }
        }
    }

});