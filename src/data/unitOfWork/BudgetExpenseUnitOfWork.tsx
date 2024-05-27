/**
 * BudgetExpenseUnitOfWork
 * 
 * Esta clase es reponsable de traer los ingresos y gastos haciendo
 * un join entre los repositorios de budget y expense.
 */


import IBudgetRepository from "../repository/budgetRepository/IBudgetRepository";
import IExpenseRespository from "../repository/expenseRepository/IExpenseRepository";
import { Budget } from "../types/Budget";
import { Expense } from "../types/Expense";
import { QueryParams } from "../types/QueryParams";


class BudgetExpenseUnitOfWork {
    constructor(
        private budgetRepository: IBudgetRepository,
        private expenseRepository: IExpenseRespository
    ) { }


    // ----------------- public methods ----------------- //
    async getBudgetsWithRemaining(queryParams: QueryParams): Promise<Budget[]> {

        const budgets = await this.budgetRepository.getAll(queryParams)
        const budgetIds = this.getBudgetIds(budgets)

        const expensesByBudget = await this.expenseRepository.getAllByBudgetId(budgetIds)

        const budgetsWithRemaining = budgets.map(budget => {
            const expenses = this.filterExpensesByBudgetId(budget.budgetId, expensesByBudget)
            const remaining = this.calculateRemaining(budget.amount, expenses)

            return { ...budget, remaining }
        })


        return budgetsWithRemaining

    }


    // ----------------- private methods ----------------- //
    private getBudgetIds = (budgets: Budget[]) => {
        return budgets.map(budget => budget.budgetId)
    }

    private filterExpensesByBudgetId = (budgetId: string, expenses: Expense[]) => {
        return expenses.filter(expense => expense.budgetId === budgetId)
    }

    private calculateRemaining = (budgetAmount: number, expenses: Expense[]) => {

        let totalExpenses = 0
        expenses.forEach(expense => totalExpenses += expense.amount)

        return budgetAmount - totalExpenses
    }


}

export default BudgetExpenseUnitOfWork