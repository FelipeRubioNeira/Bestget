import { Income } from "../../data/models/Income";
import { IIncomeRepository } from "../../data/repository/incomeRepository/IIncomeRepository";

export class GetAllIncomesUseCase {
  constructor(private incomeRepository: IIncomeRepository) {}

  async getAll(): Promise<Income[]> {
    return this.incomeRepository.getAll();
  }
}