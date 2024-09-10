import { IIncomeGroupRepository } from "../../data/repository/incomeRepository/IIncomeGroupRepository";
import { IIncomeRepository } from "../../data/repository/incomeRepository/IIncomeRepository";
import { Income } from "../../data/types/Income";
import { IncomeGroup } from "../../data/types/IncomeGroup";
import { Validation, ValidationResult } from "../../data/types/Validation";
import { validateConnection } from "../../utils/Connection";
import { validateInputs } from "../../utils/Inputs";


class EditIncomeUseCase {
    constructor(
        private incomeRepository: IIncomeRepository,
        private incomeGroupRepository: IIncomeGroupRepository
    ) { }


    async execute(income: Income, groupId: string): Promise<ValidationResult<Income>> {

        // 1. we create a validation result object
        const validationResult: ValidationResult<Income> = {
            isValid: true,
            message: "",
            result: null,
        }

        const { isValid, message } = await this.applyValidations(income.name, income.amount)


        if (isValid) {
            
            const result = await this.incomeRepository.update(income);

            if (!result) this.throwMessage("No se pudo guardar el ingreso.")

            const incomeGroup: IncomeGroup = {
                incomeId: income.incomeId,
                groupId: groupId,
                createdBy: income.userId,
                date: income.date,
            }

            const incomeGroupResult = await this.incomeGroupRepository.update(incomeGroup)

            if (!incomeGroupResult) this.throwMessage("No se pudo guardar el ingreso.")

            validationResult.result = income

        } else {
            return this.throwMessage(message)
        }


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