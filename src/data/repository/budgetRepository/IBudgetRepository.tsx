import { Budget, BudgetCreate } from "../../types/Budget"
import { QueryParams } from "../../types/QueryParams"


interface IBudgetRepository {
    create: (budget: BudgetCreate) => Promise<Budget | null>
    getAll: (queryParams: QueryParams) => Promise<Budget[]>
    delete: (id: string) => Promise<void>
    update: (budget: Budget) => Promise<void>
    count: (queryParams: QueryParams) => Promise<number>

    // ----------------- transactions ----------------- //
    copyTransaction: (queryParamsCopy: QueryParams, pasteDate: string) => Promise<void>
    deleteTransaction: (queryParams: QueryParams) => Promise<void>
}

export default IBudgetRepository