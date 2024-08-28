import { Group } from "../../types/Group";

interface IGroupRepository {

    create(group: Group, userId: string): Promise<Group | null>

}

export default IGroupRepository