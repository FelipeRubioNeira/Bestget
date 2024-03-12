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

export type {
    Budget,
    BudgetCreate
}
