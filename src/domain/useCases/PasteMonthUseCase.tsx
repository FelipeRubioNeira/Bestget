import IBudgetRepository from "../../data/repository/budgetRepository/IBudgetRepository";
import IExpenseRespository from "../../data/repository/expenseRepository/IExpenseRepository";
import { IIncomeRepository } from "../../data/repository/incomeRepository/IIncomeRepository";
import { DateInterval } from "../../data/types/DateInterval";
import { QueryParams } from "../../data/types/QueryParams";
import { Validation } from "../../data/types/Validation"
import BudgetExpenseUnitOfWork from "../../data/unitOfWork/BudgetExpenseUnitOfWork";
import { isConnected } from "../../utils/Connection"
import DateTime from "../../utils/DateTime";

const dateTime = new DateTime()
type PasteType = "overwrite" | "combine"


class PasteMonthUseCase {
    constructor(
        private incomeRepository: IIncomeRepository,
        private budgetRepository: IBudgetRepository,
        private expenseRepository: IExpenseRespository,
        private budgetExpenseUnitOfWork: BudgetExpenseUnitOfWork
    ) { }


    async execute(
        userId: string,
        operationDate: DateInterval,
        copiedMonth: DateInterval,
        pasteType: PasteType = "overwrite"
    ): Promise<Validation> {


        const validation: Validation = {
            isValid: true,
            message: "",
        }

        try {

            // we use this to delete all previus data from operationDate if pasteType is overwrite
            const deleteQueryParams: QueryParams = {
                userId,
                ...operationDate
            }

            const copyQueryParams: QueryParams = {
                userId,
                ...copiedMonth
            }

            const pasteDate = operationDate.initialDate

            // if pasteType is overwrite, delete all data from operationDate
            if (pasteType === "overwrite") {
                await Promise.all([
                    this.expenseRepository.deleteTransaction(deleteQueryParams),
                    this.incomeRepository.deleteTransaction(deleteQueryParams),
                    this.budgetRepository.deleteTransaction(deleteQueryParams),
                ])
            }


            await Promise.all([
                this.incomeRepository.copyTransaction(copyQueryParams, pasteDate),
                this.budgetExpenseUnitOfWork.copyTransaction(
                    copyQueryParams,
                    pasteDate,
                    this.budgetRepository,
                    this.expenseRepository
                ),
            ])


        } catch (error) {
            validation.isValid = false
            validation.message = "Ha ocurrido un error al pegar los datos. Intente nuevamente."
        }

        return validation

    }

    async applyValidations(operationDate: DateInterval, copiedMonth: DateInterval): Promise<Validation> {

        const validationResult: Validation = {
            isValid: true,
            message: "",
        }


        const validatations = [
            () => this.validateConnection(),
            () => this.validateMonthCopied(operationDate, copiedMonth),
        ]

        for (const validation of validatations) {

            const { isValid, message } = await validation()

            validationResult.isValid = isValid
            validationResult.message = message

        }


        return validationResult

    }

    async isThereData(queryParams: QueryParams): Promise<Validation> {


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

        if (incomeCount > 0 || budgetCount > 0 || expenseCount > 0) {
            result.isValid = false
            result.message = "Existen datos previos en este mes. ¿Desea reemplazar, combinar o cancelar la operación?."
        }

        return result

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

    private validateMonthCopied(operationDate: DateInterval, copiedMonth: DateInterval): Validation {

        const result: Validation = {
            isValid: true,
            message: "",
        }

        if (!copiedMonth.initialDate || !copiedMonth.finalDate) {
            result.isValid = false
            result.message = "Antes de pegar, es necesario copiar un mes."

        } else if (dateTime.compareDates(operationDate.initialDate, copiedMonth.initialDate) === 0) {
            result.isValid = false
            result.message = "No se puede pegar un mes en el mismo mes."
        }

        return result
    }






}

export default PasteMonthUseCase

export type {
    PasteType
}