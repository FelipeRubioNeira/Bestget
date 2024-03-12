import IBudgetExpenseRepository from "../../data/repository/budgetExpenseRepository/IBugetExpenseRepository";
import IExpenseRespository from "../../data/repository/expenseRepository/IExpenseRepository";
import BudgetExpense from "../../data/types/BudgetExpense";
import { ExpenseCreate } from "../../data/types/Expense";


class CreateExpenseUseCase {
    constructor(
        private expenseRepository: IExpenseRespository,
        private budgetExpenseRepository: IBudgetExpenseRepository
    ) { }

    async create(expense: ExpenseCreate): Promise<string> {
        return this.expenseRepository.create(expense)
    }

}

export default CreateExpenseUseCase;