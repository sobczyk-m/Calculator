const handleNumberClick = (number, lastDisplayChar, displayExpression, setDisplayExpression, mathExpression, setMathExpression,
                           displayResult, setDisplayResult) => {
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

export default handleNumberClick