import IGroupRepository from "../../data/repository/groupRepository/IGroupRepository";
import { Validation, ValidationResult } from "../../data/types/Validation";
import { validateConnection } from "../../utils/Connection";

class DeleteGroupUseCase {
    constructor(private groupRepository: IGroupRepository) { }

    async execute(groupId: string): Promise<ValidationResult<void>> {

        const validationResult: ValidationResult<void> = {
            isValid: true,
            message: "",
            result: undefined
        }

        const validation = await validateConnection()

        if (validation.isValid) {
            await this.groupRepository.delete(groupId);

        } else {
            validationResult.isValid = false
            validationResult.message = validation.message
        }

        return validationResult


    }

}


export default DeleteGroupUseCase;