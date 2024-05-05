import { Collections } from "../../collections/Collections";
import { Budget, BudgetKeys } from "../../types/Budget";
import { DateInterval } from "../../types/DateInterval";
import { Expense, ExpenseKeys } from "../../types/Expense";
import IBudgetExpenseRepository from "./IBudgetExpenseRepository";
import firestore from '@react-native-firebase/firestore';


class BudgetExpenseRepository implements IBudgetExpenseRepository {

    async getAllWithRemaining({ initialDate, finalDate }: DateInterval): Promise<Budget[]> {


        // get budgets and expenses from firestore
        const getFirestoreData = async () => {

            const [budgetsFirebase, expensesFirebase] = await Promise.all([

                // budgets
                firestore().collection(Collections.BUDGET)
                    .where(BudgetKeys.DATE, ">=", initialDate)
                    .where(BudgetKeys.DATE, "<", finalDate)
                    .orderBy(BudgetKeys.DATE, "desc")
                    .get(),

                // expenses
                firestore().collection(Collections.EXPENSE)
                    .where(ExpenseKeys.DATE, ">=", initialDate)
                    .where(ExpenseKeys.DATE, "<", finalDate)
                    .orderBy(ExpenseKeys.DATE, "desc")
                    .get(),

            ])

            return {
                budgetsFirebase,
                expensesFirebase
            }
        }

        const calculateRemaining = (budgetAmount: number, expenses: Expense[]) => {

            let totalExpenses = 0
            expenses.forEach(expense => totalExpenses += expense.amount)

            return budgetAmount - totalExpenses
        }


        try {

            const { budgetsFirebase, expensesFirebase } = await getFirestoreData()


            return budgetsFirebase.docs.map(budgetDoc => {

                // budgets info
                const budgetId = budgetDoc.id
                const { name, amount, categoryId, date } = budgetDoc.data()

                // expenses associated with the budget
                const expenses = expensesFirebase.docs
                    .filter(expenseDoc => expenseDoc.data().budgetId === budgetId)
                    .map(expenseDoc => expenseDoc.data())

                const remaining = calculateRemaining(amount, expenses as Expense[])

                const newBudget: Budget = {
                    id: budgetId,
                    name: name,
                    amount: amount,
                    categoryId: categoryId,
                    date: date,
                    remaining: remaining
                }

                return newBudget
            })

        } catch (error) {
            console.error("error BudgetRepository getAll", error);
            return []
        }
    }

}

export default BudgetExpenseRepository