import {numbers} from "../buttonsCollection"

const handleDotClick = (lastDisplayChar, displayExpression, setDisplayExpression, mathExpression, setMathExpression,
                        setDisplayResult) => {
    setDisplayResult(false)
    if (numbers.includes(lastDisplayChar)) {
        setMathExpression(mathExpression + ".")
        setDisplayExpression(displayExpression + ".")
    } else return null
}

export default handleDotClick