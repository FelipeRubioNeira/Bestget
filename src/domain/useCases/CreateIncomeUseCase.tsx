import { Income } from "../../data/types/Income";
import { IIncomeRepository } from "../../data/repository/incomeRepository/IIncomeRepository";
import { plainFormat } from "../../utils/Convert";

export class CreateIncomeUseCase {
    constructor(private incomeRepository: IIncomeRepository) { }

    public create(name: string, amount: string): Promise<string> {

        const amountWithoutFormat = plainFormat(amount)
        const amountInt = parseInt(amountWithoutFormat)

        const newIncome: Income = {
            name: name,
            amount: amountInt,
        }

        return this.incomeRepository.create(newIncome)
    }

}