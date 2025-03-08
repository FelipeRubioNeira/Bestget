import { Collections } from "../../collections/Collections";
import FinanceType from "../../types/FinanceType";
import { Income, IncomeKeys } from "../../types/Income";
import { QueryGroupParams, QueryParams } from "../../types/QueryParams";
import { IIncomeRepository } from "./IIncomeRepository";
import firestore, { where } from '@react-native-firebase/firestore';


class IncomeRepository implements IIncomeRepository {
    constructor() { }


    public async create(income: Income): Promise<Income> {
        try {

            const newDocRef = firestore().collection(Collections.INCOME).doc();

            const newIncome: Income = {
                ...income,
                incomeId: newDocRef.id, // we set the id
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
                .where(IncomeKeys.FINANCE_TYPE, "==", FinanceType.personal)
                .where(IncomeKeys.USER_ID, "==", userId)
                .where(IncomeKeys.DATE, ">=", initialDate)
                .where(IncomeKeys.DATE, "<", finalDate)
                .get()

            const incomesArray: Income[] = incomes.docs.map(doc => ({
                incomeId: doc.id,
                financeType: FinanceType.personal,
                groupId: null,
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

    async getAllByGroup({ groupId, initialDate, finalDate }: QueryGroupParams): Promise<Income[]> {

        try {

            const incomes = await firestore()
                .collection(Collections.INCOME)
                .where(IncomeKeys.FINANCE_TYPE, "==", FinanceType.group)
                .where(IncomeKeys.GROUP_ID, "==", groupId)
                .where(IncomeKeys.DATE, ">=", initialDate)
                .where(IncomeKeys.DATE, "<", finalDate)
                .get()

            const incomesArray: Income[] = incomes.docs.map(doc => {

                const { incomeId, userId, name, amount, date, financeType } = doc.data()

                const income: Income = {
                    incomeId,
                    userId,
                    name,
                    amount,
                    date,
                    financeType,
                    groupId
                }

                return income

            });

            return incomesArray

        } catch (error) {
            console.error("error income repository [getAllByGroup]", error);
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
            console.error("error income repository [update]", error);
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
            console.error("error income repository [delete]", error);
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
            console.error("error income repository [count]", error);
            return 0
        }
    }


    // --------------------- transactions --------------------- //


    public async copyTransaction(queryParamsCopy: QueryParams, pasteDate: string): Promise<boolean> {

        try {
            const db = firestore();

            await db.runTransaction(async transaction => {

                // get ref from collection
                const incomeRef = db.collection(Collections.INCOME);
                const incomes = await this.getAll(queryParamsCopy)

                incomes.forEach(income => {

                    const newDocRef = firestore().collection(Collections.INCOME).doc();

                    const newIncome: Income = {
                        financeType: FinanceType.personal,
                        groupId: null,
                        userId: income.userId,
                        name: income.name,
                        amount: income.amount,
                        date: pasteDate, // we set the initial date
                        incomeId: newDocRef.id
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
            console.error("error income repository [delete transaction]", error);
            return false
        }

    }



}
export default IncomeRepository