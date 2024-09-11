
type ExpenseGroup = {
    expenseId: string,
    groupId: string,
    date: string,
    createdBy: string
} 


const ExpenseGroupKeys = Object.freeze({
    INCOME_ID: "expenseId",
    GROUP_ID: "groupId",
    DATE: "date",
    CREATED_BY: "createdBy"
})

export {
    ExpenseGroupKeys
}

export type {
    ExpenseGroup
}

