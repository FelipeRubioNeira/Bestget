import { Income } from "../../models/Income";

export interface IIncomeRepository {
     create: (income: Income) => Promise<string>
     getAll: () => Promise<Income[]>
     getTotal: () => Promise<number>
}