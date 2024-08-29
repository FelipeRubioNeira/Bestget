type Group = {
    groupId: string,
    name: string,
    createdDate: Date,
    createdBy: string,
    updatedDate: Date | null,
}

type UserGroup = {
    userId: string,
    groupId: string
}

export type {
    Group,
    UserGroup
}