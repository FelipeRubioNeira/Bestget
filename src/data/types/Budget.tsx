type Budget = {
    id: string,
    name: string
    amount: number
    categoryId: number
}

type BudgetCreate = {
    name: string
    amount: number
    categoryId?: number
}

export type {
    Budget,
    BudgetCreate
}
