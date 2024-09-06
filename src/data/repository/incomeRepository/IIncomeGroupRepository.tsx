import { Income, IncomeCreate } from "../../types/Income";
import { QueryGroupParams, QueryParams } from "../../types/QueryParams";

export interface IIncomeGroupRepository {

     /* all these methods are in charge of manipulating individual data */
     create: (income: IncomeCreate) => Promise<Income | null>
     update: (income: Income) => Promise<boolean>
     delete: (incomeId: string) => Promise<boolean>
     count: (queryParams: QueryParams) => Promise<number>

     getAll: (queryParams: QueryGroupParams) => Promise<Income[]>
     getTotal: (queryParams: QueryGroupParams) => Promise<number>

     // ----------------- transactions ----------------- //
     copyTransaction: (queryParamsCopy: QueryParams, pasteDate: string) => Promise<boolean>
     deleteTransaction: (queryParams: QueryParams) => Promise<boolean>

}