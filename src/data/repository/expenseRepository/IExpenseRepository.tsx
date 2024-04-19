import { DateInterval } from "../../types/DateInterval"
import { Expense, ExpenseCreate } from "../../types/Expense"


interface IExpenseRespository {
    create: (expense: ExpenseCreate) => Promise<string>

    edit: (expense: Expense) => Promise<void>

    getByBudgetId: (id: string) => Promise<Expense[]>
    getWithoutBudget: (date:DateInterval) => Promise<Expense[]>

    getTotal: (date:DateInterval) => Promise<number>

    updateCategory: (categoryId: number, expenses: Expense[]) => Promise<void>

    delete: (id: string) => Promise<void>
    deleteByBudgetId: (budgetId: string) => Promise<void>
}

export default IExpenseRespository