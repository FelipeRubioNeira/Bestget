import { DateInterval } from "../../types/DateInterval"
import { Expense, ExpenseCreate } from "../../types/Expense"
import { QueryParams } from "../../types/QueryParams"


interface IExpenseRespository {

    create: (expense: ExpenseCreate) => Promise<Expense | null>

    update: (expense: Expense) => Promise<boolean>

    getAll: (queryParams: QueryParams) => Promise<Expense[]>
    getByBudgetId: (id: string) => Promise<Expense[]>
    getAllByBudgetId: (id: string[]) => Promise<Expense[]>

    getWithoutBudget: (date: DateInterval) => Promise<Expense[]>

    getTotal: (queryParams: QueryParams) => Promise<number>

    updateCategory: (categoryId: number, expenses: Expense[]) => Promise<void>

    delete: (id: string) => Promise<void>
    deleteByBudgetId: (budgetId: string) => Promise<void>

    count: (date: DateInterval) => Promise<number>


    // ----------------- transactions ----------------- //
    copyTransaction: (queryParams: QueryParams) => Promise<void>
    deleteTransaction: (queryParams: QueryParams) => Promise<void>

}

export default IExpenseRespository