import {numbers, operators, parentheses} from "../data/buttonsCollection"

const handleDeleteClick = (penultimateDisplayChar, lastDisplayChar, displayExpression, setDisplayExpression,
                           mathExpression, setMathExpression, setDisplayResult) => {
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

export default handleDeleteClick