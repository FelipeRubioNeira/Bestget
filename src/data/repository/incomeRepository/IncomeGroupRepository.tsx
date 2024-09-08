import { Collections } from "../../collections/Collections";
import { Income, IncomeCreate, IncomeKeys } from "../../types/Income";
import { IncomeGroup, IncomeGroupKeys } from "../../types/IncomeGroup";
import { QueryGroupParams, QueryParams } from "../../types/QueryParams";
import { IIncomeGroupRepository } from "./IIncomeGroupRepository";
import firestore from '@react-native-firebase/firestore';


class IncomeGroupRepository implements IIncomeGroupRepository {
    constructor() { }


    public async create(incomeGroup: IncomeGroup): Promise<IncomeGroup> {
        try {

            const newDocRef = firestore().collection(Collections.INCOME_GROUP).doc();

            const newIncomeGroup: IncomeGroup = {
                incomeGroupId: newDocRef.id, 
                incomeId: incomeGroup.incomeId, 
                createdBy: incomeGroup.createdBy,
                createdDate: incomeGroup.createdDate,
                groupId: incomeGroup.groupId,
            }

            await newDocRef.set(newIncomeGroup);
            return newIncomeGroup

        } catch (error) {
            console.error("error IncomeRepository [CREATE]", error);
            throw null
        }
    }

    public async getAll({ groupId, initialDate, finalDate }: QueryGroupParams): Promise<Income[]> {

        try {

            const db = firestore();
            const incomeIds = await this.getIncomeIdsByGroupId({ groupId, initialDate, finalDate })

            // if there are no incomes, we return an empty array
            if (incomeIds.length === 0) return []

            // get all incomes from the group
            const incomes = await firestore()
                .collection(Collections.INCOME)
                .where(IncomeKeys.INCOME_ID, "in", incomeIds)
                .get()

            // map incomes
            const incomesArray: Income[] = incomes.docs.map(doc => {
                const { userId, name, amount, date } = doc.data()

                const newIncome: Income = {
                    incomeId: doc.id,
                    userId,
                    name,
                    amount,
                    date
                }

                return newIncome
            })

            return incomesArray;

        } catch (error) {
            console.error("error incomeRepository [getAll]", error);
            return []
        }

    }

    private async getIncomeIdsByGroupId({ groupId, initialDate, finalDate }: QueryGroupParams): Promise<string[]> {

        try {

            const db = firestore();

            // get all incomes from the group filtered by date
            const incomeGroup = await db.collection(Collections.INCOME_GROUP)
                .where(IncomeGroupKeys.GROUP_ID, "==", groupId)
                .where(IncomeGroupKeys.CREATED_DATE, ">=", initialDate)
                .where(IncomeGroupKeys.CREATED_DATE, "<", finalDate)
                .get()


            // get all income ids
            return incomeGroup.docs.map(doc => doc.data().incomeId)

        } catch (error) {
            console.log("error incomeRepository [getIncomeIdsByGroupId]", error);
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
            console.error("error IncomesCreateDataSource", error);
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
            console.error("error IncomesCreateDataSource", error);
            return false
        }

    }



}
export default IncomeGroupRepository