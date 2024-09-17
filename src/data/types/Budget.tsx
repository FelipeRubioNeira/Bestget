import { Category } from "./Categoty"
import FinanceType from "./FinanceType"

type Budget = { 
    userId: string
    groupId: string | null,
    financeType: FinanceType,
    name: string
    amount: number
    date: string
    categoryId?: number,
    budgetId: string,
    remaining?: number
 }


type BudgetUI = {
    id: string,
    name: string
    amount: string
    date: string,
    category: Category | undefined
    type: "Budget",
    editMode?: boolean, // delete / edit,
    remaining: string,
    onPress?: () => void, // navigate
    onEdit?: () => void,
    onDelete?: () => void,
}

export const BudgetKeys = Object.freeze({
    ID: "id",
    USER_ID: "userId",
    GROUP_ID: "groupId",
    FINANCE_TYPE: "financeType",
    NAME: "name",
    AMOUNT: "amount",
    CATEGORY_ID: "categoryId",
    DATE: "date"
})


export type {
    Budget,
    BudgetUI
}
