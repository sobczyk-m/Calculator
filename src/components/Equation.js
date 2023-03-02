const historyResultStyle = {
    correct: {"color": "#ffa500"},
    incorrect: {"color": "red"}
}

function Equation(props) {
    const {equationsList} = props

    return equationsList.map((equation, index) =>
        <div className={"historyCalculationWrapper"} key={index}>
            <span data-testid={"historyExpression #" + index}>{equation.expression}</span>
            <span>{"="}</span>
            <span data-testid={"result #" + index} style={equation.result.includes("Error") ?
                historyResultStyle.incorrect : historyResultStyle.correct}>{equation.result}</span>
        </div>)
}

export default Equation