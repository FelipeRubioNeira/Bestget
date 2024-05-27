import { Collections } from "../../collections/Collections";
import { Budget, BudgetCreate, BudgetKeys } from "../../types/Budget";
import { QueryParams } from "../../types/QueryParams";
import IBudgetRepository from "./IBudgetRepository";
import firestore from '@react-native-firebase/firestore';


class BudgetRepository implements IBudgetRepository {


    async getAll({ userId, initialDate, finalDate }: QueryParams): Promise<Budget[]> {

        try {

            const budgetsFirebase = await firestore()
                .collection(Collections.BUDGET)
                .where(BudgetKeys.DATE, ">=", initialDate)
                .where(BudgetKeys.DATE, "<", finalDate)
                .where(BudgetKeys.USER_ID, "==", userId)
                .orderBy(BudgetKeys.DATE, "desc")
                .get()


            const budgetsArray: Budget[] = budgetsFirebase.docs.map(doc => {

                const { userId, budgetId, name, amount, categoryId, date } = doc.data() as Budget

                const budget: Budget = {
                    budgetId: budgetId,
                    userId: userId,
                    name: name,
                    amount: amount,
                    categoryId: categoryId,
                    date: date,
                }

                return budget
            })

            return budgetsArray

        } catch (error) {
            console.error("error BudgetRepository getAll", error);
            return []
        }

    }

    async create(budget: BudgetCreate): Promise<Budget | null> {

        try {

            const newDocRef = firestore().collection(Collections.BUDGET).doc();

            const budgetCreated: Budget = {
                budgetId: newDocRef.id,
                userId: budget.userId,
                name: budget.name,
                amount: budget.amount,
                categoryId: budget?.categoryId || 0,
                date: budget.date
            }

            await newDocRef.set(budgetCreated);
            return budgetCreated

        } catch (error) {
            console.error("error BudgetRepository create", error);
            return null
        }

    }

    async delete(id: string): Promise<void> {

        try {
            await firestore()
                .collection(Collections.BUDGET)
                .doc(id)
                .delete()

        } catch (error) {
            console.error("error BudgetRepository delete", error);
        }

    }

    async update(budget: Budget): Promise<void> {

        try {
            await firestore()
                .collection(Collections.BUDGET)
                .doc(budget.budgetId)
                .update(budget)

        } catch (error) {
            console.error("error BudgetRepository update", error);
        }

    }

    async count({ userId, initialDate, finalDate }: QueryParams): Promise<number> {

        try {

            const budgetCount = await firestore()
                .collection(Collections.BUDGET)
                .where(BudgetKeys.DATE, ">=", initialDate)
                .where(BudgetKeys.DATE, "<", finalDate)
                .where(BudgetKeys.USER_ID, "==", userId)
                .count()
                .get()

            return budgetCount.data().count

        } catch (error) {
            console.error("error BudgetRepository count", error);
            return 0
        }
    }


    // ----------------- transactions ----------------- //

    async copyTransaction(queryParams: QueryParams): Promise<void> {

        try {

            const db = firestore()

            await db.runTransaction(async transaction => {

                const budgetsRef = db.collection(Collections.BUDGET)
                const budgets = await this.getAll(queryParams)

                budgets.forEach(budget => {

                    const newBudget: BudgetCreate = {
                        userId: budget.userId,
                        name: budget.name,
                        amount: budget.amount,
                        categoryId: budget.categoryId,
                        date: queryParams.initialDate
                    }

                    transaction.set(budgetsRef.doc(), newBudget)
                })

            });

        } catch (error) {
            console.error("error BudgetRepository copyTransaction", error);
        }

    }

    async deleteTransaction(queryParams: QueryParams): Promise<void> {

        try {

            const db = firestore()

            await db.runTransaction(async transaction => {

                const budgetsRef = db.collection(Collections.BUDGET)
                const budgets = await this.getAll(queryParams)

                budgets.forEach(budget => {
                    transaction.delete(budgetsRef.doc(budget.budgetId))
                })

            });

        } catch (error) {
            console.error("error BudgetRepository deleteTransaction", error);
        }

    }

}

export default BudgetRepository