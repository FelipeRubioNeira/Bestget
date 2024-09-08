
type ExpenseGroup = {
    expenseId: string,
    groupId: string,
    createdDate: Date,
    createdBy: string
} 


const ExpenseGroupKeys = Object.freeze({
    INCOME_ID: "expenseId",
    GROUP_ID: "groupId",
    CREATED_DATE: "createdDate",
    CREATED_BY: "createdBy"
})

export {
    ExpenseGroupKeys
}

export type {
    ExpenseGroup
}

