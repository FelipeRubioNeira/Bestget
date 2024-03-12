import IBudgetExpenseRepository from "../../data/repository/budgetExpenseRepository/IBugetExpenseRepository";
import IBudgetRepository from "../../data/repository/budgetRepository/IBudgetRepository";
import { Budget, BudgetCreate } from "../../data/types/Budget";


class CreateBudgetUseCase {
    constructor(private budgetRepository: IBudgetRepository) { }


    createBudget(budget: BudgetCreate): Promise<Budget | null> {
        return this.budgetRepository.create(budget)
    }


}

export default CreateBudgetUseCase