import { DateInterval } from "../../types/DateInterval";
import { Income, IncomeCreate } from "../../types/Income";

export interface IIncomeRepository {
     create: (income: IncomeCreate) => Promise<string>
     getAll: (date:DateInterval) => Promise<Income[]>
     getTotal: (date:DateInterval) => Promise<number>
     edit: (income: Income) => Promise<void>
     delete: (id: string) => Promise<void>
}