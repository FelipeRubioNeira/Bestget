import {BudgetExpense} from "../../types/BudgetExpense"

interface IBudgetExpenseRepository {
    create: (budgetExpense: BudgetExpense) => Promise<void>
    getAll: () => Promise<BudgetExpense[]>
}

export default IBudgetExpenseRepository