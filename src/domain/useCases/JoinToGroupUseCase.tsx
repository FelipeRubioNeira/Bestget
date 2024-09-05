import IGroupRepository from "../../data/repository/groupRepository/IGroupRepository";
import { Validation, ValidationResult } from "../../data/types/Validation";
import { validateConnection } from "../../utils/Connection";

class JoinToGroupUseCase {
    constructor(private readonly groupRepository: IGroupRepository) { }

    public async execute(userId: string, groupId: string): Promise<Validation> {

        const validationResult: Validation = {
            isValid: true,
            message: "",
        }

        const validations = await this.applyValidations(userId, groupId)


        if (validations.isValid) {

            const result = await this.groupRepository.joinToGroup(userId, groupId)

            if (!result) {
                validationResult.isValid = false
                validationResult.message = "No se pudo unir al grupo."
            }


        } else {
            validationResult.isValid = validations.isValid
            validationResult.message = validations.message
        }

        return validationResult

    }

    // ------------------- private methods ------------------- //
    private async applyValidations(userId: string, groupId: string): Promise<Validation> {

        let validationResult: Validation = {
            isValid: true,
            message: ""
        }

        const validationArray = [
            () => validateConnection(),
            () => this.validateIfGroupExists(groupId),
            () => this.validateIfUserIsAlreadyInGroup(userId, groupId),
        ]

        for (const validation of validationArray) {

            const result = await validation()

            if (!result.isValid) {
                validationResult = result
            }

        }

        return validationResult

    }

    private async validateIfGroupExists(groupId: string): Promise<Validation> {

        const groupExists = await this.groupRepository.existsByGroupId(groupId)

        const validationResult: Validation = {
            isValid: groupExists,
            message: groupExists ? "" : "El código ingresado no corresponde a ningún grupo.",
        }

        return validationResult

    }

    private async validateIfUserIsAlreadyInGroup(userId: string, groupId: string): Promise<Validation> {

        const userIsInGroup = await this.groupRepository.existsUserInGroup(userId, groupId)

        const validationResult: Validation = {
            isValid: !userIsInGroup,
            message: userIsInGroup ? "El usuario ya pertenece este grupo." : "",
        }

        return validationResult

    }


}

export default JoinToGroupUseCase