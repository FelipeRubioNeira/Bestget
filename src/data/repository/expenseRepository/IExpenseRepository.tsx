import { Expense, ExpenseCreate } from "../../types/Expense"
import { QueryGroupParams, QueryParams } from "../../types/QueryParams"


interface IExpenseRespository {

    create: (expense: ExpenseCreate) => Promise<Expense | null>

    update: (expense: Expense) => Promise<boolean>

    getAll: (queryParams: QueryParams) => Promise<Expense[]>

    getAllByGroup: (queryGroupParams: QueryGroupParams) => Promise<Expense[]>

    getByBudgetId: (id: string) => Promise<Expense[]>
    getAllByBudgetId: (id: string[]) => Promise<Expense[]>

    getWithoutBudget: (queryParams:QueryParams) => Promise<Expense[]>

    getTotal: (queryParams: QueryParams) => Promise<number>

    updateCategory: (categoryId: number, expenses: Expense[]) => Promise<void>

    delete: (id: string) => Promise<void>
    deleteByBudgetId: (budgetId: string) => Promise<void>

    count: (queryParams: QueryParams) => Promise<number>


    // ----------------- transactions ----------------- //
    copyTransaction: (queryParamsCopy: QueryParams, pasteDate: string) => Promise<void>
    deleteTransaction: (queryParams: QueryParams) => Promise<void>

}

export default IExpenseRespository