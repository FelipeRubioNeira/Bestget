import { EventNames } from "../../data/globalContext/events/EventNames";
import IExpenseRespository from "../../data/repository/expenseRepository/IExpenseRepository";
import { ExpenseCreate } from "../../data/types/Expense";
import { Validation, ValidationResult } from "../../data/types/Validation";
import { validateConnection } from "../../utils/Connection";
import { validateInputs } from "../../utils/Inputs";


class CreateExpenseUseCase {
    constructor(private expenseRepository: IExpenseRespository) { }

    async create(
        expense: ExpenseCreate,
        emmitEvent: (eventName: EventNames, payload: any) => void
    ): Promise<ValidationResult<string>> {

        const validationResult: ValidationResult<string> = {
            isValid: true,
            message: {
                title: "",
                message: ""
            },
            result: ""
        }

        const result = await this.applyValidations(expense.name, expense.amount)

        if (result.isValid) {
            const expenseId = await this.expenseRepository.create(expense)
            validationResult.result = expenseId
            emmitEvent(EventNames.EXPENSE_CREATED, expense)

        } else {
            
            validationResult.isValid = false
            validationResult.message = {
                title: "Error al guardar el gasto.",
                message: result.message
            }

        }

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


}

export default CreateExpenseUseCase;