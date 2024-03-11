type Expense = {
    id: string;
    name: string;
    amount: number;
    categoryId: number;
    date: string;
}

export type ExpenseCreate = {
    name: string;
    amount: number;
    categoryId: number;
    date: string;
}

export const ExpenseKey = Object.freeze({
    ID: "id",
    NAME: "name",
    AMOUNT: "amount",
    CATEGORY_ID: "categoryId",
    DATE: "date"
})


export default Expense;