import { Category } from "./Categoty";
import FinanceType from "./FinanceType";


type Expense = { 
    expenseId: string,
    userId:string,
    groupId: string | null,
    financeType: FinanceType,
    name: string;
    amount: number;
    categoryId: number ;
    date: string;
    budgetId: string;
 }

type ExpenseUI = {
    id: string,
    name: string
    amount: string
    date: string,
    category: Category | undefined
    type: "Expense",
    editMode?: boolean, // delete / edit 
    onPress?: () => void,
    onEdit?: () => void,
    onDelete?: () => void,
}

export const ExpenseKeys = Object.freeze({
    EXPENSE_ID: "expenseId",
    GROUP_ID: "groupId",
    USER_ID: "userId",
    FINANCE_TYPE: "financeType",
    NAME: "name",
    AMOUNT: "amount",
    DATE: "date",
    CATEGORY_ID: "categoryId",
    BUDGET_ID: "budgetId"
})


export type {
    Expense,
    ExpenseUI
}