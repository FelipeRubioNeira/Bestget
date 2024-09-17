import { Collections } from "../../collections/Collections";
import { Expense, ExpenseKeys } from "../../types/Expense";
import FinanceType from "../../types/FinanceType";
import { QueryParams } from "../../types/QueryParams";
import IExpenseRespository from "./IExpenseRepository";
import firestore from '@react-native-firebase/firestore';


class ExpenseRepository implements IExpenseRespository {

    async create(expense: Expense): Promise<Expense | null> {

        try {

            const newDocRef = firestore().collection(Collections.EXPENSE).doc();

            const newExpense: Expense = {
                ...expense,
                expenseId: newDocRef.id, // we set the id
            }

            await newDocRef.set(newExpense);
            return newExpense

        } catch (error) {
            console.error("error ExpenseRepository create", error);
            return null
        }

    }

    async update(expense: Expense): Promise<boolean> {

        try {
            await firestore()
                .collection(Collections.EXPENSE)
                .doc(expense.expenseId)
                .update(expense)

            return true

        } catch (error) {
            console.error("error editExpense repository", error);
            return false
        }
    }

    async getAll({ userId, initialDate, finalDate }: QueryParams): Promise<Expense[]> {

        try {

            const expensesFirebase = await firestore()
                .collection(Collections.EXPENSE)
                .where(ExpenseKeys.DATE, ">=", initialDate)
                .where(ExpenseKeys.DATE, "<", finalDate)
                .where(ExpenseKeys.USER_ID, "==", userId)
                .get()

            const expensesArray = expensesFirebase.docs.map(doc => {

                const { expenseId, userId, name, amount, categoryId, date, budgetId } = doc.data() as Expense

                const newExpense: Expense = {
                    financeType: FinanceType.personal,
                    groupId: null,
                    expenseId: expenseId,
                    userId: userId,
                    name: name,
                    amount: amount,
                    date: date,
                    categoryId,
                    budgetId
                }
                return newExpense

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

                const { expenseId, userId, name, amount, categoryId, date, budgetId } = doc.data() as Expense

                const newExpense: Expense = {
                    financeType: FinanceType.personal,
                    groupId: null,
                    expenseId: expenseId,
                    userId: userId,
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

    async getAllByBudgetId(budgetIds: string[]): Promise<Expense[]> {


        if (budgetIds.length === 0) return []

        try {

            const expensesDoc = await firestore().collection(Collections.EXPENSE)
                .where(ExpenseKeys.BUDGET_ID, "in", budgetIds)
                .get()

            return expensesDoc.docs.map(doc => {
                const { expenseId, userId, amount, name, date, budgetId, categoryId } = doc.data() as Expense

                const expense: Expense = {
                    financeType: FinanceType.personal,
                    groupId: null,
                    expenseId: expenseId,
                    userId: userId,
                    amount: amount,
                    name: name,
                    date: date,
                    budgetId: budgetId,
                    categoryId: categoryId
                }

                return expense

            })


        } catch (error) {
            console.error("error getAllByBudgetId", error);
            return []
        }
    }

    async getWithoutBudget({ userId, initialDate, finalDate }: QueryParams): Promise<Expense[]> {

        try {

            const expensesFirebase = await firestore()
                .collection(Collections.EXPENSE)
                .where(ExpenseKeys.BUDGET_ID, "==", "")
                .where(ExpenseKeys.DATE, ">=", initialDate)
                .where(ExpenseKeys.DATE, "<", finalDate)
                .where(ExpenseKeys.USER_ID, "==", userId)
                .orderBy(ExpenseKeys.DATE, "asc")
                .get()


            return expensesFirebase.docs.map(doc => {

                const { expenseId, userId, name, amount, categoryId, date, budgetId } = doc.data() as Expense

                const newExpense: Expense = {
                    financeType: FinanceType.personal,
                    groupId: null,
                    expenseId: expenseId,
                    userId: userId,
                    name: name,
                    amount: amount,
                    date: date,
                    categoryId,
                    budgetId
                }

                return newExpense
            })

        } catch (error) {
            console.error("error getWithoutBudget", error);
            return []
        }
    }

    async getTotal({ userId, initialDate, finalDate }: QueryParams): Promise<number> {

        try {

            const expensesFirebase = await firestore()
                .collection(Collections.EXPENSE)
                .where(ExpenseKeys.DATE, ">=", initialDate)
                .where(ExpenseKeys.DATE, "<", finalDate)
                .where(ExpenseKeys.USER_ID, "==", userId)
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
                    .doc(expense.expenseId)
                    .update({ categoryId: categoryId })
            })

            await Promise.all(updatePromises)

        } catch (error) {
            console.error("error updateCategory", error);
        }
    }

    async delete(expenseId: string): Promise<void> {

        try {

            await firestore()
                .collection(Collections.EXPENSE)
                .doc(expenseId)
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
                    .doc(expense.expenseId)
                    .delete()
            })

            await Promise.all(deletePromises)

        } catch (error) {
            console.error("error deleteByBudgetId", error);
        }

    }

    async count({ userId, initialDate, finalDate }: QueryParams): Promise<number> {

        try {

            const expenseCount = await firestore()
                .collection(Collections.EXPENSE)
                .where(ExpenseKeys.DATE, ">=", initialDate)
                .where(ExpenseKeys.DATE, "<", finalDate)
                .where(ExpenseKeys.USER_ID, "==", userId)
                .count()
                .get()

            return expenseCount.data().count

        } catch (error) {
            console.error("error countExpenses", error);
            return 0
        }

    }


    // ----------------- transactions ----------------- //

    async copyTransaction(queryParamsCopy: QueryParams, pasteDate: string): Promise<void> {

        try {

            const db = firestore()

            await db.runTransaction(async transaction => {

                const expensesRef = db.collection(Collections.EXPENSE)
                const expenses = await this.getAll(queryParamsCopy)

                expenses.forEach(expense => {

                    const newDocRef = firestore().collection(Collections.EXPENSE).doc();

                    const newExpense: Expense = {
                        financeType: expense.financeType,
                        groupId: null,
                        userId: expense.userId,
                        name: expense.name,
                        amount: expense.amount,
                        categoryId: expense.categoryId,
                        date: pasteDate,
                        budgetId: expense.budgetId,
                        expenseId: newDocRef.id
                    }

                    transaction.set(expensesRef.doc(), newExpense)
                })

            })

        } catch (error) {
            console.error("error copyTransaction", error);
        }

    }

    async deleteTransaction(queryParams: QueryParams): Promise<void> {

        try {

            const db = firestore()

            await db.runTransaction(async transaction => {

                const expensesRef = db.collection(Collections.EXPENSE)
                const expenses = await this.getAll(queryParams)

                expenses.forEach(expense => {
                    transaction.delete(expensesRef.doc(expense.expenseId))
                })

            })


        } catch (error) {
            console.error("error deleteTransaction", error);
        }

    }


}

export default ExpenseRepository