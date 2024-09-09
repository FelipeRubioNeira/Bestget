import { Income } from "../../types/Income";
import { IncomeGroup } from "../../types/IncomeGroup";
import { QueryGroupParams, QueryParams } from "../../types/QueryParams";

export interface IIncomeGroupRepository {

     /* all these methods are in charge of manipulating individual data */
     create: (incomeGroup: IncomeGroup) => Promise<IncomeGroup | null>
     delete: (incomeId: string) => Promise<boolean>
     update: (income: Income) => Promise<boolean>
     count: (queryParams: QueryParams) => Promise<number>

     getAll: (queryParams: QueryGroupParams) => Promise<Income[]>
     getTotal: (queryParams: QueryGroupParams) => Promise<number>

     // ----------------- transactions ----------------- //
     copyTransaction: (queryParamsCopy: QueryParams, pasteDate: string) => Promise<boolean>
     deleteTransaction: (queryParams: QueryParams) => Promise<boolean>

}