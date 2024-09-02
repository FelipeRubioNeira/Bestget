import { Group } from "../../types/Group";

interface IGroupRepository {

    create(group: Group, userId: string): Promise<Group | null>

    getAll(userId:string): Promise<Group[]>

}

export default IGroupRepository