import { Budget, BudgetCreate } from "../../types/Budget"
import { DateInterval } from "../../types/DateInterval"


interface IBudgetRepository {
    create: (budget: BudgetCreate) => Promise<Budget | null>
    getAll: (date: DateInterval) => Promise<Budget[]>
    delete: (id: string) => Promise<void>
    update: (budget: Budget) => Promise<void>
    count: (date: DateInterval) => Promise<number>

    // ----------------- transactions ----------------- //
    copyTransaction: (from: DateInterval, to: DateInterval) => Promise<void>
    deleteTransaction: (date: DateInterval) => Promise<void>
}

export default IBudgetRepository