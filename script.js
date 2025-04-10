let topScreen = document.querySelector("#top-screen");
let outputScreen = document.querySelector("#output-screen");
let screen = document.querySelector("#calc-screen");
let buttons = document.querySelectorAll("button");
let existingOperation =  false;
let existingDecimal = false;
let operations = ['+', '-', '*', '/'];

function calculate(problem) {
    
    //get the operation used in the problem.
    let operationUsed;
    operations.forEach(operation => {
        if (problem.includes(operation)) {
            operationUsed = operation;
        }
    })

    //if no operation was used then print the number again.
    if (operationUsed === undefined) return +problem;

    //get the 2 numbers in the problem.
    let numbers = problem.split(operationUsed);

    //calculate!!!!
    let result;
    switch(operationUsed) {
        case "+":
            result = +numbers[0] + +numbers[1];
            break;

        case "-":
            result = +numbers[0] - +numbers[1];
            break;

        case "*":
            result =  +numbers[0] * +numbers[1];
            break;

        case "/":
            result = +numbers[0] / +numbers[1];
            break;
    }

    //check if a number is a float and return it with 1 dp.
    if (result%1 !== 0) {
        return Math.round(result*10)/10;
    } else {
        return result;
    }
}

buttons.forEach(button => {
    button.addEventListener("click", event => {
        let target = event.target;

        switch(target.className) {

            case "number":
                let number = document.createElement("p");
                number.textContent = target.value;
                topScreen.appendChild(number);

                for (let output of Array.from(outputScreen.children)) {
                    output.remove();
                }

                let problem = topScreen.textContent;
                let outputValue = document.createElement("p");
                outputValue.textContent = calculate(problem);

                outputScreen.appendChild(outputValue);
                break;

            case "operation":
                if (!existingOperation) {
                    let operation = document.createElement("p");
                    operation.textContent = target.value;
                    firstNum = topScreen.textContent;
                    topScreen.appendChild(operation);
                    existingOperation = true;
                    existingDecimal = false;
                }
                break;
            
            case "cancel":
                Array.from(topScreen.children).forEach(text => {
                    text.remove();
                })

                Array.from(outputScreen.children).forEach(text => {
                    text.remove();
                })

                existingOperation = false;
                existingDecimal = false;
                break;

            case "equal":
                let result = outputScreen.textContent

                //clearing the screen.
                Array.from(topScreen.children).forEach(text => {
                    text.remove();
                })

                Array.from(outputScreen.children).forEach(text => {
                    text.remove();
                })
                existingOperation = false;

                let output = document.createElement("p");
                output.textContent = result;
                topScreen.appendChild(output);
                break;


            case "decimal":
                if (!existingDecimal) {
                    let decimal = document.createElement("p");
                    decimal.textContent = target.value;
                    topScreen.appendChild(decimal);
                    existingDecimal = true;
                }
                break;
        }
    })
})
