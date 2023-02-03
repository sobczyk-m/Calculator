function App() {

    const createButton = () => {

        const buttons = [
            {"name": "clear", "sign": "C"}, {"name": "percent", "sign": "%"}, {"name": "delete", "sign": "del"},
            {"name": "divide", "sign": "/"}, {"name": "seven", "sign": "7"}, {"name": "eight", "sign": "8"},
            {"name": "nine", "sign": "9"}, {"name": "multiply", "sign": "X"}, {"name": "four", "sign": "4"},
            {"name": "five", "sign": "5"}, {"name": "six", "sign": "6"}, {"name": "subtract", "sign": "-"},
            {"name": "one", "sign": "1"}, {"name": "two", "sign": "2"}, {"name": "three", "sign": "3"},
            {"name": "add", "sign": "+"}, {"name": "zero", "sign": "0"}, {"name": "decimal", "sign": "."},
            {"name": "parenthesis", "sign": "( )"}, {"name": "equals", "sign": "="},
        ]

        return buttons.map(button => <div id={button.name} className={"button"}>{button.sign}</div>)
    }

    return (
        <div id={"calculator"}>
            <div id={"display"}></div>
            <div id={"buttons-container"}>
                {createButton()}
            </div>
        </div>
    )
}

export default App