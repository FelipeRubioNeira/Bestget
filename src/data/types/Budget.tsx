import { Category } from "./Categoty"

type Budget = {
    id: string,
    name: string
    amount: number
    categoryId: number,
    date: string
}

type BudgetCreate = {
    name: string
    amount: number
    categoryId?: number,
    date: string
}

// item for list of budgets
type BudgetItem = {
    id: string,
    name: string
    amount: number
    category: Category | undefined
    date: string
}


export type {
    Budget,
    BudgetCreate,
    BudgetItem
}
