import { Income, IncomeCreate } from "../../types/Income";

export interface IIncomeRepository {
     create: (income: IncomeCreate) => Promise<string>
     getAll: () => Promise<Income[]>
     getTotal: () => Promise<number>
     edit: (income: Income) => Promise<void>
     delete: (id: string) => Promise<void>
}