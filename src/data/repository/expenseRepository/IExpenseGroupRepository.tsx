import { Expense } from "../../types/Expense"
import { QueryGroupParams, QueryParams } from "../../types/QueryParams"

interface IExpenseGroupRepository {

    getAll: (queryGroupParams: QueryGroupParams) => Promise<Expense[]>

    create: (expenseGroup: Expense) => Promise<Expense | null>

    update: (expense: Expense) => Promise<boolean>

    getByBudgetId: (id: string) => Promise<Expense[]>
    getAllByBudgetId: (id: string[]) => Promise<Expense[]>

    getWithoutBudget: (queryParams:QueryGroupParams) => Promise<Expense[]>

    getTotal: (queryParams: QueryParams) => Promise<number>

    updateCategory: (categoryId: number, expenses: Expense[]) => Promise<void>

    delete: (id: string) => Promise<void>
    deleteByBudgetId: (budgetId: string) => Promise<void>

    count: (queryParams: QueryParams) => Promise<number>


    // ----------------- transactions ----------------- //
    copyTransaction: (queryGroupParams: QueryGroupParams, pasteDate: string) => Promise<void>
    deleteTransaction: (queryGroupParams: QueryGroupParams) => Promise<void>


}

export default IExpenseGroupRepository;