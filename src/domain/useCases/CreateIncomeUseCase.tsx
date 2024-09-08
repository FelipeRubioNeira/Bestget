import { IIncomeGroupRepository } from "../../data/repository/incomeRepository/IIncomeGroupRepository";
import { IIncomeRepository } from "../../data/repository/incomeRepository/IIncomeRepository";
import { Income, IncomeCreate } from "../../data/types/Income";
import { IncomeGroup } from "../../data/types/IncomeGroup";
import { Validation, ValidationResult } from "../../data/types/Validation";
import { validateConnection } from "../../utils/Connection";
import { validateInputs } from "../../utils/Inputs";



class CreateIncomeUseCase {
    constructor(
        private incomeRepository: IIncomeRepository,
        private incomeGroupRepository: IIncomeGroupRepository
    ) { }


    public async execute(
        newIncome: IncomeCreate,
        groupId?: string
    ): Promise<ValidationResult<Income>> {

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

        // 3. if income was created now wa can create a incomeGroup item
        if (incomeCreated && groupId) {

            const newIncomeGroup: IncomeGroup = {
                incomeGroupId: "", // will be set by the database
                incomeId: incomeCreated.incomeId,
                groupId: groupId,
                createdBy: newIncome.userId,
                createdDate: newIncome.date,
            }

            const incomeGroupCreated = await this.incomeGroupRepository.create(newIncomeGroup)

            if (!incomeGroupCreated) {
                return this.throwMessage("No se pudo guardar el ingreso.")
            }

        } else if (!incomeCreated) {
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
    private async applyValidations(name: string, amount: number): Promise<Validation> {

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