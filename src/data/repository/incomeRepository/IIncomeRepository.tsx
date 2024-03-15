import { Income, IncomeCreate } from "../../types/Income";

export interface IIncomeRepository {
     create: (income: IncomeCreate) => Promise<string>
     getAll: () => Promise<Income[]>
     getTotal: () => Promise<number>
     delete: (id: string) => Promise<void>
}