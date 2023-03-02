import Equation from "./Equation"

function Display(props) {
    const {historyExpression, displayExpression} = props

    return (
        <div id={"display"}>
            <div id={"historyExpressionContainer"}
                 data-testid="historyExpressionContainer"><Equation equationsList={historyExpression}/></div>
            <div id={"expressionContainer"}><span data-testid="displayExpression">{displayExpression}</span>
            </div>
        </div>
    )
}

export default Display