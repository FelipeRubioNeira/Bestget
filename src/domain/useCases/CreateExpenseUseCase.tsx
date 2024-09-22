import { EventNames } from "../../data/globalContext/events/EventNames";
import IExpenseRespository from "../../data/repository/expenseRepository/IExpenseRepository";
import { Budget } from "../../data/types/Budget";
import { Expense } from "../../data/types/Expense";
import { Validation, ValidationResult } from "../../data/types/Validation";
import { validateConnection } from "../../utils/Connection";
import { validateInputs } from "../../utils/Inputs";


class CreateExpenseUseCase {
    constructor(
        private expenseRepository: IExpenseRespository,
    ) { }

    async create(
        expense: Expense,
        budget: Budget | null, // if we are creating an expense from a budget
        emmitEvent: (eventName: EventNames, payload: any) => void, // domain event
    ): Promise<ValidationResult<Expense | null>> {


        const validationResult: ValidationResult<Expense | null> = {
            isValid: true,
            message: "",
            result: null
        }

        const { isValid, message } = await this.applyValidations(expense.name, expense.amount)

        if (!isValid) {
            return this.throwMessage(message)
        }

        const expenseCreated = await this.expenseRepository.create(expense)

        if (!expenseCreated) {
            return this.throwMessage("No se pudo guardar el gasto.")
        }

        const eventName = budget ? EventNames.EXPENSE_CREATED_FROM_BUDGET : EventNames.EXPENSE_CREATED
        emmitEvent(eventName, expense)

        return validationResult


    }

    private async applyValidations(name: string, amount: number): Promise<Validation> {

        const validationResult: Validation = {
            isValid: true,
            message: ""
        }

        const validationArray = [
            async () => validateInputs(name, amount, "gasto"),
            () => validateConnection(),
        ]

        for (const validation of validationArray) {

            const result = await validation()

            if (!result.isValid) {
                validationResult.isValid = false
                validationResult.message = result.message
            }
        }

        return validationResult

    }

    private throwMessage(message: string): ValidationResult<Expense> {
        return {
            isValid: false,
            message: message,
            result: null,
        }
    }




}

export default CreateExpenseUseCase;