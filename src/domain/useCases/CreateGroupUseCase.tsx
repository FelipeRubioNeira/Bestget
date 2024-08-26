import GroupRepository from "../../data/repository/groupRepository/GroupRepository";
import { Group } from "../../data/types/Group";

class CreateGroupUseCase {
    constructor(private groupRepository: GroupRepository) { }

    public async execute(group: Group, userId: string): Promise<Group | null> {

        // add user to the first item of the list
        group.userIdList.push(userId)

        const groupCreated = await this.groupRepository.create(group)

        return null
    }


}

export default CreateGroupUseCase