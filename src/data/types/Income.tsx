
type Income = {
    id: string,
    name: string,
    amount: number,
}

type IncomeCreate = {
    name: string,
    amount: number,
}

type IncomeUI = {
    id: string,
    name: string,
    amount: string,
    onPress: () => void,
} 

export type {
    Income,
    IncomeCreate,
    IncomeUI
}

