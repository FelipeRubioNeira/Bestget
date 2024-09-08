
type IncomeGroup = {
    incomeGroupId: string,
    incomeId: string,
    groupId: string,
    createdDate: string,
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

