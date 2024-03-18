import { Category } from "./Categoty";

type Expense = {
    id: string;
    name: string;
    amount: number;
    date: string;
    categoryId: number;
    budgetId: string;
}

type ExpenseCreate = {
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
    onPress?: () => void,
    editMode?: boolean, // delete / edit 
    onEdit?: () => void,
    onDelete?: () => void,
}

export const ExpenseKeys = Object.freeze({
    ID: "id",
    NAME: "name",
    AMOUNT: "amount",
    DATE: "date",
    CATEGORY_ID: "categoryId",
    BUDGET_ID: "budgetId"
})


export type {
    Expense,
    ExpenseCreate,
    ExpenseUI
}