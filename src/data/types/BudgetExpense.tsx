import { Budget } from "./Budget";
import { Expense } from "./Expense";
import { Category } from "./Categoty"

type BudgetExpense = {
    budgetId: string,
    expenseId: string,
}

type BudgetExpenseItemType = "Budget" | "Expense";


type BudgetExpenseItem = {
    id?: string,
    name?: string
    amount?: string
    date?: string,
    category?: Category | undefined
    type?: BudgetExpenseItemType,
    onPress?: () => void
}

export type {
    BudgetExpense,
    BudgetExpenseItem,
    BudgetExpenseItemType
}