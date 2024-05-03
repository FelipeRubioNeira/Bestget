import IBudgetRepository from "../../data/repository/budgetRepository/IBudgetRepository";
import IExpenseRespository from "../../data/repository/expenseRepository/IExpenseRepository";
import { ValidationResult } from "../../data/types/Validation";
import { validateConnection } from "../../utils/Connection";

class DeleteBudgetUseCase {
    constructor(
        private budgetRepositoty: IBudgetRepository,
        private expenseRepository: IExpenseRespository
    ) { }

    async delete(budgetId: string): Promise<ValidationResult<void>> {


        const validationResult: ValidationResult<void> = {
            isValid: true,
            message: {
                title: "",
                message: ""
            },
        }

        const validation = await validateConnection()

        if (validation.isValid) {

            await Promise.all([
                this.budgetRepositoty.delete(budgetId),
                this.expenseRepository.deleteByBudgetId(budgetId)
            ])

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

export default DeleteBudgetUseCase