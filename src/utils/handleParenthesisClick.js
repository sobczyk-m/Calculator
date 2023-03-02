import buttonStyle from "../buttonStyle"
import handleParenthesisPick from "./handleParenthesisPick"

const handleParenthesisClick = (lastDisplayChar, displayExpression, setDisplayExpression,
                                mathExpression, setMathExpression, setDisplayResult) => {
    const leftParenthesis = document.createElement("button")
    const rightParenthesis = document.createElement("button")

    leftParenthesis.id = "("
    leftParenthesis.textContent = "("
    leftParenthesis.style.width = "50%"
    leftParenthesis.style.height = "100%"
    leftParenthesis.style.backgroundColor = buttonStyle.default.backgroundColor
    leftParenthesis.style.border = `0px solid ${buttonStyle.default.backgroundColor}`
    leftParenthesis.style.borderRight = `1px solid #adb5bd`
    leftParenthesis.style.borderRadius = `10px`

    rightParenthesis.id = ")"
    rightParenthesis.textContent = ")"
    rightParenthesis.style.width = "50%"
    rightParenthesis.style.height = "100%"
    rightParenthesis.style.backgroundColor = buttonStyle.default.backgroundColor
    rightParenthesis.style.border = `0px solid ${buttonStyle.default.backgroundColor}`
    rightParenthesis.style.borderLeft = `1px solid #adb5bd`
    rightParenthesis.style.borderRadius = `10px`

    leftParenthesis.addEventListener("click", ev => handleParenthesisPick(leftParenthesis.id,
        lastDisplayChar, displayExpression, setDisplayExpression, mathExpression, setMathExpression, setDisplayResult))
    rightParenthesis.addEventListener("click", ev => handleParenthesisPick(rightParenthesis.id,
        lastDisplayChar, displayExpression, setDisplayExpression, mathExpression, setMathExpression, setDisplayResult))
    document.getElementById("parenthesis").innerText = ""

    document.getElementById("parenthesis").style.backgroundColor = "#adb5bd"
    document.getElementById("parenthesis").style.border = "none"
    document.getElementById("parenthesis").append(leftParenthesis)
    document.getElementById("parenthesis").append(rightParenthesis)

    document.getElementById("parenthesis").onmouseleave =
        () => {
            document.getElementById("parenthesis").style.backgroundColor = buttonStyle.default.backgroundColor
            document.getElementById("parenthesis").style.border = `1px solid ${buttonStyle.default.backgroundColor}`
            document.getElementById("parenthesis").innerText = "( )"
        }
}

export default handleParenthesisClick