import App from "../App"
import {render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {numbers, operators, parentheses} from "../buttonsCollection"

describe("<App/>", () => {
    describe("displayExpression is empty string", () => {

        describe("Buttons not able to change displayExpression", () => {
                it.each(Object.keys(operators).filter(operator => operator !== "+" && operator !== "-").concat(["."]))
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
                it.each(numbers.concat(["-", "+"]))
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

    describe("lastIndex of displayExpression is operator", () => {
        const reducedOperators = Object.keys(operators).filter(operator => operator !== "%")

        it.each(reducedOperators)
        ("button '%s' should replace lastIndex", async (activeOperator) => {
            render(<App/>)
            await userEvent.click(screen.getByText("1"))
            for (let i = 0; i < reducedOperators.length; i++) {
                await userEvent.click(screen.getByText(reducedOperators[i]))
                expect(screen.getByTestId("displayExpression").textContent).toStrictEqual("1" + reducedOperators[i])
                await userEvent.click(screen.getByText(activeOperator))
                expect(screen.getByTestId("displayExpression").textContent).toStrictEqual("1" + activeOperator)
            }
        })

        it("button '%' should not replace lastIndex", async () => {
            render(<App/>)
            await userEvent.click(screen.getByText("1"))
            for (let i = 0; i < reducedOperators.length; i++) {
                await userEvent.click(screen.getByText(reducedOperators[i]))
                expect(screen.getByTestId("displayExpression").textContent).toStrictEqual("1" + reducedOperators[i])
                await userEvent.click(screen.getByText("%"))
                expect(screen.getByTestId("displayExpression").textContent).toStrictEqual("1" + reducedOperators[i])
            }
        })

        it("button '.' should not replace lastIndex", async () => {
            render(<App/>)
            await userEvent.click(screen.getByText("1"))
            for (let i = 0; i < reducedOperators.length; i++) {
                await userEvent.click(screen.getByText(reducedOperators[i]))
                expect(screen.getByTestId("displayExpression").textContent).toStrictEqual("1" + reducedOperators[i])
                await userEvent.click(screen.getByText("."))
                expect(screen.getByTestId("displayExpression").textContent).toStrictEqual("1" + reducedOperators[i])
            }
        })
    })

    describe("delete button", () => {
        it.each(Object.keys(operators).concat("."))
        ("should delete %s", async (sign) => {
            render(<App/>)
            await userEvent.click(screen.getByText("1"))
            await userEvent.click(screen.getByText(sign))
            expect(screen.getByTestId("displayExpression").textContent).toStrictEqual("1" + sign)
            await userEvent.click(screen.getByText("del"))
            expect(screen.getByTestId("displayExpression").textContent).toStrictEqual("1")
        })

        it.each(numbers)
        ("should delete %s", async (number) => {
            render(<App/>)
            await userEvent.click(screen.getByText(number))
            expect(screen.getByTestId("displayExpression").textContent).toStrictEqual(number)
            await userEvent.click(screen.getByText("del"))
            expect(screen.getByTestId("displayExpression").textContent).toStrictEqual("")
        })

        it.each(Object.keys(parentheses))
        ("should delete %s", async (parenthesis) => {
            render(<App/>)
            await userEvent.click(screen.getByText("1"))
            await userEvent.click(screen.getByText("( )"))
            const parenthesisButton = await screen.findByText(parenthesis)
            expect(parenthesisButton).toBeInTheDocument()
            await userEvent.click(parenthesisButton)
            await userEvent.click(screen.getByText("del"))
            expect(screen.getByTestId("displayExpression").textContent).toStrictEqual("1")

        })
    })

    describe("clear button", () => {
        describe("displayExpression", () => {
            it('should be empty String after one click', async () => {
                render(<App/>)
                expect(screen.getByTestId("displayExpression").textContent).toStrictEqual("")

                await userEvent.click(screen.getByText("1"))
                await userEvent.click(screen.getByText("x"))
                await userEvent.click(screen.getByText("4"))
                await userEvent.click(screen.getByText("."))
                await userEvent.click(screen.getByText("5"))
                expect(screen.getByTestId("displayExpression").textContent).toStrictEqual("1x4.5")

                await userEvent.click(screen.getByText("C"))
                expect(screen.getByTestId("displayExpression").textContent).toStrictEqual("")
            })
        })

        describe("historyExpressionContainer", () => {
            it('should be empty String after double click', async () => {
                render(<App/>)
                expect(screen.getByTestId("historyExpressionContainer").textContent).toStrictEqual("")

                await userEvent.click(screen.getByText("1"))
                await userEvent.click(screen.getByText("x"))
                await userEvent.click(screen.getByText("4"))
                await userEvent.click(screen.getByText("=", {selector: "div"}))

                expect(screen.getByTestId("historyExpressionContainer").textContent).not.toStrictEqual("")

                await userEvent.click(screen.getByText("3"))
                await userEvent.click(screen.getByText("x"))
                await userEvent.click(screen.getByText("1"))
                await userEvent.click(screen.getByText("=", {selector: "div"}))

                expect(screen.getByTestId("1x4")).toBeInTheDocument()
                expect(screen.getByTestId("3x1")).toBeInTheDocument()

                await userEvent.click(screen.getByText("C"))
                await userEvent.click(screen.getByText("C"))

                expect(screen.queryByTestId("3x1")).not.toBeInTheDocument()
                expect(screen.queryByTestId("1x4")).not.toBeInTheDocument()
                expect(screen.getByTestId("historyExpressionContainer").textContent).toStrictEqual("")
            })
        })
    })
})