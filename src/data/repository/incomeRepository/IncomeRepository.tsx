import { Income } from "../../models/Income";
import { IIncomeRepository } from "./IIncomeRepository";

export class IncomeRepository {
    constructor(private incomeRepository: IIncomeRepository) { }

    public createIncome(income: Income): Promise<void> {
        return this.incomeRepository.createIncome(income)
    }

}