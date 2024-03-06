import { Income } from "../../models/Income";
import { IIncomeRepository } from "./IIncomeRepository";

export class IncomeRepository {
    constructor(private incomeRepository: IIncomeRepository) { }

    public create(income: Income): Promise<string> {
        return this.incomeRepository.create(income)
    }

    public getAll(): Promise<Income[]> {
        return this.incomeRepository.getAll();
    }

}