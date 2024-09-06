type Group = {
    groupId: string,
    name: string,
    createdDate: Date,
    createdBy: string,
    updatedDate: Date | null,
}

type UserGroup = {
    userId: string,
    groupId: string,
    createdDate: Date
}

const GroupKeys = Object.freeze({
    GROUP_ID: "groupId",
    NAME: "name",
    CREATED_DATE: "createdDate",
    CREATED_BY: "createdBy",
    UPDATED_DATE: "updatedDate"
})

const UserGroupKeys = Object.freeze({
    USER_ID: "userId",
    GROUP_ID: "groupId"
})



export type {
    Group,
    UserGroup
}

export {
    GroupKeys,
    UserGroupKeys
}