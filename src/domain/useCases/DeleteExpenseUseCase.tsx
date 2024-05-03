import IExpenseRespository from "../../data/repository/expenseRepository/IExpenseRepository";
import { ValidationResult } from "../../data/types/Validation";
import { validateConnection } from "../../utils/Connection";

class DeleteExpenseUseCase {
    constructor(private expenseRepository: IExpenseRespository) { }

    async delete(id: string): Promise<ValidationResult<void>> {

        const validationResult: ValidationResult<void> = {
            isValid: true,
            message: {
                title: "",
                message: ""
            },
        }

        const validation = await validateConnection()

        if (validation.isValid) {
            await this.expenseRepository.delete(id);

        } else {

            validationResult.isValid = false
            validationResult.message = {
                title: "Error",
                message: validation.message
            }

        }

        return validationResult

    }
}

export default DeleteExpenseUseCase