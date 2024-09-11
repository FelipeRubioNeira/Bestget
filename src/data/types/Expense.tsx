import { Category } from "./Categoty";


type Expense = { 
    expenseId: string,
    userId:string,
    name: string;
    amount: number;
    categoryId: number;
    date: string;
    budgetId: string;
 }

type ExpenseUI = {
    id: string,
    name: string
    amount: string
    date: string,
    category: Category | undefined
    type: "Expense",
    editMode?: boolean, // delete / edit 
    onPress?: () => void,
    onEdit?: () => void,
    onDelete?: () => void,
}

export const ExpenseKeys = Object.freeze({
    EXPENSE_ID: "expenseId",
    USER_ID: "userId",
    NAME: "name",
    AMOUNT: "amount",
    DATE: "date",
    CATEGORY_ID: "categoryId",
    BUDGET_ID: "budgetId"
})


export type {
    Expense,
    ExpenseUI
}