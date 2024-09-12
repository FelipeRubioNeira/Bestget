/*
    FinanceType is an enum that represents the type of finance
    - personal: finance that is personal
    - group: finance that is shared among a group
 */

enum FinanceType {
    personal = "P",
    group = "G",
}

// getFinanceType returns the finance type based on the groupId
const getFinanceType = (groupId: string | null): FinanceType => {

    if (groupId) {
        return FinanceType.group
    }
    return FinanceType.personal
}


export default FinanceType
export {
    getFinanceType
}