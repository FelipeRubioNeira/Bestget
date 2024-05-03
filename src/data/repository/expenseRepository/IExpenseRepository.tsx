import { DateInterval } from "../../types/DateInterval"
import { Expense, ExpenseCreate } from "../../types/Expense"


interface IExpenseRespository {

    create: (expense: ExpenseCreate) => Promise<string>

    update: (expense: Expense) => Promise<void>

    getAll: (date:DateInterval) => Promise<Expense[]>
    getByBudgetId: (id: string) => Promise<Expense[]>
    getWithoutBudget: (date:DateInterval) => Promise<Expense[]>

    getTotal: (date:DateInterval) => Promise<number>

    updateCategory: (categoryId: number, expenses: Expense[]) => Promise<void>

    delete: (id: string) => Promise<void>
    deleteByBudgetId: (budgetId: string) => Promise<void>

    count: (date: DateInterval) => Promise<number>


    // ----------------- transactions ----------------- //
    copyTransaction: (from: DateInterval, to: DateInterval) => Promise<void>
    deleteTransaction: (date: DateInterval) => Promise<void>

}

export default IExpenseRespository