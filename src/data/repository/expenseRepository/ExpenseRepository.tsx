import { Collections } from "../../collections/Collections";
import Expense from "../../types/Expense";
import IExpenseRespository from "./IExpenseRepository";
import firestore from '@react-native-firebase/firestore';

class ExpenseRepository implements IExpenseRespository {

    async getExpenses(): Promise<Expense[]> {

        try {

            const expensesFirebase = await firestore().collection(Collections.EXPENSE).get()

            const expensesArray: Expense[] = []

            expensesFirebase.docs.forEach(doc => {

                const { name, amount, categoryId } = doc.data()

                const newExpense: Expense = {
                    id: doc.id,
                    name: name,
                    amount: amount,
                    categoryId: categoryId
                }
                expensesArray.push(newExpense)
            })

            return expensesArray

        } catch (error) {
            console.error("error getExpenses repository", error);
            return []
        }

    }

}

export default ExpenseRepository