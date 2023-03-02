import {operators, parentheses} from "../data/buttonsCollection"

const handleEqualsClick = (displayExpression, setDisplayExpression, mathExpression,
                           setMathExpression, historyExpression, setHistoryExpression, setDisplayResult) => {
    if (
        Object.keys(operators).some(operator => displayExpression.includes(operator))
        || Object.keys(parentheses).some(operator => displayExpression.includes(operator))
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
                        expression: displayExpression,
                        result: result.toFixed(8).toString().replace(redundantPartOfResult, "")
                    }, ...historyExpression.slice(1)]) :
                    setHistoryExpression([{
                        expression: displayExpression,
                        result: result.toFixed(8).toString().replace(redundantPartOfResult, "")
                    }, ...historyExpression])
            } else return setHistoryExpression([{
                expression: displayExpression,
                result: result.toFixed(8).toString().replace(redundantPartOfResult, "")
            }, ...historyExpression])
        } catch (e) {
            if (historyExpression.length > 0) {
                return historyExpression[0].result.includes("Error") ?
                    setHistoryExpression([{
                        expression: displayExpression,
                        result: "Expression Error"
                    }, ...historyExpression.slice(1)]) :
                    setHistoryExpression([{
                        expression: displayExpression,
                        result: "Expression Error"
                    }, ...historyExpression])
            } else return setHistoryExpression([{
                expression: displayExpression,
                result: "Expression Error"
            }, ...historyExpression])
        }
    }
}

export default handleEqualsClick