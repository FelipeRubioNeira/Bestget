import { Group } from "../../types/Group";

interface IGroupRepository {

    create(group: Group): Promise<Group | null>

}

export default IGroupRepository