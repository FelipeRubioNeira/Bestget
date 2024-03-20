import IExpenseRespository from "../../data/repository/expenseRepository/IExpenseRepository";
import { Expense } from "../../data/types/Expense";
import { Validation, ValidationResult } from "../../data/types/Validation";
import { validateConnection } from "../../utils/Connection";
import { validateInputs } from "../../utils/Inputs";

class EditExpenseUseCase {
    constructor(private readonly expenseRepository: IExpenseRespository) { }

    async edit(expense: Expense): Promise<ValidationResult<void>> {

        const validationResult: ValidationResult<void> = {
            isValid: true,
            message: {
                title: "",
                message: "",
            }
        }

        const result = await this.applyValidations(expense.name, expense.amount)

        if (result.isValid) {
            await this.expenseRepository.edit(expense)

        } else {
            
            validationResult.isValid = false
            validationResult.message = {
                title: "Error al guardar el gasto.",
                message: result.errorMessage,
            }
        }

        return validationResult


    }

    async applyValidations(name: string, amount: number): Promise<Validation> {

        const validationResult = {
            isValid: true,
            errorMessage: ""
        }


        const validationArray = [
            async () => validateInputs(name, amount, "gasto"),
            () => validateConnection(),
        ]

        for (const validation of validationArray) {

            const result = await validation()

            if (!result.isValid) {
                validationResult.isValid = false
                validationResult.errorMessage = result.errorMessage
            }
        }

        return validationResult
    }


}

export default EditExpenseUseCase;