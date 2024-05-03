import { sortByDate } from "../../../utils/Data";
import { Collections } from "../../collections/Collections";
import { DateInterval } from "../../types/DateInterval";
import { Expense, ExpenseCreate, ExpenseKeys } from "../../types/Expense";
import IExpenseRespository from "./IExpenseRepository";
import firestore from '@react-native-firebase/firestore';


class ExpenseRepository implements IExpenseRespository {

    async create(expense: ExpenseCreate): Promise<string> {

        try {

            const result = await firestore()
                .collection(Collections.EXPENSE)
                .add(expense)

            const expenseId = result.id

            return (expenseId)

        } catch (error) {
            console.error("error ExpenseRepository create", error);
            return ""
        }

    }

    async update(expense: Expense): Promise<void> {

        try {

            await firestore()
                .collection(Collections.EXPENSE)
                .doc(expense.id)
                .update(expense)

        } catch (error) {
            console.error("error editExpense repository", error);
        }
    }

    async getAll({ initialDate, finalDate }: DateInterval): Promise<Expense[]> {

        try {

            const expensesFirebase = await firestore()
                .collection(Collections.EXPENSE)
                .where(ExpenseKeys.DATE, ">=", initialDate)
                .where(ExpenseKeys.DATE, "<", finalDate)
                .get()

            const expensesArray = [] as Expense[]

            expensesFirebase.docs.forEach(doc => {

                const { name, amount, categoryId, date, budgetId } = doc.data() as Expense

                const newExpense: Expense = {
                    id: doc.id,
                    name: name,
                    amount: amount,
                    date: date,
                    categoryId,
                    budgetId
                }
                expensesArray.push(newExpense)
            })

            return expensesArray

        } catch (error) {
            console.error("error getExpenses", error);
            return []
        }

    }

    async getByBudgetId(id: string): Promise<Expense[]> {

        try {

            const expensesFirebase = await firestore()
                .collection(Collections.EXPENSE)
                .where(ExpenseKeys.BUDGET_ID, "==", id)
                .get()


            const expensesArray = [] as Expense[]

            expensesFirebase.docs.forEach(doc => {

                const { name, amount, categoryId, date, budgetId } = doc.data() as Expense

                const newExpense: Expense = {
                    id: doc.id,
                    name: name,
                    amount: amount,
                    date: date,
                    categoryId,
                    budgetId
                }
                expensesArray.push(newExpense)
            })

            return expensesArray

        } catch (error) {
            console.error("error getExpensesById", error);
            return []
        }
    }

    async getWithoutBudget({ initialDate, finalDate }: DateInterval): Promise<Expense[]> {

        try {

            let expensesArray: Expense[] = []

            const expensesFirebase = await firestore()
                .collection(Collections.EXPENSE)
                .where(ExpenseKeys.BUDGET_ID, "==", "")
                .where(ExpenseKeys.DATE, ">=", initialDate)
                .where(ExpenseKeys.DATE, "<", finalDate)
                .get()


            expensesFirebase.docs.forEach(doc => {

                const { name, amount, categoryId, date, budgetId } = doc.data() as Expense

                const newExpense: Expense = {
                    id: doc.id,
                    name: name,
                    amount: amount,
                    date: date,
                    categoryId,
                    budgetId
                }
                expensesArray.push(newExpense)
            })

            expensesArray = sortByDate(expensesArray, ExpenseKeys.DATE, "asc")

            return expensesArray

        } catch (error) {
            console.error("error getExpensesById", error);
            return []
        }
    }

    async getTotal({ initialDate, finalDate }: DateInterval): Promise<number> {

        try {

            const expensesFirebase = await firestore()
                .collection(Collections.EXPENSE)
                .where(ExpenseKeys.DATE, ">=", initialDate)
                .where(ExpenseKeys.DATE, "<", finalDate)
                .get()

            let total = 0

            expensesFirebase.docs.forEach(doc => {
                const { amount } = doc.data() as Expense
                total += amount
            })

            return total

        } catch (error) {
            console.error("error getTotal", error);
            return 0
        }
    }

    async updateCategory(categoryId: number, expenses: Expense[]): Promise<void> {

        try {

            const updatePromises = expenses.map(expense => {
                return firestore()
                    .collection(Collections.EXPENSE)
                    .doc(expense.id)
                    .update({ categoryId: categoryId })
            })

            await Promise.all(updatePromises)

        } catch (error) {
            console.error("error updateCategory", error);
        }
    }

    async delete(id: string): Promise<void> {

        try {

            await firestore()
                .collection(Collections.EXPENSE)
                .doc(id)
                .delete()

        } catch (error) {
            console.error("error deleteExpense", error);
        }

    }

    async deleteByBudgetId(budgetId: string): Promise<void> {

        try {

            const expenses = await this.getByBudgetId(budgetId)

            const deletePromises = expenses.map(expense => {
                return firestore()
                    .collection(Collections.EXPENSE)
                    .doc(expense.id)
                    .delete()
            })

            await Promise.all(deletePromises)

        } catch (error) {
            console.error("error deleteByBudgetId", error);
        }

    }

    async count({ initialDate, finalDate }: DateInterval): Promise<number> {

        try {

            const expenseCount = await firestore()
                .collection(Collections.EXPENSE)
                .where(ExpenseKeys.DATE, ">=", initialDate)
                .where(ExpenseKeys.DATE, "<", finalDate)
                .count()
                .get()

            return expenseCount.data().count

        } catch (error) {
            console.error("error countExpenses", error);
            return 0
        }

    }


    // ----------------- transactions ----------------- //

    async copyTransaction(from: DateInterval, to: DateInterval): Promise<void> {

        try {

            const db = firestore()

            await db.runTransaction(async transaction => {

                const expensesRef = db.collection(Collections.EXPENSE)
                const expenses = await this.getAll(from)

                expenses.forEach(expense => {

                    const newExpense:ExpenseCreate = {
                        name: expense.name,
                        amount: expense.amount,
                        categoryId: expense.categoryId,
                        date: expense.date,
                        budgetId: expense.budgetId
                    }

                    transaction.set(expensesRef.doc(), newExpense)
                })

            })

        } catch (error) {
            console.error("error copyTransaction", error);
        }

    }

    async deleteTransaction(date: DateInterval): Promise<void> {

        try {

            const db = firestore()

            await db.runTransaction(async transaction => {

                const expensesRef = db.collection(Collections.EXPENSE)
                const expenses = await this.getAll(date)

                expenses.forEach(expense => {
                    transaction.delete(expensesRef.doc(expense.id))
                })

            })


        } catch (error) {
            console.error("error deleteTransaction", error);
        }

    }


}

export default ExpenseRepository