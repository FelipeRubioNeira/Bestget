import { IIncomeRepository } from "../../../data/repository/incomeRepository/IIncomeRepository";
import { IncomeCreate } from "../../../data/types/Income";
import { Validation, ValidationResult } from "../../../data/types/Validation";
import { isConnected } from "../../../utils/Connection";



class CreateIncomeUseCase {
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

        const result = await this.applyValidations(newIncome)


        if (result.isValid) {
            const newIncomeId = await this.incomeRepository.create(newIncome)
            validationResult.result = newIncomeId

        } else {

            validationResult.isValid = false
            validationResult.message = {
                title: "Error al guardar el ingreso.",
                message: result.messageError,
            }
        }

        return validationResult

    }

    // ------------------- private methods ------------------- //
    private async applyValidations(income: IncomeCreate): Promise<Validation> {

        let validationResult: Validation = {
            isValid: true,
            messageError: ""
        }

        const validationArray = [
            () => this.validateInputs(income),
            () => this.validateConnection(),
        ]


        for (const validation of validationArray) {

            let result = await validation()

            if (result.isValid === false) {
                validationResult = result
            }

        }

        return validationResult

    }

    // ------------------- validations ------------------- //
    private validateInputs = ({ name = "", amount = 0 }: IncomeCreate): Validation => {

        const result: Validation = {
            isValid: true,
            messageError: "",
        }


        if (name.trim() === "") {
            result.isValid = false
            result.messageError = "El nombre de su ingreso no puede estar vacío."

        } else if (amount === 0) {
            result.isValid = false
            result.messageError = "El monto de ingreso debe ser mayor que $0."
        }

        return result

    }

    private async validateConnection(): Promise<Validation> {

        const result: Validation = {
            isValid: true,
            messageError: "",
        }

        const isConnectedResult = await isConnected()

        if (!isConnectedResult) {
            result.isValid = false
            result.messageError = "Verifique su conexión a internet y vuelva a intentarlo."
        }

        return result
    }


}

export default CreateIncomeUseCase;