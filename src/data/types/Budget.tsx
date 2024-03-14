import { Category } from "./Categoty"

type Budget = {
    id: string,
    name: string
    amount: number
    categoryId?: number,
    date: string
}

type BudgetCreate = {
    name: string
    amount: number
    categoryId?: number,
    date: string
}


type BudgetUI = {
    id: string,
    name: string
    amount: string
    date: string,
    category: Category | undefined
    type: "Budget",
    onPress?: () => void
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
