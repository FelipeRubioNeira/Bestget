import { IIncomeRepository } from "../../data/repository/incomeRepository/IIncomeRepository";
import { Income } from "../../data/types/Income";
import { Validation, ValidationResult } from "../../data/types/Validation";
import { validateConnection } from "../../utils/Connection";
import { validateInputs } from "../../utils/Inputs";

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

        const result = await this.applyValidations(income.name, income.amount)

        if (result.isValid) {
            await this.incomeRepository.edit(income);
            validationResult.result = income.id

        } else {
            validationResult.isValid = false
            validationResult.message = {
                title: "Error al guardar el ingreso.",
                message: result.errorMessage,
            }
        }



        return validationResult

    }

    // ------------------- private methods ------------------- //
    async applyValidations(name: string, amount: number): Promise<Validation> {

        let validationResult: Validation = {
            isValid: true,
            errorMessage: ""
        }

        const validationArray = [
            () => validateInputs(name, amount, "ingreso"),
            async () => validateConnection(),
        ]

        for (const validation of validationArray) {

            const result = await validation()

            if (!result.isValid) {
                validationResult = result
            }

        }

        return validationResult

    }

}

export default IncomeEditUseCase;