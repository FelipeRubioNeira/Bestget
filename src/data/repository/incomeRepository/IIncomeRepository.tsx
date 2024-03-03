import { Income } from "../../models/Income";

export interface IIncomeRepository {
     createIncome: (income: Income) => Promise<any>
}