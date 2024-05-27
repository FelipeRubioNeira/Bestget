import { Income, IncomeCreate } from "../../types/Income";
import { QueryParams } from "../../types/QueryParams";

export interface IIncomeRepository {

     /* all these methods are in charge of manipulating individual data */
     create: (income: IncomeCreate) => Promise<Income | null>
     update: (income: Income) => Promise<boolean>
     delete: (incomeId: string) => Promise<boolean>
     count: (queryParams: QueryParams) => Promise<number>

     getAll: (queryParams: QueryParams) => Promise<Income[]>
     getTotal: (queryParams: QueryParams) => Promise<number>

     // ----------------- transactions ----------------- //
     copyTransaction: (queryParams: QueryParams) => Promise<boolean>
     deleteTransaction: (queryParams: QueryParams) => Promise<boolean>

}