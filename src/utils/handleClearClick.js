const handleClearClick = (setDisplayResult, setDisplayExpression, mathExpression, setMathExpression, setHistoryExpression) => {
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

export default handleClearClick