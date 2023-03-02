import {numbers, operators} from "../data/buttonsCollection"

const handleOperatorClick = (sign, lastDisplayChar, displayExpression, setDisplayExpression, mathExpression, setMathExpression,
                             displayResult, setDisplayResult) => {
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

export default handleOperatorClick