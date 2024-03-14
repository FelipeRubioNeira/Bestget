import { Collections } from "../../collections/Collections";
import { BudgetExpense } from "../../types/BudgetExpense";
import IBudgetExpenseRepository from "./IBugetExpenseRepository";
import firestore from '@react-native-firebase/firestore';

class BudgetExpenseRepository implements IBudgetExpenseRepository {

    async create(budgetExpense: BudgetExpense): Promise<void> {

        try {

            await firestore()
                .collection(Collections.BUDGET_EXPENSE)
                .add(budgetExpense)


        } catch (error) {
            console.error("error getCategories repository", error);
        }
    }

    async getAll(): Promise<BudgetExpense[]> {

        try {

            const budgetExpensesFirebase = await firestore()
                .collection(Collections.BUDGET_EXPENSE)
                .get()

            const budgetExpensesArray: BudgetExpense[] = []

            budgetExpensesFirebase.docs.forEach(doc => {

                const { expenseId, budgetId } = doc.data() as BudgetExpense

                const newBudgetExpense: BudgetExpense = {
                    expenseId: expenseId,
                    budgetId: budgetId
                }
                budgetExpensesArray.push(newBudgetExpense)
            })

            return budgetExpensesArray

        } catch (error) {
            console.error("error getBudgetExpenses repository", error);
            return []
        }
    }

}

export default BudgetExpenseRepository;