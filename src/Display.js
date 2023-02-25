function Display(props) {

    return (
        <div id={"display"}>
            <div id={"historyExpressionContainer"}
                 data-testid="historyExpressionContainer">{props.historyExpression}</div>
            <div id={"expressionContainer"}><span data-testid="displayExpression">{props.displayExpression}</span>
            </div>
        </div>
    )
}

export default Display