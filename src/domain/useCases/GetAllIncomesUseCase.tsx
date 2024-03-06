import { Income } from "../../data/models/Income";
import { IncomeRepository } from "../../data/repository/incomeRepository/IncomeRepository";

export class GetAllIncomesUseCase {
  constructor(private incomeRepository: IncomeRepository) {}

  async getAll(): Promise<Income[]> {
    return this.incomeRepository.getAll();
  }
}