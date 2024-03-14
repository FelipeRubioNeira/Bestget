import IExpenseRespository from "../../data/repository/expenseRepository/IExpenseRepository";
import { ExpenseCreate } from "../../data/types/Expense";


class CreateExpenseUseCase {
    constructor(private expenseRepository: IExpenseRespository) { }

    async create(expense: ExpenseCreate): Promise<string> {
        return this.expenseRepository.create(expense)
    }


}

export default CreateExpenseUseCase;