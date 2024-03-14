import { Collections } from "../../collections/Collections";
import { Expense, ExpenseCreate, ExpenseKey } from "../../types/Expense";
import IExpenseRespository from "./IExpenseRepository";
import firestore from '@react-native-firebase/firestore';

class ExpenseRepository implements IExpenseRespository {

    async getAll(): Promise<Expense[]> {

        try {

            const expensesFirebase = await firestore()
                .collection(Collections.EXPENSE)
                .orderBy(ExpenseKey.DATE, "desc")
                .get()

            const expensesArray: Expense[] = []

            expensesFirebase.docs.forEach(doc => {

                const { name, amount, categoryId, date } = doc.data() as Expense

                const newExpense: Expense = {
                    id: doc.id,
                    name: name,
                    amount: amount,
                    categoryId: categoryId,
                    date: date
                }
                expensesArray.push(newExpense)
            })

            return expensesArray

        } catch (error) {
            console.error("error getExpenses repository", error);
            return []
        }

    }

    async create(expense: ExpenseCreate): Promise<string> {

        try {
            
            const result = await firestore().collection(Collections.EXPENSE).add(expense)
            const expenseId = result.id

            return (expenseId)

        } catch (error) {
            console.error("error ExpenseRepository create", error);
            return ""
        }

    }

}

export default ExpenseRepository