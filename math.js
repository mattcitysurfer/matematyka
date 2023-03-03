const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)

let level

let number1
let number2
let number3
let operation
let result

let operationToDisplay

let onlyAllowedOperation

function newOperation() {
    level = document.getElementById("levelSlider").value
    number1 = Math.floor(Math.random() * level)
    number2 = Math.floor(Math.random() * level)
    number3 = number1 + number2

    operation = getOperation()

    operationToDisplay = getOperationToDisplay(operation)
    console.log("Operation: " + operationToDisplay)

    result = getResult()
    console.log("Result: " + result)

    document.getElementById("mathOperation").innerHTML = operationToDisplay
    document.getElementById("answer").value=null
    document.getElementById("answer").focus()
    document.getElementById("resultPicture").setAttribute("src", "question.png")
    document.getElementById("checkResult").disabled=false
    document.getElementById("reload").disabled=true
    document.getElementById("levelSlider").disabled=true
}

function checkResult() {
    let answer = document.getElementById("answer").value

    console.log("Answer: " + answer)

    if(answer == result) {
        console.log("Correct answer")
        document.getElementById("resultPicture").setAttribute("src", "correct.png")
        document.getElementById("checkResult").disabled=true
        document.getElementById("reload").disabled=false
        document.getElementById("levelSlider").disabled=false
        document.getElementById("reload").focus()
        updateResults(answer, true)
    } else {
        console.log("Incorrect answer")
        document.getElementById("resultPicture").setAttribute("src", "incorrect.png")
        document.getElementById("checkResult").disabled=false
        document.getElementById("reload").disabled=true
        document.getElementById("levelSlider").disabled=true
        document.getElementById("answer").focus()
        updateResults(answer, false)
    }
}

function updateResults(answer, isCorrect) {
    let operationToDisplayWithAnswer = "L" + level + ": " + operationToDisplay + answer
    console.log(operationToDisplayWithAnswer)

    let usersAnswersTable = document.getElementById("usersAnswersTable")
    var tr = usersAnswersTable.insertRow(0)
    var td1 = tr.insertCell(0)
    var td2 = tr.insertCell(1)
    td1.innerHTML = "L" + level + ": "
    td2.innerHTML = operationToDisplay + answer

    // let tr = document.createElement("tr")
    // let td1 = document.createElement("td1");
    // let td2 = document.createElement("td2");
    // td1.innerText = "L" + level + ": "
    // td2.innerText = operationToDisplay + answer
    // tr.appendChild(td1)
    // tr.appendChild(td2)
    // usersAnswersTable.appendChild(tr)

    if (isCorrect) {
        tr.className = "text-success"
    } else {
        tr.className = "text-danger"
    }

    td1.className="levelColumn"
    td2.className="operationColumn"
}

function showHistory() {
    var usersAnswersTable = document.getElementById("usersAnswersTable");
    var historyButton = document.getElementById("history");
  
    if (usersAnswersTable.style.display === "none") {
        usersAnswersTable.style.display = "inline";
        historyButton.innerHTML = "Ukryj";
    } else {
        usersAnswersTable.style.display = "none";
        historyButton.innerHTML = "Pokaż";
    }
  }

function getOperation() {
    if (onlyAllowedOperation == "addition") {
        return "ADDITION"
    } else if (onlyAllowedOperation == "subtraction") {
        return "SUBTRACTION"
    } else {
        if (operation=="ADDITION") {
            return "SUBTRACTION"
        } else {
            return "ADDITION"
        }
    }
}

function getOperationToDisplay(operation) {
    if (operation=="ADDITION") {
        return number1 + " + " + number2 + " = "
    } else {
        return number3 + " - " + number2 + " = "
    }
}

function getResult() {
    if (operation=="ADDITION") {
        return number3
    } else {
        return number1
    }
}

function init(){
    // level=urlParams.get("max")
    // if(!level) {
    //     level=10
    // }
    // level++
    level = 10
    document.getElementById("levelSlider").value=level
    document.getElementById("levelSelected").value=level

    console.log("level:" + level)

    onlyAllowedOperation=urlParams.get('only')

    operation="SUBTRACTION"
    var input = document.getElementById("answer")
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            document.getElementById("checkResult").click()
        }
    })
    newOperation()
}