
type IncomeCreate = {
    userId: string,
    name: string,
    amount: number,
    date: string,
}

type Income = {
    incomeId: string,
} & IncomeCreate

type IncomeUI = {
    id: string,
    name: string,
    amount: string,
    editMode?: boolean, // delete / edit 
    onEdit?: () => void,
    onDelete?: () => void,
}

const IncomeKeys = Object.freeze({
    ID: "id",
    USER_ID: "userId",
    NAME: "name",
    AMOUNT: "amount",
    DATE: "date",
})

export {
    IncomeKeys
}

export type {
    Income,
    IncomeCreate,
    IncomeUI
}

