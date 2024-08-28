import GroupRepository from "../../data/repository/groupRepository/GroupRepository";
import { Group } from "../../data/types/Group";
import { Validation, ValidationResult } from "../../data/types/Validation";
import { validateConnection } from "../../utils/Connection";
import { validateGroupFields } from "../../utils/Inputs";


class CreateGroupUseCase {
    constructor(private groupRepository: GroupRepository) { }

    public async execute(group: Group, userId: string): Promise<ValidationResult<Group | null>> {

        const validationResult: ValidationResult<Group | null> = {
            isValid: true,
            message: "",
            result: null
        }

        const result = await this.applyValidations(group.name)


        if (result.isValid) {

            validationResult.result = await this.groupRepository.create(group, userId)

            // TODO: implement domain event
            // const eventName = budget ? EventNames.EXPENSE_CREATED_FROM_BUDGET : EventNames.EXPENSE_CREATED
            // emmitEvent(eventName, expense)

        } else {
            validationResult.isValid = false
            validationResult.message = "Error al guardar el grupo. Intente nuevamente."
        }

        return validationResult

    }

    private async applyValidations(name: string): Promise<Validation> {

        const validationResult: Validation = {
            isValid: true,
            message: ""
        }

        const validationArray = [
            async () => validateGroupFields({ name: name }),
            () => validateConnection(),
        ]

        for (const validation of validationArray) {

            const result = await validation()

            if (!result.isValid) {
                validationResult.isValid = false
                validationResult.message = result.message
            }
        }

        return validationResult

    }


}

export default CreateGroupUseCase