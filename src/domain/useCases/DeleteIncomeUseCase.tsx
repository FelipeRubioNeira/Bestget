import { IIncomeRepository } from "../../data/repository/incomeRepository/IIncomeRepository";
import { ValidationResult } from "../../data/types/Validation";
import { validateConnection } from "../../utils/Connection";

class DeleteIncomeUseCase {
    constructor(private incomeRepository: IIncomeRepository) { }

    async delete(id: string): Promise<ValidationResult<string>> {

        const validationResult: ValidationResult<string> = {
            isValid: true,
            message: "",
            result: ""
        }

        const result = await validateConnection()

        if (result.isValid) {
            await this.incomeRepository.delete(id)

        } else {
            validationResult.isValid = false
            validationResult.message = "Error al eliminar el ingreso."
        }

        return validationResult
    }

}

export default DeleteIncomeUseCase