import {BudgetExpense} from "../../types/BudgetExpense"

interface IBudgetExpenseRepository {
    create: (budgetExpense: BudgetExpense) => Promise<void>
}

export default IBudgetExpenseRepository