import { Budget } from "../../types/Budget"
import { QueryGroupParams, QueryParams } from "../../types/QueryParams"


interface IBudgetRepository {
    create: (budget: Budget) => Promise<Budget | null>
    getAll: (queryParams: QueryParams) => Promise<Budget[]>
    getAllByGroup: (queryGroupParams: QueryGroupParams) => Promise<Budget[]>
    delete: (id: string) => Promise<void>
    update: (budget: Budget) => Promise<void>
    count: (queryParams: QueryParams) => Promise<number>

    // ----------------- transactions ----------------- //
    copyTransaction: (queryParamsCopy: QueryParams, pasteDate: string) => Promise<void>
    deleteTransaction: (queryParams: QueryParams) => Promise<void>
}

export default IBudgetRepository