import IBudgetRepository from "../../../data/repository/budgetRepository/IBudgetRepository";
import IExpenseRespository from "../../../data/repository/expenseRepository/IExpenseRepository";

class DeleteBudgetUseCase {
    constructor(
        private budgetRepositoty: IBudgetRepository,
        private expenseRepository: IExpenseRespository
    ) { }

    async delete(budgetId: string): Promise<void> {

        await Promise.all([
            this.budgetRepositoty.delete(budgetId),
            this.expenseRepository.deleteByBudgetId(budgetId)
        ])

    }

}

export default DeleteBudgetUseCase