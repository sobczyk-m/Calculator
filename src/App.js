import {useState} from "react"

function App() {

    const [expression, setExpression] = useState("")
    const [displayExpression, setDisplayExpression] = useState("")
    const [historyExpression, setHistoryExpression] = useState([])

    const onOperatorClick = (sign) => {
        let activeOperator = ""
        if (sign === "X") {
            activeOperator = "x"
        } else activeOperator = sign

        setDisplayExpression(prevState => {

                const allNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
                const allOperators = {
                    "x": "*",
                    "/": "/",
                    "%": "/100",
                    "+": "+",
                    "-": "-"
                }
                delete allOperators[sign]

                if (activeOperator === "%") {
                    if (allNumbers.includes(prevState.charAt(prevState.length - 1))) {
                        setExpression(prevState + allOperators[activeOperator])
                        return (prevState + activeOperator)
                    } else return prevState
                } else if (Object.keys(allOperators).includes(prevState.charAt(prevState.length - 1)) && prevState.charAt(prevState.length - 1) !== "%") {
                    setExpression(prevState.slice(0, prevState.length - 1) + allOperators[activeOperator])
                    return (prevState.slice(0, prevState.length - 1) + activeOperator)
                } else if (prevState.charAt(prevState.length - 1) === activeOperator) {
                    setExpression(prevState)
                    return prevState
                } else {
                    setExpression(prevState + allOperators[activeOperator])
                    return prevState + activeOperator
                }
            }
        )
    }

    const onParenthesisClick = (target) => {

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

        switch (target.id) {
            case "(":
                setDisplayExpression(prevState => {
                    if (allNumbers.includes(prevState.charAt(prevState.length - 1))) {
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
                    if (Object.keys(allOperators).includes(prevState.charAt(prevState.length - 1))) {
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

        const onButtonClick = (e) => {
            switch (e) {
                case "C":
                    setDisplayExpression("")
                    setExpression("")
                    break
                case "del":
                    setDisplayExpression(prevState => prevState.slice(0, prevState.length - 1))
                    setExpression(prevState => prevState.slice(0, prevState.length - 1))
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
                    setDisplayExpression(prevState => prevState + e)
                    setExpression(prevState => prevState + e)
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
                default:
                    break
            }
        }

        return buttons.map(button => <button id={button.name} className={"button"}
                                             onClick={() => onButtonClick(button.sign)}>{button.sign}</button>)
    }

    return (
        <div id={"calculator"}>
            <div id={"display"}><p>{displayExpression}</p></div>
            <div id={"buttons-container"}>
                {createButton()}
            </div>
        </div>
    )
}

export default App