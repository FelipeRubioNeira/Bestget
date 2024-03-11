import { Collections } from "../../collections/Collections";
import { Income } from "../../types/Income";
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

                const newIncome: Income = {
                    id: doc.id,
                    name: doc.data().name,
                    amount: doc.data().amount
                }

                incomesArray.push(newIncome)
            })

            return incomesArray

        } catch (error) {
            console.error("error IncomesCreateDataSource", error);
            return []
        }

    }

    public async getTotal(): Promise<number> {

        const incomes = await this.getAll()

        let totalIncomes = 0
        incomes.forEach(income => {
            totalIncomes += income.amount
        })

        return totalIncomes

    }



}