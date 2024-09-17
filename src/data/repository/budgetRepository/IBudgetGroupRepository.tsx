import { Budget } from "../../types/Budget"
import { QueryGroupParams } from "../../types/QueryParams"


interface IBudgetGroupRepository {
    create: (budget: Budget) => Promise<Budget | null>
    getAll: (queryGroupParams: QueryGroupParams) => Promise<Budget[]>
    delete: (id: string) => Promise<void>
    update: (budget: Budget) => Promise<void>
    count: (queryGroupParams: QueryGroupParams) => Promise<number>

    // ----------------- transactions ----------------- //
    copyTransaction: (queryParamsCopy: QueryGroupParams, pasteDate: string) => Promise<void>
    deleteTransaction: (queryGroupParams: QueryGroupParams) => Promise<void>
}

export default IBudgetGroupRepository