import IBudgetRepository from "../../data/repository/budgetRepository/IBudgetRepository";
import IExpenseRespository from "../../data/repository/expenseRepository/IExpenseRepository";
import { IIncomeRepository } from "../../data/repository/incomeRepository/IIncomeRepository";
import { DateInterval } from "../../data/types/DateInterval";
import { Validation } from "../../data/types/Validation"
import { isConnected } from "../../utils/Connection"


class CopyMonthUseCase {
    constructor(
        private incomeRepository: IIncomeRepository,
        private budgetRepository: IBudgetRepository,
        private expenseRepository: IExpenseRespository,
    ) { }



    async execute(dateInterval: DateInterval): Promise<Validation> {
        const validation: Validation = await this.applyValidations(dateInterval)
        return validation
    }

    private async applyValidations(dateInterval: DateInterval): Promise<Validation> {

        const validationResult: Validation = {
            isValid: true,
            errorMessage: "",
        }


        const validatations = [
            () => this.validateConnection(),
            () => this.isThereData(dateInterval)
        ]

        for (const validation of validatations) {

            const { isValid, errorMessage } = await validation()

            validationResult.isValid = isValid
            validationResult.errorMessage = errorMessage

        }


        return validationResult

    }

    private async validateConnection(): Promise<Validation> {

        const result: Validation = {
            isValid: true,
            errorMessage: "",
        }

        const isConnectedResult = await isConnected()

        if (!isConnectedResult) {
            result.isValid = false
            result.errorMessage = "Verifique su conexión a internet y vuelva a intentarlo."
        }

        return result
    }

    private async isThereData(dateInterval: DateInterval): Promise<Validation> {

        const result: Validation = {
            isValid: true,
            errorMessage: "",
        }

        const [
            incomeCount,
            budgetCount,
            expenseCount
        ] = await Promise.all([
            this.incomeRepository.count(dateInterval),
            this.budgetRepository.count(dateInterval),
            this.expenseRepository.count(dateInterval)
        ])


        if (incomeCount === 0 || budgetCount === 0 || expenseCount === 0) {
            result.isValid = false
            result.errorMessage = "Este mes no tiene datos para copiar."
        }

        return result

    }



}

export default CopyMonthUseCase