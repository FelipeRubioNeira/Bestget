import { IIncomeRepository } from "../../data/repository/incomeRepository/IIncomeRepository";
import { Income } from "../../data/types/Income";
import { Validation, ValidationResult } from "../../data/types/Validation";
import { validateConnection } from "../../utils/Connection";
import { validateInputs } from "../../utils/Inputs";


class EditIncomeUseCase {
    constructor(private incomeRepository: IIncomeRepository,) { }


    async execute(income: Income): Promise<ValidationResult<Income>> {

        // 1. we create a validation result object
        const validationResult: ValidationResult<Income> = {
            isValid: true,
            message: "",
            result: null,
        }

        const validadation = await this.applyValidations(income.name, income.amount)


        if (!validadation.isValid) {
            return this.throwMessage(validadation.message)
        }

        const incomeUpdated = await this.incomeRepository.update(income);

        if (!incomeUpdated) {
            return this.throwMessage("No se pudo actualizar el ingreso.")
        }

        validationResult.result = income
        return validationResult

    }

    private throwMessage(message: string): ValidationResult<Income> {
        return {
            isValid: false,
            message: message,
            result: null,
        }

    }

    // ------------------- private methods ------------------- //
    async applyValidations(name: string, amount: number): Promise<Validation> {

        let validationResult: Validation = {
            isValid: true,
            message: ""
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

export default EditIncomeUseCase;