import { EventNames } from "../../data/globalContext/events/EventNames";
import IExpenseGroupRepository from "../../data/repository/expenseRepository/IExpenseGroupRepository";
import IExpenseRespository from "../../data/repository/expenseRepository/IExpenseRepository";
import { Budget } from "../../data/types/Budget";
import { Expense } from "../../data/types/Expense";
import { ExpenseGroup } from "../../data/types/ExpenseGroup";
import { Validation, ValidationResult } from "../../data/types/Validation";
import { validateConnection } from "../../utils/Connection";
import { validateInputs } from "../../utils/Inputs";


class CreateExpenseUseCase {
    constructor(
        private expenseRepository: IExpenseRespository,
        private expenseGroupRepository: IExpenseGroupRepository
    ) { }

    async create(
        expense: Expense,
        budget: Budget | null, // if we are creating an expense from a budget
        emmitEvent: (eventName: EventNames, payload: any) => void, // domain event
        groupId?: string
    ): Promise<ValidationResult<Expense | null>> {


        const validationResult: ValidationResult<Expense | null> = {
            isValid: true,
            message: "",
            result: null
        }

        const { isValid, message } = await this.applyValidations(expense.name, expense.amount)

        if (isValid) {

            const expenseCreated = await this.expenseRepository.create(expense)

            if (expenseCreated && groupId) {

                const newExpenseGroup: ExpenseGroup = {
                    expenseId: expenseCreated.expenseId,
                    groupId: groupId,
                    date: expenseCreated.date,
                    createdBy: expenseCreated.userId,
                }

                await this.expenseGroupRepository.create(newExpenseGroup)
            }

            const eventName = budget ? EventNames.EXPENSE_CREATED_FROM_BUDGET : EventNames.EXPENSE_CREATED
            emmitEvent(eventName, expense)

        } else {
            validationResult.isValid = false
            validationResult.message = message
        }

        return validationResult


    }

    private async applyValidations(name: string, amount: number): Promise<Validation> {

        const validationResult: Validation = {
            isValid: true,
            message: ""
        }

        const validationArray = [
            async () => validateInputs(name, amount, "gasto"),
            () => validateConnection(),
        ]

        for (const validation of validationArray) {

            const result = await validation()

            if (!result.isValid) {
                validationResult.isValid = false
                validationResult.message = result.message
            }
        }

        return validationResult

    }


}

export default CreateExpenseUseCase;