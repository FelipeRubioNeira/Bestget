import IBudgetRepository from "../../data/repository/budgetRepository/IBudgetRepository";
import IExpenseRespository from "../../data/repository/expenseRepository/IExpenseRepository";
import { IIncomeRepository } from "../../data/repository/incomeRepository/IIncomeRepository";
import { DateInterval } from "../../data/types/DateInterval";
import { QueryParams } from "../../data/types/QueryParams";
import { Validation } from "../../data/types/Validation"
import { isConnected } from "../../utils/Connection"


class CopyMonthUseCase {
    constructor(
        private incomeRepository: IIncomeRepository,
        private budgetRepository: IBudgetRepository,
        private expenseRepository: IExpenseRespository,
    ) { }



    async execute(queryParams: QueryParams): Promise<Validation> {
        const validation: Validation = await this.applyValidations(queryParams)
        return validation
    }

    private async applyValidations(queryParams: QueryParams): Promise<Validation> {

        const validationResult: Validation = {
            isValid: true,
            message: "",
        }


        const validatations = [
            () => this.validateConnection(),
            () => this.isThereData(queryParams)
        ]

        for (const validation of validatations) {

            const { isValid, message } = await validation()

            validationResult.isValid = isValid
            validationResult.message = message

        }


        return validationResult

    }

    private async validateConnection(): Promise<Validation> {

        const result: Validation = {
            isValid: true,
            message: "",
        }

        const isConnectedResult = await isConnected()

        if (!isConnectedResult) {
            result.isValid = false
            result.message = "Verifique su conexión a internet y vuelva a intentarlo."
        }

        return result
    }

    private async isThereData(queryParams: QueryParams): Promise<Validation> {

        const result: Validation = {
            isValid: true,
            message: "",
        }

        const [
            incomeCount,
            budgetCount,
            expenseCount
        ] = await Promise.all([
            this.incomeRepository.count(queryParams),
            this.budgetRepository.count(queryParams),
            this.expenseRepository.count(queryParams)
        ])

        if (incomeCount === 0 && budgetCount === 0 && expenseCount === 0) {
            result.isValid = false
            result.message = "Este mes no tiene datos para copiar."
        }

        return result

    }



}

export default CopyMonthUseCase