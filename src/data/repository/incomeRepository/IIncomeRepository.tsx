import { DateInterval } from "../../types/DateInterval";
import { Income, IncomeCreate } from "../../types/Income";

export interface IIncomeRepository {
     create: (income: IncomeCreate) => Promise<string>
     getAll: (date:DateInterval) => Promise<Income[]>
     getTotal: (date:DateInterval) => Promise<number>
     update: (income: Income) => Promise<void>
     delete: (id: string) => Promise<void>
     count: (date: DateInterval) => Promise<number>

     // ----------------- transactions ----------------- //
     copyTransaction: (from: DateInterval, to: DateInterval,) => Promise<void>
     deleteTransaction: (date: DateInterval) => Promise<void>
}