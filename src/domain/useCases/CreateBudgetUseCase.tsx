import { EventNames } from "../../data/globalContext/events/EventNames";
import IBudgetRepository from "../../data/repository/budgetRepository/IBudgetRepository";
import { Budget } from "../../data/types/Budget";
import { Validation, ValidationResult } from "../../data/types/Validation";
import { isConnected } from "../../utils/Connection";


class CreateBudgetUseCase {
    constructor(private budgetRepository: IBudgetRepository) { }

    async createBudget(
        budget: Budget,
        emmitEvent: (eventName: EventNames, payload: any) => void
    ): Promise<ValidationResult<Budget | null>> {

        const validationResult: ValidationResult<Budget | null> = {
            isValid: true,
            message: "",
            result: null,
        }

        const {isValid, message} = await this.applyValidations(budget.name, budget.amount)

        if (isValid) {
            validationResult.result = await this.budgetRepository.create(budget)
            emmitEvent(EventNames.BUDGET_CREATED, budget)

        } else {
            validationResult.isValid = false
            validationResult.message = "Error al guardar el presupuesto."

        }

        return validationResult


    }

    // ------------------- validations ------------------- //
    async applyValidations(name: string, amount: number): Promise<Validation> {

        let validationResult: Validation = {
            isValid: true,
            message: ""
        }

        const validationArray = [
            () => this.validateInputs(name, amount),
            () => this.validateConnection(),
        ]

        for (const validation of validationArray) {

            const result = await validation()

            if (result.isValid === false) {
                validationResult = result
            }

        }

        return validationResult
    }

    private validateInputs = (name = "", amount = 0): Validation => {

        const result: Validation = {
            isValid: true,
            message: "",
        }


        if (name.trim() === "") {
            result.isValid = false
            result.message = "El nombre de su presupuesto no puede estar vacío."

        } else if (amount === 0) {
            result.isValid = false
            result.message = "El monto de su presupuesto debe ser mayor que $0."
        }

        return result

    }

    async validateConnection(): Promise<Validation> {

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


}

export default CreateBudgetUseCase