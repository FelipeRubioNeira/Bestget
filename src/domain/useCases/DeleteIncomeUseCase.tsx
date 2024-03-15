import { IIncomeRepository } from "../../data/repository/incomeRepository/IIncomeRepository";

class DeleteIncomeUseCase {
    constructor(private incomeRepository: IIncomeRepository) { }

    async delete(id: string): Promise<void> {
        await this.incomeRepository.delete(id);
    }
}

export default DeleteIncomeUseCase;