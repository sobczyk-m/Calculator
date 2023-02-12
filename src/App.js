import {useState} from "react"

function App() {

    const [mathExpression, setMathExpression] = useState("")
    const [displayExpression, setDisplayExpression] = useState("")
    const [historyExpression, setHistoryExpression] = useState([])

    const createButton = () => {

        const buttons = [
            {"name": "clear", "sign": "C"}, {"name": "percent", "sign": "%"}, {"name": "delete", "sign": "del"},
            {"name": "divide", "sign": "/"}, {"name": "seven", "sign": "7"}, {"name": "eight", "sign": "8"},
            {"name": "nine", "sign": "9"}, {"name": "multiply", "sign": "X"}, {"name": "four", "sign": "4"},
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

        const onOperatorClick = (sign) => {

            let activeOperator = ""
            if (sign === "X") {
                activeOperator = "x"
            } else activeOperator = sign

            const inactiveOperators = {...allOperators}
            delete inactiveOperators[activeOperator]

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

        const onParenthesisClick = (target) => {
            switch (target.id) {
                case "(":
                    if (allNumbers.includes(lastDisplayChar)
                        || lastDisplayChar === "%"
                        || lastDisplayChar === ")"
                    ) {
                        setMathExpression(mathExpression + parenthesis[target.id])
                        setDisplayExpression(displayExpression + target.id)
                    } else {
                        setMathExpression(mathExpression + target.id)
                        setDisplayExpression(displayExpression + target.id)
                    }
                    break
                case ")":
                    if (Object.keys(allOperators).includes(lastDisplayChar)
                        && lastDisplayChar !== "%") {
                        return null
                    } else {
                        setMathExpression(mathExpression + target.id)
                        setDisplayExpression(displayExpression + target.id)
                    }
                    break
                default:
                    throw new Error("Unrecognized character, no action to perform")
            }
            document.getElementById("parenthesis").innerText = "( )"
        }

        const onDotClick = () => {
            if (allNumbers.includes(lastDisplayChar)) {
                console.log("X")
                setMathExpression(mathExpression + ".")
                setDisplayExpression(displayExpression + ".")
            } else return null
        }

        const onButtonClick = (e) => {
            switch (e) {
                case "C":
                    if (mathExpression === "") {
                        setDisplayExpression("")
                        setMathExpression("")
                        setHistoryExpression([])
                    } else {
                        setMathExpression("")
                        setDisplayExpression("")
                    }
                    break
                case "del":
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
                    break
                case "0":
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                    if (lastDisplayChar === "%" || lastDisplayChar === ")") {
                        setMathExpression(mathExpression + "*" + e)
                        setDisplayExpression(displayExpression + e)
                    } else {
                        setMathExpression(mathExpression + e)
                        setDisplayExpression(displayExpression + e)
                    }
                    break
                case "X":
                    onOperatorClick("X")
                    break
                case "/":
                    onOperatorClick("/")
                    break
                case "%":
                    onOperatorClick("%")
                    break
                case "+":
                    onOperatorClick("+")
                    break
                case "-":
                    onOperatorClick("-")
                    break
                case "( )":
                    const leftParenthesis = document.createElement("button")
                    const rightParenthesis = document.createElement("button")

                    leftParenthesis.id = "("
                    leftParenthesis.innerText = "("

                    rightParenthesis.id = ")"
                    rightParenthesis.innerText = ")"

                    leftParenthesis.style.width = "50%"
                    rightParenthesis.style.width = "50%"
                    leftParenthesis.style.height = "100%"
                    rightParenthesis.style.height = "100%"

                    leftParenthesis.addEventListener("click", ev => onParenthesisClick(ev.currentTarget))
                    rightParenthesis.addEventListener("click", ev => onParenthesisClick(ev.currentTarget))

                    document.getElementById("parenthesis").innerText = ""
                    document.getElementById("parenthesis").append(leftParenthesis)
                    document.getElementById("parenthesis").append(rightParenthesis)

                    document.getElementById("parenthesis").onmouseleave =
                        () => {
                            document.getElementById("parenthesis").innerText = "( )"
                        }
                    break
                case ".":
                    onDotClick()
                    break
                case "=":
                    if (
                        Object.keys(allOperators).some(operator => displayExpression.includes(operator))
                        || Object.keys(parenthesis).some(operator => displayExpression.includes(operator))
                    ) {
                        try {
                            const result = Function('return ' + mathExpression)()
                            const redundantPartOfResult = /[.]*0+$/

                            setDisplayExpression(result.toFixed(8).toString().replace(redundantPartOfResult, ""))
                            setMathExpression(result.toFixed(8).toString().replace(redundantPartOfResult, ""))
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
                    } else break
                default:
                    throw new Error("Unrecognized character, no action to perform")
            }
        }

        return buttons.map(button => <button id={button.name} key={button.name} className={"button"}
                                             onClick={() => onButtonClick(button.sign)}>{button.sign}</button>)
    }

    const correctHistoryResultStyle = {"color": "blue"}
    const incorrectHistoryResultStyle = {"color": "red"}

    const createHistoryExpression = () => {
        return historyExpression.map(ele =>
            <div className={"historyCalculationWrapper"} key={historyExpression.indexOf(ele)}>
                <span>{ele.historyExpression}</span>
                <span>{"="}</span>
                <span style={ele.result.includes("Error") ?
                    incorrectHistoryResultStyle : correctHistoryResultStyle}>{ele.result}</span>
            </div>)
    }

    return (
        <div id={"calculator"}>
            <div id={"display"}>
                <div id={"historyExpressionContainer"}>{createHistoryExpression()}</div>
                <div id={"expressionContainer"}><span>{displayExpression}</span></div>
            </div>
            <div id={"buttons-container"}>
                {createButton()}
            </div>
        </div>
    )
}

export default App