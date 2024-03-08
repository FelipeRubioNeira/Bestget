import { IIncomeRepository } from "../../data/repository/incomeRepository/IIncomeRepository";

export class GetTotalIncomesUseCase {
    constructor(private incomeRepository: IIncomeRepository) { }

    getTotal(): Promise<number> {
        return this.incomeRepository.getTotal();
    }

}