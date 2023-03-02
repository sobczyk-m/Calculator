import {numbers, operators, parentheses} from "../data/buttonsCollection"
import buttonStyle from "../data/buttonStyle"

const handleParenthesisPick = (sign, lastDisplayChar, displayExpression, setDisplayExpression, mathExpression,
                               setMathExpression, setDisplayResult) => {
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

export default handleParenthesisPick