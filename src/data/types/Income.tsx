

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
    editMode?: boolean, // delete / edit 
    onEdit?: () => void,
    onDelete?: () => void,
} 

export type {
    Income,
    IncomeCreate,
    IncomeUI
}

