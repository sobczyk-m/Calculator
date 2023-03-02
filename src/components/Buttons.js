function Buttons(props) {
    const {buttons, buttonStyle, onButtonClick} = props

    const createButton = () => {
        return buttons.map(button => <div id={button.name} key={button.name} className={"button"}
                                          style={buttonStyle(button.sign)}
                                          onClick={() => onButtonClick(button.sign)}>{button.sign}</div>)
    }

    return (
        <div id={"buttons-container"}>{createButton()}</div>
    )
}

export default Buttons