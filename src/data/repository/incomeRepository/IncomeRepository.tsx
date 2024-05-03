import { Collections } from "../../collections/Collections";
import { DateInterval } from "../../types/DateInterval";
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
            console.error("error IncomesCreateDataSource", error);
            return ""
        }
    }

    public async getAll({ initialDate, finalDate }: DateInterval): Promise<Income[]> {

        try {

            const incomes = await firestore()
                .collection(Collections.INCOME)
                .where("date", ">=", initialDate)
                .where("date", "<", finalDate)
                .get()

            const incomesArray: Income[] = []

            incomes.docs.forEach(doc => {

                const newIncome: Income = {
                    id: doc.id,
                    name: doc.data().name,
                    amount: doc.data().amount,
                    date: doc.data().date
                }

                incomesArray.push(newIncome)
            })

            return incomesArray

        } catch (error) {
            console.error("error IncomesCreateDataSource", error);
            return []
        }

    }

    public async getTotal(date: DateInterval): Promise<number> {

        const incomes = await this.getAll(date)
        let totalIncomes = 0

        incomes.forEach(income => {
            totalIncomes += income.amount
        })

        return totalIncomes

    }

    public async update(income: Income): Promise<void> {

        try {

            await firestore()
                .collection(Collections.INCOME)
                .doc(income.id)
                .update(income)

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




    public async count(date: DateInterval): Promise<number> {

        try {

            const incomeCount = await firestore()
                .collection(Collections.INCOME)
                .where("date", ">=", date.initialDate)
                .where("date", "<", date.finalDate)
                .count()
                .get()

            return incomeCount.data().count

        } catch (error) {
            console.error("error IncomesCreateDataSource", error);
            return 0
        }
    }


    // --------------------- transactions --------------------- //


    public async copyTransaction(from: DateInterval, to: DateInterval): Promise<void> {

        try {

            const db = firestore();

            await db.runTransaction(async transaction => {

                // get ref from collection
                const incomeRef = db.collection(Collections.INCOME);
                const incomes = await this.getAll(from)

                incomes.forEach(income => {

                    const newIncome: IncomeCreate = {
                        name: income.name,
                        amount: income.amount,
                        date: to.initialDate
                    }

                    transaction.set(incomeRef.doc(), newIncome)

                })

            });

        } catch (error) {
            console.error("error al crear incomes en transaccion", error);
        }

    }

    public async deleteTransaction(date: DateInterval): Promise<void> {

        try {

            const db = firestore();

            await db.runTransaction(async transaction => {

                // get ref from collection
                const incomeRef = db.collection(Collections.INCOME);
                const incomes = await this.getAll(date)

                incomes.forEach(income => {
                    transaction.delete(incomeRef.doc(income.id));
                })

            });

        } catch (error) {
            console.error("error IncomesCreateDataSource", error);
        }

    }



}
export default IncomeRepository