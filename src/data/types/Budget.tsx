
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
}
