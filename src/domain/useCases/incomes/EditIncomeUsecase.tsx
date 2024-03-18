import { IIncomeRepository } from "../../../data/repository/incomeRepository/IIncomeRepository";
import { Income } from "../../../data/types/Income";
import { ValidationResult } from "../../../data/types/Validation";

class IncomeEditUseCase {
    constructor(private incomeRepository: IIncomeRepository) { }

    async edit(income: Income): Promise<ValidationResult<string>> {

        // 1. we create a validation result object
        const validationResult: ValidationResult<string> = {
            isValid: true,
            message: {
                title: "",
                message: "",
            },
            result: "",
        }

        await this.incomeRepository.edit(income);

        return validationResult

    }
}

export default IncomeEditUseCase;