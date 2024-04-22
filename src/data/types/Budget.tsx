import { Category } from "./Categoty"

type BudgetCreate = {
    name: string
    amount: number
    date: string
    categoryId?: number,
}

type Budget = { id: string } & BudgetCreate


type BudgetUI = {
    id: string,
    name: string
    amount: string
    date: string,
    category: Category | undefined
    type: "Budget",
    onPress?: () => void, // navigate
    editMode?: boolean, // delete / edit 
    onEdit?: () => void,
    onDelete?: () => void,
}

export const BudgetKeys = Object.freeze({
    ID: "id",
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
