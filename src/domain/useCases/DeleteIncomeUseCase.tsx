import { IIncomeGroupRepository } from "../../data/repository/incomeRepository/IIncomeGroupRepository";
import { IIncomeRepository } from "../../data/repository/incomeRepository/IIncomeRepository";
import { ValidationResult } from "../../data/types/Validation";
import { validateConnection } from "../../utils/Connection";

class DeleteIncomeUseCase {
    constructor(
        private incomeRepository: IIncomeRepository,
        private incomeGroupRepository: IIncomeGroupRepository
    ) { }

    async delete(incomeId: string, groupId?: string): Promise<ValidationResult<string>> {

        const validationResult: ValidationResult<string> = {
            isValid: true,
            message: "",
            result: ""
        }

        const result = await validateConnection()

        if (!result.isValid) {
            validationResult.isValid = false
            validationResult.message = "Error al eliminar el ingreso."
            return validationResult
        }

        const incomeDeleted = await this.incomeRepository.delete(incomeId)

        if (incomeDeleted && groupId) {
            const incomeGroupDeleted = await this.incomeGroupRepository.delete(incomeId)

            if (!incomeGroupDeleted) {
                validationResult.isValid = false
                validationResult.message = "Error al eliminar el ingreso."
            }
        } else if (!incomeDeleted) {
            validationResult.isValid = false
            validationResult.message = "Error al eliminar el ingreso."
        }

        return validationResult
    }

}

export default DeleteIncomeUseCase