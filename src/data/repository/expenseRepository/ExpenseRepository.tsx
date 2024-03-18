import { Collections } from "../../collections/Collections";
import { Expense, ExpenseCreate, ExpenseKeys } from "../../types/Expense";
import IExpenseRespository from "./IExpenseRepository";
import firestore from '@react-native-firebase/firestore';
import QuerySnapshot from "@react-native-firebase/firestore";

class ExpenseRepository implements IExpenseRespository {


    async getAll(): Promise<Expense[]> {
        try {

            const expensesFirebase = await firestore()
                .collection(Collections.EXPENSE)
                .orderBy(ExpenseKeys.DATE, "desc")
                .get()

            const expensesArray: Expense[] = []

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
            console.error("error getExpenses repository", error);
            return []
        }
    }

    async getById(id: string): Promise<Expense[]> {

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

    async getWithoutBudget(): Promise<Expense[]> {

        try {

            const expensesFirebase = await firestore()
                .collection(Collections.EXPENSE)
                .where(ExpenseKeys.BUDGET_ID, "==", "")
                .get()


            const expensesArray: Expense[] = []

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

    async getTotal(): Promise<number> {

        try {

            const expensesFirebase = await firestore()
                .collection(Collections.EXPENSE)
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

            const expenses = await this.getById(budgetId)

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


    // ----------- helpers ----------- //


}

export default ExpenseRepository