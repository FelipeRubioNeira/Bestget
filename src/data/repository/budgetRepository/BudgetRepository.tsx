import { Collections } from "../../collections/Collections";
import { Budget, BudgetCreate, BudgetKeys } from "../../types/Budget";
import { DateInterval } from "../../types/DateInterval";
import IBudgetRepository from "./IBudgetRepository";
import firestore from '@react-native-firebase/firestore';


class BudgetRepository implements IBudgetRepository {

    async getAll({ initialDate, finalDate }: DateInterval): Promise<Budget[]> {

        try {

            const budgetsFirebase = await firestore()
                .collection(Collections.BUDGET)
                .where(BudgetKeys.DATE, ">=", initialDate)
                .where(BudgetKeys.DATE, "<", finalDate)
                .orderBy(BudgetKeys.DATE, "desc")
                .get()

            return budgetsFirebase.docs.map(doc => {

                const { name, amount, categoryId, date } = doc.data()

                const newBudget: Budget = {
                    id: doc.id,
                    name: name,
                    amount: amount,
                    categoryId: categoryId,
                    date: date
                }

                return newBudget
            })

        } catch (error) {
            console.error("error BudgetRepository getAll", error);
            return []
        }

    }

    async create(budget: BudgetCreate): Promise<Budget | null> {

        try {

            const result = await firestore().
                collection(Collections.BUDGET)
                .add(budget)

            const budgetId = result.id

            const budgetCreated: Budget = {
                id: budgetId,
                name: budget.name,
                amount: budget.amount,
                categoryId: budget?.categoryId || 0,
                date: budget.date
            }

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
                .doc(budget.id)
                .update(budget)

        } catch (error) {
            console.error("error BudgetRepository update", error);
        }

    }

    async count({ initialDate, finalDate }: DateInterval): Promise<number> {
            
            try {
    
                const budgetCount = await firestore()
                    .collection(Collections.BUDGET)
                    .where(BudgetKeys.DATE, ">=", initialDate)
                    .where(BudgetKeys.DATE, "<", finalDate)
                    .count()
                    .get()
    
                return budgetCount.data().count
    
            } catch (error) {
                console.error("error BudgetRepository count", error);
                return 0
            }
    }

}

export default BudgetRepository