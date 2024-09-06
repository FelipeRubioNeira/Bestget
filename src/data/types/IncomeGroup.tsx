
type IncomeGroup = {
    incomeId: string,
    groupId: string,
    createdDate: Date,
    createdBy: string
} 


const IncomeGroupKeys = Object.freeze({
    INCOME_ID: "incomeId",
    GROUP_ID: "groupId",
    CREATED_DATE: "createdDate",
    CREATED_BY: "createdBy"
})

export {
    IncomeGroupKeys
}

export type {
    IncomeGroup
}

