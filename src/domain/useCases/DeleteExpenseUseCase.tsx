import { EventNames } from "../../data/globalContext/events/EventNames";
import IExpenseRespository from "../../data/repository/expenseRepository/IExpenseRepository";
import { ValidationResult } from "../../data/types/Validation";
import { validateConnection } from "../../utils/Connection";

class DeleteExpenseUseCase {
    constructor(private expenseRepository: IExpenseRespository) { }

    async delete(
        id: string,
        emmitEvent: (eventName: EventNames, payload: any) => void
    ): Promise<ValidationResult<void>> {

        const validationResult: ValidationResult<void> = {
            isValid: true,
            message: "",
            result: undefined
        }

        const validation = await validateConnection()

        if (validation.isValid) {
            await this.expenseRepository.delete(id);
            emmitEvent(EventNames.EXPENSE_DELETED, id)

        } else {
            validationResult.isValid = false
            validationResult.message = validation.message
        }

        return validationResult

    }
}

export default DeleteExpenseUseCase