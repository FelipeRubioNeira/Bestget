import IGroupRepository from "../../data/repository/groupRepository/IGroupRepository";
import { Group } from "../../data/types/Group";
import { QueryParams } from "../../data/types/QueryParams";

class GetGroupsService {
    constructor(private groupRepository: IGroupRepository) {}

    async execute(userId: string): Promise<Group[]> {
        return this.groupRepository.getAll(userId)
    }
}

export default GetGroupsService