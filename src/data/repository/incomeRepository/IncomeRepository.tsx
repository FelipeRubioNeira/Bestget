import { Collections } from "../../collections/Collections";
import { DateInterval } from "../../types/DateInterval";
import { Income, IncomeCreate, IncomeKeys } from "../../types/Income";
import { QueryParams } from "../../types/QueryParams";
import { IIncomeRepository } from "./IIncomeRepository";
import firestore from '@react-native-firebase/firestore';


class IncomeRepository implements IIncomeRepository {
    constructor() { }


    public async create(income: IncomeCreate): Promise<Income> {
        try {

            const newDocRef = firestore().collection(Collections.INCOME).doc();

            const newIncome: Income = {
                incomeId: newDocRef.id, // we set the id
                userId: income.userId,
                name: income.name,
                amount: income.amount,
                date: income.date
            }

            await newDocRef.set(newIncome);
            return newIncome

        } catch (error) {
            console.error("error IncomeRepository [CREATE]", error);
            throw error
        }
    }

    public async getAll({ userId, initialDate, finalDate }: QueryParams): Promise<Income[]> {

        try {

            const incomes = await firestore()
                .collection(Collections.INCOME)
                .where(IncomeKeys.DATE, ">=", initialDate)
                .where(IncomeKeys.DATE, "<", finalDate)
                .where(IncomeKeys.USER_ID, "==", userId)
                .get()

            const incomesArray: Income[] = incomes.docs.map(doc => ({
                incomeId: doc.id,
                userId: doc.data().userId,
                name: doc.data().name,
                amount: doc.data().amount,
                date: doc.data().date
            }));

            return incomesArray;

        } catch (error) {
            console.error("error incomeRepository [getAll]", error);
            return []
        }

    }

    public async getTotal(queryParams: QueryParams): Promise<number> {

        let totalIncomes = 0
        const incomes = await this.getAll(queryParams)

        incomes.forEach(income => {
            totalIncomes += income.amount
        })

        return totalIncomes

    }

    public async update(income: Income): Promise<boolean> {

        try {
            await firestore()
                .collection(Collections.INCOME)
                .doc(income.incomeId)
                .update(income)

            return true

        } catch (error) {
            console.error("error IncomesCreateDataSource", error);
            return false
        }

    }

    public async delete(id: string): Promise<boolean> {

        try {

            await firestore()
                .collection(Collections.INCOME)
                .doc(id)
                .delete()

            return true

        } catch (error) {
            console.error("error IncomesCreateDataSource", error);
            return false
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


    public async copyTransaction(queryParams: QueryParams): Promise<boolean> {

        try {
            const db = firestore();

            await db.runTransaction(async transaction => {

                // get ref from collection
                const incomeRef = db.collection(Collections.INCOME);
                const incomes = await this.getAll(queryParams)

                incomes.forEach(income => {

                    const newIncome: IncomeCreate = {
                        userId: income.userId,
                        name: income.name,
                        amount: income.amount,
                        date: queryParams.initialDate // we set the initial date
                    }

                    transaction.set(incomeRef.doc(), newIncome)

                })

            })

            return true

        } catch (error) {
            console.error("error al crear incomes en transaccion", error);
            return false
        }

    }

    public async deleteTransaction(queryParams: QueryParams): Promise<boolean> {

        try {

            const db = firestore();

            await db.runTransaction(async transaction => {

                // get ref from collection
                const incomeRef = db.collection(Collections.INCOME);
                const incomes = await this.getAll(queryParams)

                incomes.forEach(income => {
                    transaction.delete(incomeRef.doc(income.incomeId));
                })

            });

            return true

        } catch (error) {
            console.error("error IncomesCreateDataSource", error);
            return false
        }

    }



}
export default IncomeRepository