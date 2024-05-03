import { IIncomeRepository } from "../../data/repository/incomeRepository/IIncomeRepository";
import { IncomeCreate } from "../../data/types/Income";
import { Validation, ValidationResult } from "../../data/types/Validation";
import { validateConnection } from "../../utils/Connection";
import { validateInputs } from "../../utils/Inputs";



class CreateIncomeUseCase  {
    constructor(private incomeRepository: IIncomeRepository) { }


    public async create(newIncome: IncomeCreate): Promise<ValidationResult<string>> {


        // 1. we create a validation result object
        const validationResult: ValidationResult<string> = {
            isValid: true,
            message: {
                title: "",
                message: "",
            },
            result: "",
        }

        const result = await this.applyValidations(newIncome.name, newIncome.amount)


        if (result.isValid) {
            const newIncomeId = await this.incomeRepository.create(newIncome)
            validationResult.result = newIncomeId

        } else {

            validationResult.isValid = false
            validationResult.message = {
                title: "Error al guardar el ingreso.",
                message: result.message,
            }
        }

        return validationResult

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