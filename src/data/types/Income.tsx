
type Income = {
    incomeId: string,
    userId: string,
    name: string,
    amount: number,
    date: string,
}

type IncomeUI = {
    id: string,
    name: string,
    amount: string,
    editMode?: boolean, // delete / edit 
    onEdit?: () => void,
    onDelete?: () => void,
}

const IncomeKeys = Object.freeze({
    INCOME_ID: "incomeId",
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
    IncomeUI
}

