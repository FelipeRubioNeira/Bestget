import { Budget, BudgetCreate } from "../../types/Budget"


interface IBudgetRepository {
    create: (budget: BudgetCreate) => Promise<Budget | null>
    getAll: () => Promise<Budget[]>
    delete: (id: string) => Promise<void>
}

export default IBudgetRepository