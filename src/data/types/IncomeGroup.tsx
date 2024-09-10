
type IncomeGroup = {
    incomeId: string,
    groupId: string,
    date: string,
    createdBy: string
} 


const IncomeGroupKeys = Object.freeze({
    INCOME_ID: "incomeId",
    GROUP_ID: "groupId",
    DATE: "createdDate",
    CREATED_BY: "createdBy"
})

export {
    IncomeGroupKeys
}

export type {
    IncomeGroup
}

