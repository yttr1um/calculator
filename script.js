let numberBtns = document.querySelectorAll(".number");
let operationBtns = document.querySelectorAll(".operation");
let cancelBtn = document.querySelector("#cancel");
let screen = document.querySelector("#calc-screen");

numberBtns.forEach(numberBtn => {
    numberBtn?.addEventListener("click", () => {
        let number = document.createElement("p");
        number.textContent = numberBtn.value;
        screen.appendChild(number);
    })
})

cancelBtn.addEventListener("click", () => {
    for (let text of Array.from(screen.children)) {
        text.remove();
    }
})

operationBtns.forEach(operationBtn => {
    operationBtn?.addEventListener("click", () => {
        let operation = document.createElement("p");
        operation.textContent = "+";
        screen.appendChild(operation);
    })
})