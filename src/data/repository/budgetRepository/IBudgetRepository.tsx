import { BudgetCreate } from "../../types/Budget"


interface IBudgetRepository {
    create: (budget: BudgetCreate) => Promise<string>
}

export default IBudgetRepository