import {useEffect, useState} from "react"
import Display from "./Display"
import Buttons from "./Buttons"
import {buttons, numbers, operators} from "../buttonsCollection"
import handleNumberClick from "../utils/handleNumberClick"
import handleOperatorClick from "../utils/handleOperatorClick"
import handleClearClick from "../utils/handleClearClick"
import handleDeleteClick from "../utils/handleDeleteClick"
import handleDotClick from "../utils/handleDotClick"
import buttonStyle from "../buttonStyle"
import handleParenthesisPick from "../utils/handleParenthesisPick"
import handleParenthesisClick from "../utils/handleParenthesisClick"
import handleEqualsClick from "../utils/handleEqualsClick"

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
        switch (true) {
            case buttons.some(value => value.sign === e.key && e.key !== "x" && e.key !== "C"):
                handleButtonClick(e.key)
                break
            case e.key === "Enter": {
                handleEqualsClick(displayExpression, setDisplayExpression, mathExpression,
                    setMathExpression, historyExpression, setHistoryExpression, setDisplayResult)
                break
            }
            case e.key === "*":
                handleOperatorClick("x", lastDisplayChar, displayExpression, setDisplayExpression, mathExpression, setMathExpression,
                    displayResult, setDisplayResult)
                break
            case e.key === "Delete": {
                handleClearClick(setDisplayResult, setDisplayExpression, mathExpression, setMathExpression,
                    setHistoryExpression)
                break
            }
            case e.key === "Backspace": {
                handleDeleteClick(penultimateDisplayChar, lastDisplayChar, displayExpression, setDisplayExpression,
                    mathExpression, setMathExpression, setDisplayResult)
                break
            }
            case e.key === "(":
                handleParenthesisPick("(", lastDisplayChar, displayExpression, setDisplayExpression,
                    mathExpression, setMathExpression, setDisplayResult)
                break
            case e.key === ")":
                handleParenthesisPick(")", lastDisplayChar, displayExpression, setDisplayExpression,
                    mathExpression, setMathExpression, setDisplayResult)
                break
            default:
                break
        }
    }

    const handleButtonClick = (buttonSign) => {
        switch (true) {
            case numbers.includes(buttonSign):
                handleNumberClick(buttonSign, lastDisplayChar, displayExpression, setDisplayExpression, mathExpression,
                    setMathExpression, displayResult, setDisplayResult)
                break
            case Object.keys(operators).includes(buttonSign):
                handleOperatorClick(buttonSign, lastDisplayChar, displayExpression, setDisplayExpression, mathExpression,
                    setMathExpression, displayResult, setDisplayResult)
                break
            case buttonSign === "C":
                handleClearClick(setDisplayResult, setDisplayExpression, mathExpression, setMathExpression,
                    setHistoryExpression)
                break
            case buttonSign === "del":
                handleDeleteClick(penultimateDisplayChar, lastDisplayChar, displayExpression, setDisplayExpression,
                    mathExpression, setMathExpression, setDisplayResult)
                break
            case buttonSign === ".":
                handleDotClick(lastDisplayChar, displayExpression, setDisplayExpression, mathExpression, setMathExpression,
                    setDisplayResult)
                break
            case buttonSign === "( )":
                handleParenthesisClick(lastDisplayChar, displayExpression, setDisplayExpression,
                    mathExpression, setMathExpression, setDisplayResult)
                break
            case buttonSign === "=":
                handleEqualsClick(displayExpression, setDisplayExpression, mathExpression,
                    setMathExpression, historyExpression, setHistoryExpression, setDisplayResult)
                break
            default:
                throw new Error("Unrecognized character, no action to perform")
        }
    }

    return (
        <div id={"calculator"}>
            <Display historyExpression={historyExpression}
                     displayExpression={displayExpression}/>
            <Buttons buttons={buttons} buttonStyle={setButtonStyle} onButtonClick={handleButtonClick}/>
        </div>
    )
}

export default App