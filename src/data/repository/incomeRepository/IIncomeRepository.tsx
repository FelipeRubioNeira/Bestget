import { Income } from "../../types/Income";
import { QueryGroupParams, QueryParams } from "../../types/QueryParams";

export interface IIncomeRepository {

     /* all these methods are in charge of manipulating individual data */
     create: (income: Income) => Promise<Income | null>
     update: (income: Income) => Promise<boolean>
     delete: (incomeId: string) => Promise<boolean>
     count: (queryParams: QueryParams) => Promise<number>

     getAll: (queryParams: QueryParams) => Promise<Income[]>
     getAllByGroup: (queryGroupParams: QueryGroupParams) => Promise<Income[]>
     getTotal: (queryParams: QueryParams) => Promise<number>

     // ----------------- transactions ----------------- //
     copyTransaction: (queryParamsCopy: QueryParams, pasteDate: string) => Promise<boolean>
     deleteTransaction: (queryParams: QueryParams) => Promise<boolean>

}