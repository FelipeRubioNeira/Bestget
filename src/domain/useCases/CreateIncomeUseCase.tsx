import { Income } from "../../data/models/Income";
import { IncomeRepository } from "../../data/repository/incomeRepository/IncomeRepository";

export class CreateIncomeUseCase {
    constructor(private incomeRepository: IncomeRepository) { }

    public create(income: Income): Promise<string> {
        return this.incomeRepository.create(income)
    }

}