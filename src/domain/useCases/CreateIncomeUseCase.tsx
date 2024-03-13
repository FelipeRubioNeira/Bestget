import { Income } from "../../data/types/Income";
import { IIncomeRepository } from "../../data/repository/incomeRepository/IIncomeRepository";
import { numberFormat } from "../../utils/Convert";

export class CreateIncomeUseCase {
    constructor(private incomeRepository: IIncomeRepository) { }

    public create(name: string, amount: string): Promise<string> {

        const amountInt = numberFormat(amount)

        const newIncome: Income = {
            name: name,
            amount: amountInt,
        }

        return this.incomeRepository.create(newIncome)
    }

}