import { DeleteButtonProps } from "../../ui/components/deleteButton/DeleteButton"

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
    deleteButtonProps: DeleteButtonProps
} 

export type {
    Income,
    IncomeCreate,
    IncomeUI
}

