import FinanceType from "./FinanceType"

type Income = {
    incomeId: string,
    userId: string,
    groupId: string | null,
    name: string,
    amount: number,
    date: string,
    financeType: FinanceType,
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
    FINANCE_TYPE: "financeType",
    INCOME_ID: "incomeId",
    USER_ID: "userId",
    GROUP_ID: "groupId",
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

