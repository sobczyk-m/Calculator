import { useEffect, useState} from "react"
import Display from "./Display"
import Buttons from "./Buttons"
import {buttons, numbers, operators, parentheses} from "../data/buttonsCollection"
import buttonStyle from "../data/buttonStyle"

const setButtonStyle = (sign) => {
    switch (true) {
        case Object.keys(operators).includes(sign):
            return buttonStyle.operator
        case sign === "C" || sign === "del":
            return buttonStyle.undo
        case sign === "=":
            return buttonStyle.equals
        default:
            return buttonStyle.default
    }
}

function App() {

    const [mathExpression, setMathExpression] = useState("")
    const [displayExpression, setDisplayExpression] = useState("")
    const [historyExpression, setHistoryExpression] = useState([])
    const [displayResult, setDisplayResult] = useState(false)

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    })

    const lastDisplayChar = displayExpression[displayExpression.length - 1]
    const penultimateDisplayChar = displayExpression[displayExpression.length - 2]

    const handleKeyDown = (e) => {
        console.log(e.key)
        switch (true) {
            case buttons.some(value => value.sign === e.key && e.key !== "x" && e.key !== "C"):
                handleButtonClick(e.key)
                break
            case e.key === "Enter": {
                handleButtonClick("=")
                break
            }
            case e.key === "*":
                handleOperatorClick("x")
                break
            case e.key === "Delete": {
                handleButtonClick("C")
                break
            }
            case e.key === "Backspace": {
                handleButtonClick("del")
                break
            }
            case e.key === "(":
                handleParenthesisPick("(")
                break
            case e.key === ")":
                handleParenthesisPick(")")
                break
            default:
                break
        }
    }

    const handleNumberClick = (number) => {
        if (displayResult === true) {
            setMathExpression(number)
            setDisplayExpression(number)
            setDisplayResult(false)
        } else if (lastDisplayChar === "%" || lastDisplayChar === ")") {
            setMathExpression(mathExpression + "*" + number)
            setDisplayExpression(displayExpression + number)
        } else {
            setMathExpression(mathExpression + number)
            setDisplayExpression(displayExpression + number)
        }
    }

    const handleClearClick = () => {
        setDisplayResult(false)
        if (mathExpression === "") {
            setDisplayExpression("")
            setMathExpression("")
            setHistoryExpression([])
        } else {
            setMathExpression("")
            setDisplayExpression("")
        }
    }

    const handleDeleteClick = () => {
        setDisplayResult(false)
        switch (true) {
            case Object.keys(numbers).includes(lastDisplayChar) &&
            (displayExpression[displayExpression.length - 2] === ")" || penultimateDisplayChar === "%"):
                setMathExpression(mathExpression.slice(0, mathExpression.length - 2))
                setDisplayExpression(displayExpression.slice(0, displayExpression.length - 1))
                break
            case Object.keys(parentheses).includes(lastDisplayChar)
            && (Object.keys(numbers).includes(penultimateDisplayChar)
                || penultimateDisplayChar === "%"
                || penultimateDisplayChar === ")") !== false:
                setMathExpression(mathExpression.slice(0,
                    mathExpression.length - parentheses[lastDisplayChar].length))
                setDisplayExpression(displayExpression.slice(0, displayExpression.length - 1))
                break
            case Object.keys(operators).includes(lastDisplayChar) :
                setMathExpression(mathExpression.slice(0,
                    mathExpression.length - operators[lastDisplayChar].length))
                setDisplayExpression(displayExpression.slice(0, displayExpression.length - 1))
                break
            default:
                setMathExpression(mathExpression.slice(0, mathExpression.length - 1))
                setDisplayExpression(displayExpression.slice(0, displayExpression.length - 1))
                break
        }
    }

    const handleOperatorClick = (sign) => {
        const activeOperator = sign
        const inactiveOperators = {...operators}
        delete inactiveOperators[activeOperator]

        setDisplayResult(false)
        if (activeOperator === "%") {
            if (numbers.includes(lastDisplayChar) || lastDisplayChar === ")") {
                let countDisplayParenthesis = 0
                let countMathParenthesis = 0

                for (let i = displayExpression.length - 1; i >= 0; i--) {
                    if (displayExpression[i] === ")") {
                        if ((numbers.includes(displayExpression[i + 1]) || displayExpression[i + 1] === "(")
                            && countDisplayParenthesis === 0) {
                            setDisplayExpression(displayExpression.slice(0, i + 1) + "("
                                + displayExpression.slice(i + 1) + activeOperator + ")")
                            break
                        } else {
                            countDisplayParenthesis++
                        }
                    } else if (displayExpression[i] === "(") {
                        countDisplayParenthesis--
                    } else if ((Object.keys(operators).includes(displayExpression[i])
                            || (numbers.includes(displayExpression[i]) && displayExpression[i + 1] === "("))
                        && countDisplayParenthesis === 0) {
                        setDisplayExpression(displayExpression.slice(0, i + 1) + "("
                            + displayExpression.slice(i + 1) + activeOperator + ")")
                        break
                    } else {
                        setDisplayExpression((displayExpression + activeOperator))
                    }
                }

                for (let i = mathExpression.length - 1; i >= 0; i--) {
                    if (mathExpression[i] === ")") {
                        countMathParenthesis++
                    } else if (mathExpression[i] === "(") {
                        countMathParenthesis--
                    } else if (Object.values(operators).filter(value => value !== "/100").includes(mathExpression[i]) && countMathParenthesis === 0) {
                        setMathExpression(mathExpression.slice(0, i + 1) + "(" + mathExpression.slice(i + 1) + operators[activeOperator] + ")")
                        break
                    } else {
                        setMathExpression(mathExpression + operators[activeOperator])
                    }
                }
            } else return null
        } else if (lastDisplayChar === activeOperator ||
            ((lastDisplayChar === "(" || displayExpression === "" || displayExpression === "-" || displayExpression === "+")
                && (activeOperator === "x" || activeOperator === "/"))) {
            return null
        } else if (Object.keys(inactiveOperators).includes(lastDisplayChar)
            && lastDisplayChar !== "%") {
            setMathExpression(mathExpression.slice(0, mathExpression.length - 1) + operators[activeOperator])
            setDisplayExpression((displayExpression.slice(0, displayExpression.length - 1) + activeOperator))
        } else {
            setMathExpression(mathExpression + operators[activeOperator])
            setDisplayExpression(displayExpression + activeOperator)
        }
    }

    const handleDotClick = () => {
        setDisplayResult(false)
        if (numbers.includes(lastDisplayChar)) {
            setMathExpression(mathExpression + ".")
            setDisplayExpression(displayExpression + ".")
        } else return null
    }

    const handleParenthesisClick = () => {
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

        leftParenthesis.addEventListener("click", ev => handleParenthesisPick(leftParenthesis.id))
        rightParenthesis.addEventListener("click", ev => handleParenthesisPick(rightParenthesis.id))
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

    const handleParenthesisPick = (sign) => {
        switch (sign) {
            case "(":
                setDisplayResult(false)
                if (numbers.includes(lastDisplayChar)
                    || lastDisplayChar === "%"
                    || lastDisplayChar === ")"
                ) {
                    setMathExpression(mathExpression + parentheses[sign])
                    setDisplayExpression(displayExpression + sign)
                } else {
                    setMathExpression(mathExpression + sign)
                    setDisplayExpression(displayExpression + sign)
                }
                break
            case ")":
                setDisplayResult(false)
                if ((Object.keys(operators).includes(lastDisplayChar)
                    && lastDisplayChar !== "%") || displayExpression.length < 1) {
                    return null
                } else {
                    setMathExpression(mathExpression + sign)
                    setDisplayExpression(displayExpression + sign)
                }
                break
            default:
                throw new Error("Unrecognized character, no action to perform")
        }
        document.getElementById("parenthesis").style.backgroundColor = buttonStyle.default.backgroundColor
        document.getElementById("parenthesis").style.border = `1px solid ${buttonStyle.default.backgroundColor}`
        document.getElementById("parenthesis").innerHTML = "( )"
    }

    const handleEqualsClick = () => {
        if (
            Object.keys(operators).some(operator => displayExpression.includes(operator))
            || Object.keys(parentheses).some(operator => displayExpression.includes(operator))
        ) {
            try {
                const result = Function('return ' + mathExpression)()
                const redundantPartOfResult = /[.]*0+$/

                setDisplayExpression(result.toFixed(8).toString().replace(redundantPartOfResult, ""))
                setMathExpression(result.toFixed(8).toString().replace(redundantPartOfResult, ""))
                setDisplayResult(true)

                if (historyExpression.length > 0) {
                    return historyExpression[0].result.includes("Error") ?
                        setHistoryExpression([{
                            expression: displayExpression,
                            result: result.toFixed(8).toString().replace(redundantPartOfResult, "")
                        }, ...historyExpression.slice(1)]) :
                        setHistoryExpression([{
                            expression: displayExpression,
                            result: result.toFixed(8).toString().replace(redundantPartOfResult, "")
                        }, ...historyExpression])
                } else return setHistoryExpression([{
                    expression: displayExpression,
                    result: result.toFixed(8).toString().replace(redundantPartOfResult, "")
                }, ...historyExpression])
            } catch (e) {
                if (historyExpression.length > 0) {
                    return historyExpression[0].result.includes("Error") ?
                        setHistoryExpression([{
                            expression: displayExpression,
                            result: "Expression Error"
                        }, ...historyExpression.slice(1)]) :
                        setHistoryExpression([{
                            expression: displayExpression,
                            result: "Expression Error"
                        }, ...historyExpression])
                } else return setHistoryExpression([{
                    expression: displayExpression,
                    result: "Expression Error"
                }, ...historyExpression])
            }
        }
    }

    const handleButtonClick = (buttonSign) => {
        switch (true) {
            case numbers.includes(buttonSign):
                handleNumberClick(buttonSign)
                break
            case Object.keys(operators).includes(buttonSign):
                handleOperatorClick(buttonSign)
                break
            case buttonSign === "C":
                handleClearClick()
                break
            case buttonSign === "del":
                handleDeleteClick()
                break
            case buttonSign === ".":
                handleDotClick()
                break
            case buttonSign === "( )":
                handleParenthesisClick()
                break
            case buttonSign === "=":
                handleEqualsClick()
                break
            default:
                throw new Error("Unrecognized character, no action to perform")
        }
    }

    return (
        <div id={"calculator"}>
            <Display historyExpression={historyExpression} displayExpression={displayExpression}/>
            <Buttons buttons={buttons} buttonStyle={setButtonStyle} onButtonClick={handleButtonClick}/>
        </div>
    )
}

export default App