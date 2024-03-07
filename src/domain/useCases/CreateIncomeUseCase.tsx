import { Income } from "../../data/models/Income";
import { IIncomeRepository } from "../../data/repository/incomeRepository/IIncomeRepository";
import { plainFormat } from "../../utils/Convert";

export class CreateIncomeUseCase {
    constructor(private incomeRepository: IIncomeRepository) { }

    public create(incomeName: string, incomeAmount: string): Promise<string> {

        const amountWithoutFormat = plainFormat(incomeAmount)
        const amountInt = parseInt(amountWithoutFormat)

        const income = new Income(
            null,
            incomeName,
            amountInt
        )

        return this.incomeRepository.create(income)
    }

}