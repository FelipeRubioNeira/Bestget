import { IIncomeRepository } from "../../data/repository/incomeRepository/IIncomeRepository";
import { Income, IncomeCreate } from "../../data/types/Income";
import { Validation, ValidationResult } from "../../data/types/Validation";
import { validateConnection } from "../../utils/Connection";
import { validateInputs } from "../../utils/Inputs";



class CreateIncomeUseCase {
    constructor(private incomeRepository: IIncomeRepository) { }


    public async execute(newIncome: IncomeCreate, groupId?: string): Promise<ValidationResult<Income>> {

        // 1. we create a validation result object
        const validationResult: ValidationResult<Income> = {
            isValid: true,
            message: "",
            result: null,
        }

        const validation = await this.applyValidations(newIncome.name, newIncome.amount)


        if (!validation.isValid) {
            return this.throwMessage(validation.message)
        }

        // 2. we create the income on unit of work
        const incomeCreated = await this.incomeRepository.create(newIncome)

        if (!incomeCreated) {
            return this.throwMessage("No se pudo guardar el ingreso.")
        }

        validationResult.result = incomeCreated
        return validationResult

    }

    throwMessage(message: string): ValidationResult<Income> {
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

export default CreateIncomeUseCase;