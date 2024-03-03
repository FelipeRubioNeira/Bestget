import { Income } from "../../data/models/Income";
import { IncomeRepository } from "../../data/repository/incomeRepository/IncomeRepository";

export class CreateIncomeUseCase {
    constructor(private incomeRepository: IncomeRepository) { }

    public createIncome(income: Income): Promise<void> {
        return this.incomeRepository.createIncome(income)
    }
}