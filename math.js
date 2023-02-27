const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)

let max

let number1
let number2
let result
let textToDisplay

function init(){
    max=urlParams.get('max')
    if(!max) {
        max=10
    }
    var input = document.getElementById("answer")
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            document.getElementById("checkResult").click()
        }
    })
    newOperation()
}

function newOperation() {
    document.getElementById("checkResult").disabled=false
    document.getElementById("resultPicture").setAttribute("src", "question.png")
    document.getElementById("answer").value=null
    document.getElementById("answer").focus()

    number1 = Math.floor(Math.random() * max)
    number2 = Math.floor(Math.random() * max)
    result = number1 + number2

    textToDisplay=number1 + " + " + number2 + " = "

    console.log("Operation: " + textToDisplay)
    console.log("Result: " + result)

    document.getElementById("mathOperation").innerHTML = textToDisplay
    document.getElementById("reload").disabled=true
}

function checkResult() {
    let answer = document.getElementById("answer").value

    console.log("Answer: " + answer)

    if(answer == result) {
        console.log("Correct answer")
        document.getElementById("resultPicture").setAttribute("src", "correct.png")
        document.getElementById("checkResult").disabled=true
        document.getElementById("reload").disabled=false
        document.getElementById("reload").focus()

    } else {
        console.log("Incorrect answer")
        document.getElementById("resultPicture").setAttribute("src", "incorrect.png")
        document.getElementById("checkResult").disabled=false
        document.getElementById("reload").disabled=true
        document.getElementById("answer").focus()
    }
}

