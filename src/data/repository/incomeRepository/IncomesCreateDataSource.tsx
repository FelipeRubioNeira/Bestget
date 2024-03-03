import { IIncomeRepository } from "./IIncomeRepository";

export class IncomesCreateDataSource implements IIncomeRepository {

    public createIncome(income: any): Promise<void> {
        return new Promise((resolve, reject) => {
            console.log("se ha creado un nuevo ingreso")

        })
    }

}