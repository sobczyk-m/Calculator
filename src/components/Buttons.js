function Buttons(props) {

    const createButton = () => {
        return props.buttons.map(button => <div id={button.name} key={button.name} className={"button"}
                                                style={props.buttonStyle(button.sign)}
                                                onClick={() => props.onButtonClick(button.sign)}>{button.sign}</div>)
    }

    return (
        <div id={"buttons-container"}>{createButton()}</div>)
}

export default Buttons