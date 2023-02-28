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
                expect(screen.getByTestId("displayExpression").textContent).not.toStrictEqual("")

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

                expect(screen.getByTestId("historyExpression #0")).toBeInTheDocument()
                expect(screen.getByTestId("historyExpression #1")).toBeInTheDocument()
                expect(screen.queryByTestId("historyExpression #0").textContent).toStrictEqual("3x1")
                expect(screen.queryByTestId("historyExpression #1").textContent).toStrictEqual("1x4")

                await userEvent.click(screen.getByText("C"))
                await userEvent.click(screen.getByText("C"))

                expect(screen.queryByTestId("3x1")).not.toBeInTheDocument()
                expect(screen.queryByTestId("1x4")).not.toBeInTheDocument()
                expect(screen.getByTestId("historyExpressionContainer").textContent).toStrictEqual("")
            })
        })
    })

    describe("equals button", () => {
        const testResults = [
            ["7-(-27)", "34"], ["7-27", "-20"], ["5+5", "10"], ["5+(-10)", "-5"], ["10/(-5)", "-2"],
            ["10/2", "5"], ["7x7", "49"], ["2x(-2)", "-4"], ["2(5)", "10"], ["5%", "0.05"],
            ["5(5)%", "0.25"], ["(5x5)/50%", "50"], ["(5x5)50%", "12.5"], ["0.5/0.05", "10"],
            ["(0.5x0.3)/0.33", "0.45454545"], ["0.3666x0.15/0.39978", "0.13755065"],
            ["0.15+15x2+10/5-45(2.5)", "-80.35"], ["0.5x10/50%", "10"], ["54/89(-5)%", "-0.03033708"],
            ["125/(45-(45%))%", "280.58361392"], ["150(21)(112%)%", "35.28"]
        ]

        it.each(testResults)("should evaluate '%s' and return '%s' in designated place", async (expression, result) => {
            render(<App/>)
            expect(screen.queryByTestId("historyExpression #0")).not.toBeInTheDocument()
            expect(screen.getByTestId("displayExpression").textContent).toStrictEqual("")

            const arrayOfSigns = [...expression]

            for (let i = 0; i < arrayOfSigns.length; i++) {
                if (arrayOfSigns[i] === "(" || arrayOfSigns[i] === ")") {
                    await userEvent.click(screen.getByText("( )", {selector: "div"}))
                    const parenthesisButton = await screen.findByText(arrayOfSigns[i], {selector: "button"})
                    await userEvent.click(parenthesisButton)
                } else {
                    await userEvent.click(screen.getByText(arrayOfSigns[i]))
                }
            }

            await userEvent.click(screen.getByText("=", {selector: "div"}))

            expect(screen.getByTestId("historyExpression #0")).toBeInTheDocument()
            expect(screen.getByTestId("result #0")).toBeInTheDocument()
            expect(screen.getByTestId("result #0").textContent).toStrictEqual(result)
            expect(screen.getByTestId("displayExpression").textContent).toStrictEqual(result)
        })
    })

    describe("handling keyboard buttons pressing", () => {

        it.each(numbers)
        ("pressing '%s' should behave like clicking equivalent calculator button", async function (key) {
            render(<App/>)
            expect(screen.getByTestId("displayExpression").textContent).toStrictEqual("")
            await userEvent.keyboard(key)
            expect(screen.getByTestId("displayExpression").textContent).toStrictEqual(key)
        })

        it.each([...Object.keys(parentheses), ...Object.keys(operators).filter(operator => operator !== "x")])
        ("pressing '%s' should behave like clicking equivalent calculator button", async function (key) {
            render(<App/>)
            expect(screen.getByTestId("displayExpression").textContent).toStrictEqual("")
            await userEvent.click(screen.getByText("1"))
            await userEvent.keyboard(key)
            expect(screen.getByTestId("displayExpression").textContent).toStrictEqual("1" + key)
        })

        it("pressing '*' should behave like clicking equivalent calculator button", async function () {
            render(<App/>)
            expect(screen.getByTestId("displayExpression").textContent).toStrictEqual("")
            await userEvent.click(screen.getByText("1"))
            await userEvent.keyboard("*")
            expect(screen.getByTestId("displayExpression").textContent).toStrictEqual("1x")
        })

        it("pressing 'Enter' should behave like clicking equivalent calculator button", async function () {
            render(<App/>)
            expect(screen.getByTestId("displayExpression").textContent).toStrictEqual("")
            await userEvent.click(screen.getByText("1"))
            await userEvent.click(screen.getByText("+"))
            await userEvent.click(screen.getByText("1"))
            await userEvent.keyboard("[Enter]")
            expect(screen.getByTestId("historyExpression #0").textContent).toStrictEqual("1+1")
            expect(screen.getByTestId("result #0").textContent).toStrictEqual("2")
            expect(screen.getByTestId("displayExpression").textContent).toStrictEqual("2")
        })

        it("pressing 'Backspace' should behave like clicking equivalent calculator button", async function () {
            render(<App/>)
            expect(screen.getByTestId("displayExpression").textContent).toStrictEqual("")
            await userEvent.click(screen.getByText("1"))
            await userEvent.keyboard("[Backspace]")
            expect(screen.getByTestId("displayExpression").textContent).toStrictEqual("")
        })

        it("pressing 'Delete' should behave like clicking equivalent calculator button", async function () {
            render(<App/>)
            expect(screen.getByTestId("displayExpression").textContent).toStrictEqual("")
            await userEvent.click(screen.getByText("1"))
            await userEvent.click(screen.getByText("+"))
            await userEvent.click(screen.getByText("1"))
            await userEvent.click(screen.getByText("=", {selector: "div"}))
            expect(screen.getByTestId("displayExpression").textContent).toStrictEqual("2")
            expect(screen.getByTestId("historyExpression #0")).toBeInTheDocument()
            expect(screen.getByTestId("result #0")).toBeInTheDocument()

            await userEvent.keyboard("[Delete]")
            expect(screen.getByTestId("displayExpression").textContent).toStrictEqual("")
            expect(screen.getByTestId("historyExpression #0")).toBeInTheDocument()
            expect(screen.getByTestId("result #0")).toBeInTheDocument()

            await userEvent.keyboard("[Delete]")
            expect(screen.queryByTestId("historyExpression #0")).not.toBeInTheDocument()
            expect(screen.queryByTestId("result #0")).not.toBeInTheDocument()
        })
    })
})