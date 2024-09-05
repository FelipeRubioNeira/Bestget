import { Group } from "../../types/Group";

interface IGroupRepository {

    create(group: Group, userId: string): Promise<Group | null>

    getAll(userId:string): Promise<Group[]>

    existsByGroupId(groupId: string): Promise<boolean>

    existsUserInGroup(userId: string, groupId: string): Promise<boolean>

    joinToGroup(userId: string, groupId: string): Promise<boolean>

}

export default IGroupRepository