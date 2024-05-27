import { Category } from "./Categoty"

type BudgetCreate = {
    userId: string
    name: string
    amount: number
    date: string
    categoryId?: number,
}

type Budget = { 
    budgetId: string,
    remaining?: number
 } & BudgetCreate


type BudgetUI = {
    id: string,
    name: string
    amount: string
    date: string,
    category: Category | undefined
    type: "Budget",
    editMode?: boolean, // delete / edit,
    remaining: string,
    onPress?: () => void, // navigate
    onEdit?: () => void,
    onDelete?: () => void,
}

export const BudgetKeys = Object.freeze({
    ID: "id",
    USER_ID: "userId",
    NAME: "name",
    AMOUNT: "amount",
    CATEGORY_ID: "categoryId",
    DATE: "date"
})


export type {
    Budget,
    BudgetCreate,
    BudgetUI
}
