import { Collections } from "../../collections/Collections";
import { Income } from "../../models/Income";
import { IIncomeRepository } from "./IIncomeRepository";
import firestore from '@react-native-firebase/firestore';


export class IncomeRepository implements IIncomeRepository {


    public async create(income: Income): Promise<string> {

        try {
            const result = await firestore().collection(Collections.INCOME).add(income)
            const incomeId = result.id

            return (incomeId)

        } catch (error) {
            console.log("error IncomesCreateDataSource", error);
            return ""
        }


    }

    public async getAll(): Promise<Income[]> {

        try {

            const incomes = await firestore().collection(Collections.INCOME).get()

            const incomesArray: Income[] = []

            incomes.docs.forEach(doc => {

                const newIncome = new Income(
                    doc.id,
                    doc.data().name,
                    doc.data().amount
                )
                incomesArray.push(newIncome)
            })

            return incomesArray

        } catch (error) {
            console.log("error IncomesCreateDataSource", error);
            return []
        }

    }

}