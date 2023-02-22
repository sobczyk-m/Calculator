import {useEffect, useState} from "react"

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

    const buttons = [
        {"name": "clear", "sign": "C"}, {"name": "delete", "sign": "del"}, {"name": "percent", "sign": "%"},
        {"name": "divide", "sign": "/"}, {"name": "seven", "sign": "7"}, {"name": "eight", "sign": "8"},
        {"name": "nine", "sign": "9"}, {"name": "multiply", "sign": "x"}, {"name": "four", "sign": "4"},
        {"name": "five", "sign": "5"}, {"name": "six", "sign": "6"}, {"name": "subtract", "sign": "-"},
        {"name": "one", "sign": "1"}, {"name": "two", "sign": "2"}, {"name": "three", "sign": "3"},
        {"name": "add", "sign": "+"}, {"name": "zero", "sign": "0"}, {"name": "decimal", "sign": "."},
        {"name": "parenthesis", "sign": "( )"}, {"name": "equals", "sign": "="},
    ]

    const allNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    const allOperators = {
        "x": "*",
        "/": "/",
        "%": "/100",
        "+": "+",
        "-": "-"
    }
    const parenthesis = {
        "(": "*(",
        ")": ")",
    }

    const lastDisplayChar = displayExpression[displayExpression.length - 1]
    const penultimateDisplayChar = displayExpression[displayExpression.length - 2]

    const buttonStyle = {
        operator: {backgroundColor: "#4f5d75"},
        undo: {backgroundColor: "#a4161a"},
        equals: {backgroundColor: "#cf9521"},
        default: {backgroundColor: "#333533"}
    }

    const historyResultStyle = {
        correct: {"color": "#ffa500"},
        incorrect: {"color": "red"}
    }

    const handleKeyDown = (e) => {
        console.log(e.key)
        switch (true) {
            case buttons.some(value => value.sign === e.key && e.key !== "x" && e.key !== "C"):
                onButtonClick(e.key)
                break
            case e.key === "Enter": {
                onButtonClick("=")
                break
            }
            case e.key === "*":
                onOperatorClick("x")
                break
            case e.key === "Delete": {
                onButtonClick("C")
                break
            }
            case e.key === "Backspace": {
                onButtonClick("del")
                break
            }
            case e.key === "(":
                onParenthesisPick("(")
                break
            case e.key === ")":
                onParenthesisPick(")")
                break
            default:
                break
        }
    }

    const onNumberClick = (number) => {
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

    const onClearClick = () => {
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

    const onDeleteClick = () => {
        setDisplayResult(false)
        switch (true) {
            case Object.keys(allNumbers).includes(lastDisplayChar) &&
            (displayExpression[displayExpression.length - 2] === ")" || penultimateDisplayChar === "%"):
                setMathExpression(mathExpression.slice(0, mathExpression.length - 2))
                setDisplayExpression(displayExpression.slice(0, displayExpression.length - 1))
                break
            case Object.keys(parenthesis).includes(lastDisplayChar)
            && (Object.keys(allNumbers).includes(penultimateDisplayChar)
                || penultimateDisplayChar === "%"
                || penultimateDisplayChar === ")") !== false:
                setMathExpression(mathExpression.slice(0,
                    mathExpression.length - parenthesis[lastDisplayChar].length))
                setDisplayExpression(displayExpression.slice(0, displayExpression.length - 1))
                break
            case Object.keys(allOperators).includes(lastDisplayChar) :
                setMathExpression(mathExpression.slice(0,
                    mathExpression.length - allOperators[lastDisplayChar].length))
                setDisplayExpression(displayExpression.slice(0, displayExpression.length - 1))
                break
            default:
                setMathExpression(mathExpression.slice(0, mathExpression.length - 1))
                setDisplayExpression(displayExpression.slice(0, displayExpression.length - 1))
                break
        }
    }

    const onOperatorClick = (sign) => {
        const activeOperator = sign
        const inactiveOperators = {...allOperators}
        delete inactiveOperators[activeOperator]

        setDisplayResult(false)
        if (activeOperator === "%") {
            if (allNumbers.includes(lastDisplayChar) || lastDisplayChar === ")") {
                setMathExpression(mathExpression + allOperators[activeOperator])
                setDisplayExpression((displayExpression + activeOperator))
            } else return null
        } else if (lastDisplayChar === activeOperator ||
            ((lastDisplayChar === "(" || displayExpression === "" || displayExpression === "-" || displayExpression === "+")
                && (activeOperator === "x" || activeOperator === "/"))) {
            return null
        } else if (Object.keys(inactiveOperators).includes(lastDisplayChar)
            && lastDisplayChar !== "%") {
            setMathExpression(mathExpression.slice(0, mathExpression.length - 1) + allOperators[activeOperator])
            setDisplayExpression((displayExpression.slice(0, displayExpression.length - 1) + activeOperator))
        } else {
            setMathExpression(mathExpression + allOperators[activeOperator])
            setDisplayExpression(displayExpression + activeOperator)
        }
    }

    const onDotClick = () => {
        setDisplayResult(false)
        if (allNumbers.includes(lastDisplayChar)) {
            setMathExpression(mathExpression + ".")
            setDisplayExpression(displayExpression + ".")
        } else return null
    }

    const onParenthesisClick = () => {
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

        leftParenthesis.addEventListener("click", ev => onParenthesisPick(leftParenthesis.id))
        rightParenthesis.addEventListener("click", ev => onParenthesisPick(rightParenthesis.id))
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

    const onParenthesisPick = (sign) => {
        switch (sign) {
            case "(":
                setDisplayResult(false)
                if (allNumbers.includes(lastDisplayChar)
                    || lastDisplayChar === "%"
                    || lastDisplayChar === ")"
                ) {
                    setMathExpression(mathExpression + parenthesis[sign])
                    setDisplayExpression(displayExpression + sign)
                } else {
                    setMathExpression(mathExpression + sign)
                    setDisplayExpression(displayExpression + sign)
                }
                break
            case ")":
                setDisplayResult(false)
                if ((Object.keys(allOperators).includes(lastDisplayChar)
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
        document.getElementById("parenthesis").innerText = "( )"
    }

    const onEqualsClick = () => {
        if (
            Object.keys(allOperators).some(operator => displayExpression.includes(operator))
            || Object.keys(parenthesis).some(operator => displayExpression.includes(operator))
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
                            historyExpression: displayExpression,
                            result: result.toFixed(8).toString().replace(redundantPartOfResult, "")
                        }, ...historyExpression.slice(1)]) :
                        setHistoryExpression([{
                            historyExpression: displayExpression,
                            result: result.toFixed(8).toString().replace(redundantPartOfResult, "")
                        }, ...historyExpression])
                } else return setHistoryExpression([{
                    historyExpression: displayExpression,
                    result: result.toFixed(8).toString().replace(redundantPartOfResult, "")
                }, ...historyExpression])
            } catch (e) {
                if (historyExpression.length > 0) {
                    return historyExpression[0].result.includes("Error") ?
                        setHistoryExpression([{
                            historyExpression: displayExpression,
                            result: "Expression Error"
                        }, ...historyExpression.slice(1)]) :
                        setHistoryExpression([{
                            historyExpression: displayExpression,
                            result: "Expression Error"
                        }, ...historyExpression])
                } else return setHistoryExpression([{
                    historyExpression: displayExpression,
                    result: "Expression Error"
                }, ...historyExpression])
            }
        }
    }

    const onButtonClick = (buttonSign) => {
        switch (true) {
            case allNumbers.includes(buttonSign):
                onNumberClick(buttonSign)
                break
            case Object.keys(allOperators).includes(buttonSign):
                onOperatorClick(buttonSign)
                break
            case buttonSign === "C":
                onClearClick()
                break
            case buttonSign === "del":
                onDeleteClick()
                break
            case buttonSign === ".":
                onDotClick()
                break
            case buttonSign === "( )":
                onParenthesisClick()
                break
            case buttonSign === "=":
                onEqualsClick()
                break
            default:
                throw new Error("Unrecognized character, no action to perform")
        }
    }

    const createButton = () => {

        const setButtonStyle = (sign) => {
            switch (true) {
                case Object.keys(allOperators).includes(sign):
                    return buttonStyle.operator
                case sign === "C" || sign === "del":
                    return buttonStyle.undo
                case sign === "=":
                    return buttonStyle.equals
                default:
                    return buttonStyle.default
            }
        }

        return buttons.map(button => <div id={button.name} key={button.name} className={"button"}
                                          style={setButtonStyle(button.sign)}
                                          onClick={() => onButtonClick(button.sign)}>{button.sign}</div>)
    }

    const createHistoryExpression = () => {
        return historyExpression.map(ele =>
            <div className={"historyCalculationWrapper"} key={historyExpression.indexOf(ele)}>
                <span>{ele.historyExpression}</span>
                <span>{"="}</span>
                <span style={ele.result.includes("Error") ?
                    historyResultStyle.incorrect : historyResultStyle.correct}>{ele.result}</span>
            </div>)
    }

    return (
        <div id={"calculator"}>
            <div id={"display"}>
                <div id={"historyExpressionContainer"}>{createHistoryExpression()}</div>
                <div id={"expressionContainer"} data-testid={"displayExpression"}><span>{displayExpression}</span></div>
            </div>
            <div id={"buttons-container"}>
                {createButton()}
            </div>
        </div>
    )
}

export default App