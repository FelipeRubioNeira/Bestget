import { Budget } from "../../types/Budget"
import { Expense, ExpenseCreate } from "../../types/Expense"


interface IExpenseRespository {
    create: (expense: ExpenseCreate) => Promise<string>

    getAll: () => Promise<Expense[]>
    getById: (id: string) => Promise<Expense[]>
    getWithoutBudget: () => Promise<Expense[]>

    getTotal: () => Promise<number>

    delete: (id: string) => Promise<void>
    deleteByBudgetId: (budgetId: string) => Promise<void>
}

export default IExpenseRespository