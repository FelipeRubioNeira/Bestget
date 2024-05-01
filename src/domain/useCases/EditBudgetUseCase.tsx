/*
    this use case will be responsible for editing a budget
    and all expenses related to it
 */

import { EventNames } from "../../data/globalContext/events/EventNames"
import IBudgetRepository from "../../data/repository/budgetRepository/IBudgetRepository"
import IExpenseRespository from "../../data/repository/expenseRepository/IExpenseRepository"
import { Budget } from "../../data/types/Budget"
import { Expense } from "../../data/types/Expense"
import { Validation, ValidationResult } from "../../data/types/Validation"
import { isConnected } from "../../utils/Connection"


class EditBudgetUseCase {
    constructor(
        private budgetRespository: IBudgetRepository,
        private expenseRespository: IExpenseRespository
    ) { }

    async execute(
        budget: Budget,
        expenses: Expense[],
        eventEmitter: (eventName: EventNames, payload: any) => void // callback to emit events
    ): Promise<ValidationResult<Budget>> {

        const validationResult: ValidationResult<Budget> = {
            isValid: true,
            message: {
                title: "",
                message: "",
            },
            result: budget,
        }

        const result = await this.applyValidations(budget.name, budget.amount)

        if (result.isValid) {

            const promises = [this.budgetRespository.update(budget)]

            if (budget.categoryId && expenses.length > 0) {
                promises.push(
                    this.expenseRespository.updateCategory(budget?.categoryId, expenses)
                )
            }

            eventEmitter(EventNames.BUDGET_EDITED, budget)

            await Promise.all(promises)


        } else {
            validationResult.isValid = false
            validationResult.message = {
                title: "Error al guardar el presupuesto.",
                message: result.errorMessage,
            }
        }

        return validationResult

    }


    // ------------------- validations ------------------- //

    async applyValidations(name: string, amount: number): Promise<Validation> {

        let validationResult: Validation = {
            isValid: true,
            errorMessage: ""
        }

        const validationArray = [
            () => this.validateInputs(name, amount),
            () => this.validateConnection(),
        ]

        for (const validation of validationArray) {

            const result = await validation()

            if (result.isValid === false) {
                validationResult = result
            }

        }

        return validationResult
    }

    private validateInputs = (name = "", amount = 0): Validation => {

        const result: Validation = {
            isValid: true,
            errorMessage: "",
        }


        if (name.trim() === "") {
            result.isValid = false
            result.errorMessage = "El nombre de su presupuesto no puede estar vacío."

        } else if (amount === 0) {
            result.isValid = false
            result.errorMessage = "El monto de su presupuesto debe ser mayor que $0."
        }

        return result

    }

    async validateConnection(): Promise<Validation> {

        const result: Validation = {
            isValid: true,
            errorMessage: "",
        }

        const isConnectedResult = await isConnected()

        if (!isConnectedResult) {
            result.isValid = false
            result.errorMessage = "Verifique su conexión a internet y vuelva a intentarlo."
        }

        return result
    }


}

export default EditBudgetUseCase