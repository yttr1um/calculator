let topScreen = document.querySelector("#top-screen");
let outputScreen = document.querySelector("#output-screen");
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
        return Math.round(result*1000)/1000;
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
                let result = document.createElement("p");
                result.textContent = calculate(problem);

                outputScreen.appendChild(result);
                break;

            case "operation":
                if (!existingOperation) {
                    let operation = document.createElement("p");
                    operation.textContent = target.value;
                    firstNum = topScreen.textContent;
                    topScreen.appendChild(operation);
                    existingOperation = true;
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
                break;

            case "equal":
                //has to clear the result screen incase theres already a result there.
                // let problem = topScreen.textContent;
                let outputValue = outputScreen.textContent

                //clearing the output screen.
                Array.from(topScreen.children).forEach(text => {
                    text.remove();
                })

                Array.from(outputScreen.children).forEach(text => {
                    text.remove();
                })
                existingOperation = false;

                let output = document.createElement("p");
                output.textContent = outputValue;
                topScreen.appendChild(output);
                break;

        }
    })
})
