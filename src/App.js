import {useState} from "react"

function App() {

    const [expression, setExpression] = useState("")
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

        const onOperatorClick = (sign) => {

            let activeOperator = ""
            if (sign === "X") {
                activeOperator = "x"
            } else activeOperator = sign

            const inactiveOperators = {...allOperators}
            delete inactiveOperators[activeOperator]

            setDisplayExpression(prevState => {
                    if (activeOperator === "%") {
                        if (allNumbers.includes(prevState.charAt(prevState.length - 1)) || prevState.charAt(prevState.length - 1) === ")") {
                            setExpression(prevState => prevState + allOperators[activeOperator])
                            return (prevState + activeOperator)
                        } else return prevState
                    } else if (prevState.charAt(prevState.length - 1) === activeOperator ||
                        ((prevState.charAt(prevState.length - 1) === "(") && (activeOperator === "x" || activeOperator === "/"))) {
                        setExpression(prevState => prevState)
                        return prevState
                    } else if (Object.keys(inactiveOperators).includes(prevState.charAt(prevState.length - 1)) && prevState.charAt(prevState.length - 1) !== "%") {
                        setExpression(prevState => prevState.slice(0, prevState.length - 1) + allOperators[activeOperator])
                        return (prevState.slice(0, prevState.length - 1) + activeOperator)
                    } else {
                        setExpression(prevState => prevState + allOperators[activeOperator])
                        return prevState + activeOperator
                    }
                }
            )
        }

        const onParenthesisClick = (target) => {
            switch (target.id) {
                case "(":
                    setDisplayExpression(prevState => {
                        if (allNumbers.includes(prevState.charAt(prevState.length - 1))
                            || prevState[prevState.length - 1] === "%"
                            || prevState[prevState.length - 1] === ")"
                        ) {
                            setExpression(prevState => prevState + parenthesis[target.id])
                            return prevState + target.id
                        } else {
                            setExpression(prevState => prevState + target.id)
                            return prevState + target.id
                        }
                    })
                    break
                case ")":
                    setDisplayExpression(prevState => {
                        if (Object.keys(allOperators).includes(prevState.charAt(prevState.length - 1))
                            && prevState[prevState.length - 1] !== "%") {
                            setExpression(prevState => prevState)
                            return prevState
                        } else {
                            setExpression(prevState => prevState + target.id)
                            return prevState + target.id
                        }
                    })
                    break
            }
            document.getElementById("parenthesis").innerText = "( )"
        }

        const onDotClick = () => {
            setDisplayExpression(prevState => {
                    if (allNumbers.includes(prevState.charAt(prevState.length - 1))) {
                        console.log("X")
                        setExpression(prevState => prevState + ".")
                        return prevState + "."
                    } else return prevState
                }
            )
        }

        const onButtonClick = (e) => {
            switch (e) {
                case "C":
                    if (expression === "") {
                        setDisplayExpression("")
                        setExpression("")
                        setHistoryExpression([])
                    } else {
                        setExpression("")
                        setDisplayExpression("")
                    }
                    break
                case "del":
                    setDisplayExpression(prevState => {
                            const lastChar = prevState[prevState.length - 1]

                            switch (true) {
                                case Object.keys(allNumbers).includes(lastChar) &&
                                (prevState[prevState.length - 2] === ")" || prevState[prevState.length - 2] === "%"):
                                    setExpression(prevState =>
                                        prevState.slice(0, prevState.length - 2))
                                    return prevState.slice(0, prevState.length - 1)
                                case Object.keys(parenthesis).includes(lastChar)
                                && (Object.keys(allNumbers).includes(prevState[prevState.length - 2])
                                    || prevState[prevState.length - 2] === "%"
                                    || prevState[prevState.length - 2] === ")") !== false:
                                    setExpression(prevState =>
                                        prevState.slice(0, prevState.length - parenthesis[lastChar].length))
                                    return prevState.slice(0, prevState.length - 1)
                                case Object.keys(allOperators).includes(lastChar) :
                                    setExpression(prevState =>
                                        prevState.slice(0, prevState.length - allOperators[lastChar].length))
                                    return prevState.slice(0, prevState.length - 1)
                                default:
                                    setExpression(prevState => prevState.slice(0, prevState.length - 1))
                                    return prevState.slice(0, prevState.length - 1)
                            }
                        }
                    )
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
                    setDisplayExpression(prevState => {
                            if (prevState[prevState.length - 1] === "%" || prevState[prevState.length - 1] === ")") {
                                setExpression(prevState => prevState + "*" + e)
                                return prevState + e
                            } else {
                                setExpression(prevState => prevState + e)
                                return prevState + e
                            }
                        }
                    )
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
                        setExpression(prevExpressionState => {
                                try {
                                    const result = Function('return ' + prevExpressionState)()
                                    const redundantPartOfResult = /[.]*0+$/
                                    setDisplayExpression(prevDisplayExpressionState => {
                                            setHistoryExpression(prevHistoryState => {
                                                if (prevHistoryState.length > 0) {
                                                    return prevHistoryState[0].result.includes("Error") ?
                                                        [{
                                                            historyExpression: prevDisplayExpressionState,
                                                            result: result.toFixed(8).toString().replace(redundantPartOfResult, "")
                                                        }, ...prevHistoryState.slice(1)] :
                                                        [{
                                                            historyExpression: prevDisplayExpressionState,
                                                            result: result.toFixed(8).toString().replace(redundantPartOfResult, "")
                                                        }, ...prevHistoryState]
                                                } else return [{
                                                    historyExpression: prevDisplayExpressionState,
                                                    result: result.toFixed(8).toString().replace(redundantPartOfResult, "")
                                                }, ...prevHistoryState]
                                            })
                                            return result.toFixed(8).toString().replace(redundantPartOfResult, "")
                                        }
                                    )
                                    return result.toFixed(8).toString().replace(redundantPartOfResult, "")
                                } catch (e) {
                                    setDisplayExpression(prevDisplayExpressionState => {
                                        setHistoryExpression(prevHistoryState => {
                                            if (prevHistoryState.length > 0) {
                                                return prevHistoryState[0].result.includes("Error") ?
                                                    [{
                                                        historyExpression: prevDisplayExpressionState,
                                                        result: "Expression Error"
                                                    }, ...prevHistoryState.slice(1)] :
                                                    [{
                                                        historyExpression: prevDisplayExpressionState,
                                                        result: "Expression Error"
                                                    }, ...prevHistoryState]
                                            } else return [{
                                                historyExpression: prevDisplayExpressionState,
                                                result: "Expression Error"
                                            }, ...prevHistoryState]
                                        })
                                        return prevDisplayExpressionState
                                    })
                                    return prevExpressionState
                                }
                            }
                        )
                    } else break
                default:
                    break
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