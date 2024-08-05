import IBudgetRepository from "../../data/repository/budgetRepository/IBudgetRepository"
import IExpenseRespository from "../../data/repository/expenseRepository/IExpenseRepository"
import { IIncomeRepository } from "../../data/repository/incomeRepository/IIncomeRepository"
import { QueryParams } from "../../data/types/QueryParams"
import { Validation } from "../../data/types/Validation"

class DeleteMothUseCase {
    constructor(
        private incomeRepository: IIncomeRepository,
        private budgetRepository: IBudgetRepository,
        private expenseRepository: IExpenseRespository,
    ) { }

    async execute(queryParams: QueryParams): Promise<Validation> {

        const validation: Validation = {
            isValid: true,
            message: "",
        }

        try {
            await Promise.all([
                this.incomeRepository.deleteTransaction(queryParams),
                this.budgetRepository.deleteTransaction(queryParams),
                this.expenseRepository.deleteTransaction(queryParams)
            ])
            
        } catch (error) {
            validation.isValid = false
            validation.message = "Ha ocurrido un error al eliminar los datos. Intente nuevamente."
        }

        return validation

    }

}

export default DeleteMothUseCase