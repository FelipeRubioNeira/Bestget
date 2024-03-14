import IBudgetExpenseRepository from "../../data/repository/budgetExpenseRepository/IBugetExpenseRepository";
import IExpenseRespository from "../../data/repository/expenseRepository/IExpenseRepository";
import { BudgetExpense } from "../../data/types/BudgetExpense";
import { ExpenseCreate } from "../../data/types/Expense";


class CreateExpenseUseCase {
    constructor(
        private expenseRepository: IExpenseRespository,
        private budgetExpenseRepository: IBudgetExpenseRepository
    ) { }

    async create(expense: ExpenseCreate, budgetId?: string): Promise<string> {

        const expenseId = await this.expenseRepository.create(expense)

        await this.createBudgetExpense(expenseId, budgetId || "")

        return expenseId
    }

    private async createBudgetExpense(expenseId: string, budgetId: string) {

        const budgetExpense: BudgetExpense = {
            expenseId: expenseId,
            budgetId: budgetId
        }

        await this.budgetExpenseRepository.create(budgetExpense)
    }

}

export default CreateExpenseUseCase;