import { EventNames } from "../../data/globalContext/events/EventNames";
import IExpenseRespository from "../../data/repository/expenseRepository/IExpenseRepository";
import { Expense } from "../../data/types/Expense";
import { Validation, ValidationResult } from "../../data/types/Validation";
import { validateConnection } from "../../utils/Connection";
import { validateInputs } from "../../utils/Inputs";


class EditExpenseUseCase {
    constructor(private readonly expenseRepository: IExpenseRespository) { }

    async edit(
        expense: Expense,
        emmitEvent: (eventName: EventNames, payload: any) => void
    ): Promise<ValidationResult<string>> {

        const validationResult: ValidationResult<string> = {
            isValid: true,
            message: "",
            result: ""
        }

        const result = await this.applyValidations(expense.name, expense.amount)

        if (result.isValid) {
            await this.expenseRepository.update(expense)
            validationResult.result = expense.id

            emmitEvent(EventNames.EXPENSE_EDITED, expense)

        } else {
            validationResult.isValid = false
            validationResult.message = "Error al guardar el gasto."
        }

        return validationResult


    }

    async applyValidations(name: string, amount: number): Promise<Validation> {

        const validationResult = {
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

export default EditExpenseUseCase;