import App from "../App"
import {render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const allNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
const allOperators = {
    "x": "*",
    "/": "/",
    "%": "/100",
    "+": "+",
    "-": "-"
}

describe("<App/>", () => {

    describe("displayExpression is empty string", () => {
        describe("Buttons not able to change displayExpression", () => {
                it.each(Object.keys(allOperators).filter(operator => operator !== "+" && operator !== "-").concat(["."]))
                ("button '%s' should not change displayExpression", async (btnText) => {
                    render(<App/>)
                    expect(screen.getByTestId("displayExpression").textContent).toStrictEqual("")
                    await userEvent.click(screen.getByText(btnText))
                    expect(screen.getByTestId("displayExpression").textContent).toStrictEqual("")
                })

                it("button ')' should not change displayExpression", async () => {
                    render(<App/>)
                    expect(screen.getByTestId("displayExpression").textContent).toStrictEqual("")
                    await userEvent.click(screen.getByText("( )"))
                    const rightParenthesis = await screen.findByText(')')
                    expect(rightParenthesis).toBeInTheDocument()
                    await userEvent.click(rightParenthesis)
                    expect(screen.getByTestId("displayExpression").textContent).toStrictEqual("")
                })
            }
        )

        describe("Buttons able to change displayExpression", () => {
                it.each(allNumbers.concat(["-", "+"]))
                ("button '%s' should change displayExpression", async (btnText) => {
                    render(<App/>)
                    expect(screen.getByTestId("displayExpression").textContent).toStrictEqual("")
                    await userEvent.click(screen.getByText(btnText))
                    expect(screen.getByTestId("displayExpression").textContent).toStrictEqual(btnText)
                })

                it("button '(' should change displayExpression", async () => {
                    render(<App/>)
                    expect(screen.getByTestId("displayExpression").textContent).toStrictEqual("")
                    await userEvent.click(screen.getByText("( )"))
                    const leftParenthesis = await screen.findByText('(')
                    expect(leftParenthesis).toBeInTheDocument()
                    await userEvent.click(leftParenthesis)
                    expect(screen.getByTestId("displayExpression").textContent).toStrictEqual(leftParenthesis.textContent)
                })
            }
        )
    })
})