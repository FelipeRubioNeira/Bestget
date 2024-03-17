import { Collections } from "../../collections/Collections";
import { Income, IncomeCreate } from "../../types/Income";
import { IIncomeRepository } from "./IIncomeRepository";
import firestore from '@react-native-firebase/firestore';


class IncomeRepository implements IIncomeRepository {


    public async create(income: IncomeCreate): Promise<string> {
        try {

            const result = await firestore()
                .collection(Collections.INCOME)
                .add(income)

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

    public async edit(income: Income): Promise<void> {

        try {

            const result = await firestore()
                .collection(Collections.INCOME)
                .doc(income.id)
                .update({
                    name: income.name,
                    amount: income.amount
                })

        } catch (error) {
            console.error("error IncomesCreateDataSource", error);
        }

    }

    public async delete(id: string): Promise<void> {

        try {

            await firestore()
                .collection(Collections.INCOME)
                .doc(id)
                .delete()

        } catch (error) {
            console.error("error IncomesCreateDataSource", error);
        }

    }



}
export default IncomeRepository