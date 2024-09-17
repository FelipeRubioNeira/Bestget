import { Collections } from "../../collections/Collections";
import FinanceType from "../../types/FinanceType";
import { Income, IncomeKeys } from "../../types/Income";
import { QueryGroupParams, QueryParams } from "../../types/QueryParams";
import { IIncomeGroupRepository } from "./IIncomeGroupRepository";
import firestore from '@react-native-firebase/firestore';


class IncomeGroupRepository implements IIncomeGroupRepository {
    constructor() { }


    public async create(incomeGroup: Income): Promise<Income> {
        try {

            const newDocRef = firestore().collection(Collections.INCOME_GROUP).doc();
            await newDocRef.set(incomeGroup);
            return incomeGroup

        } catch (error) {
            console.error("error IncomeRepository [CREATE]", error);
            throw null
        }
    }

    public async delete(incomeId: string): Promise<boolean> {

        try {

            const querySnapshot = await firestore()
                .collection(Collections.INCOME_GROUP)
                .where(IncomeKeys.INCOME_ID, "==", incomeId)
                .get()

            if (querySnapshot.empty) return true

            await Promise.all(querySnapshot.docs.map(doc => doc.ref.delete()))

            return true

        } catch (error) {
            console.error("error IncomesGroup [delete]", error);
            return false
        }

    }

    public async getAll({ groupId, initialDate, finalDate }: QueryGroupParams): Promise<Income[]> {

        try {

            // get all incomes from the group
            const incomes = await firestore()
                .collection(Collections.INCOME)
                .where(IncomeKeys.FINANCE_TYPE, "==", FinanceType.group)
                .where(IncomeKeys.GROUP_ID, "==", groupId)
                .where(IncomeKeys.DATE, ">=", initialDate)
                .where(IncomeKeys.DATE, "<", finalDate)
                .get()

            // map incomes
            const incomesArray: Income[] = incomes.docs.map(doc => {
                const { userId, name, amount, date } = doc.data() as Income

                const newIncome: Income = {
                    incomeId: doc.id,
                    userId,
                    groupId,
                    name,
                    amount,
                    date,
                    financeType: FinanceType.group
                }

                return newIncome
            })

            return incomesArray;

        } catch (error) {
            console.error("error income group Repository [getAll]", error);
            return []
        }

    }


    public async getTotal(queryParams: QueryGroupParams): Promise<number> {

        let totalIncomes = 0
        const incomes = await this.getAll(queryParams)

        incomes.forEach(income => {
            totalIncomes += income.amount
        })

        return totalIncomes

    }

    public async update(incomeGroup: Income): Promise<boolean> {

        try {

            const querySnapshot = await firestore()
                .collection(Collections.INCOME_GROUP)
                .where(IncomeKeys.INCOME_ID, "==", incomeGroup.incomeId)
                .get()

            if (querySnapshot.empty) return false

            await Promise.all(querySnapshot.docs.map(doc => doc.ref.update(incomeGroup)))

            return true

        } catch (error) {
            console.error("error income group repository [update]", error);
            return false
        }

    }


    public async count({ userId, initialDate, finalDate }: QueryParams): Promise<number> {
        try {

            const incomeCount = await firestore()
                .collection(Collections.INCOME)
                .where("date", ">=", initialDate)
                .where("date", "<", finalDate)
                .where("userId", "==", userId)
                .count()
                .get()

            return incomeCount.data().count

        } catch (error) {
            console.error("error income group repository [count]", error);
            return 0
        }
    }


    // --------------------- transactions --------------------- //


    public async copyTransaction(queryGroupParams: QueryGroupParams, pasteDate: string): Promise<boolean> {

        try {
            const db = firestore();

            await db.runTransaction(async transaction => {

                // get ref from collection
                const incomeRef = db.collection(Collections.INCOME);
                const incomes = await this.getAll(queryGroupParams)

                incomes.forEach(income => {

                    const newDocRef = firestore().collection(Collections.INCOME).doc();

                    const newIncome: Income = {
                        groupId: income.groupId,
                        userId: income.userId,
                        name: income.name,
                        amount: income.amount,
                        date: pasteDate, // we set the initial date
                        incomeId: newDocRef.id,
                        financeType: FinanceType.group
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

    public async deleteTransaction(queryGroupParams: QueryGroupParams): Promise<boolean> {

        try {

            const db = firestore();

            await db.runTransaction(async transaction => {

                // get ref from collection
                const incomeRef = db.collection(Collections.INCOME);
                const incomes = await this.getAll(queryGroupParams)

                incomes.forEach(income => {
                    transaction.delete(incomeRef.doc(income.incomeId));
                })

            });

            return true

        } catch (error) {
            console.error("error income group repository [delete transaction]", error);
            return false
        }

    }



}
export default IncomeGroupRepository