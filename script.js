let value = document.querySelector(".value");
let operand1 = null;
let operand2 = null;

let digitsButton = document.querySelectorAll(".digits");

digitsButton.forEach((digit) => {
    digit.addEventListener("click", () => {
        if (value.textContent === "0") {
            value.textContent = digit.textContent;
        } else if (value.textContent.length <= 14) {
            value.textContent += digit.textContent;
        }
    })
});

let clearButton = document.querySelector(".clear");

clearButton.addEventListener("click", () => {
    value.textContent = "0";
    operand1 = null;
    operand2 = null;
});

let deleteButton = document.querySelector(".delete");

deleteButton.addEventListener("click", () => {
    if (value.textContent !== "0") {
        if (value.textContent.length === 1) {
            value.textContent = "0";
        } else {
            value.textContent = value.textContent.slice(0, value.textContent.length - 1);
        }
    }
});