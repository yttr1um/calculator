let screen = document.querySelector("#calc-screen");
let buttons = document.querySelectorAll("button");
let existingOperation =  false;
let operations = ['+', '-', '*', '/'];

function calculate(problem) {
    
    //get the operation used in the problem.
    let operationUsed;
    operations.forEach(operation => {
        if (problem.includes(operation)) {
            operationUsed = operation;
        }
    })

    //get the 2 numbers in the problem.
    let numbers = problem.split(operationUsed);

    //calculate!!!!
    switch(operationUsed) {
        case "+":
            return +numbers[0] + +numbers[1];
            break;

        case "-":
            return +numbers[0] - +numbers[1];
            break;

        case "*":
            return +numbers[0] * +numbers[1];
            break;

        case "/":
            return +numbers[0] / +numbers[1];
            break;
    }
}

buttons.forEach(button => {
    button.addEventListener("click", event => {
        let target = event.target;

        switch(target.className) {

            case "number":
                let number = document.createElement("p");
                number.textContent = target.value;
                screen.appendChild(number);
                break;

            case "operation":
                if (!existingOperation) {
                    let operation = document.createElement("p");
                    operation.textContent = target.value;
                    firstNum = screen.textContent;
                    screen.appendChild(operation);
                    existingOperation = true;
                }
                break;

            case "cancel":
                for (let text of Array.from(screen.children)) {
                    text.remove();
                }
                existingOperation = false;
                break;

            case "equal":
                let problem = screen.textContent;
                
                let result = document.createElement("p");
                result.textContent = calculate(problem);

                //clear the screen.
                for (let text of Array.from(screen.children)) {
                    text.remove();
                }
                existingOperation = false;

                screen.appendChild(result);
                break;

        }
    })
})