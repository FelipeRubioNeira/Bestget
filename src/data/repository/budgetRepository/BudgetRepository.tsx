import { Collections } from "../../collections/Collections";
import { Budget, BudgetCreate, BudgetKeys } from "../../types/Budget";
import IBudgetRepository from "./IBudgetRepository";
import firestore from '@react-native-firebase/firestore';


class BudgetRepository implements IBudgetRepository {

    async getAll(): Promise<Budget[]> {

        try {

            const budgetsFirebase = await firestore()
                .collection(Collections.BUDGET)
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

}

export default BudgetRepository