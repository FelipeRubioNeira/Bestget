/**
 * BudgetExpenseUnitOfWork
 * 
 * Esta clase es reponsable de traer los ingresos y gastos haciendo
 * un join entre los repositorios de budget y expense.
 */


import { Collections } from "../collections/Collections";
import IBudgetRepository from "../repository/budgetRepository/IBudgetRepository";
import IExpenseRespository from "../repository/expenseRepository/IExpenseRepository";
import { Budget } from "../types/Budget";
import { Expense } from "../types/Expense";
import { QueryParams } from "../types/QueryParams";
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';


class BudgetExpenseUnitOfWork {
    constructor(
        private budgetRepository: IBudgetRepository,
        private expenseRepository: IExpenseRespository
    ) { }


    // ----------------- public methods ----------------- //
    async getBudgetsWithRemaining(queryParams: QueryParams): Promise<Budget[]> {

        const budgets = await this.budgetRepository.getAll(queryParams)
        const budgetIds = this.getBudgetIds(budgets)

        const expensesByBudget = await this.expenseRepository.getAllByBudgetId(budgetIds)

        const budgetsWithRemaining = budgets.map(budget => {
            const expenses = this.filterExpensesByBudgetId(budget.budgetId, expensesByBudget)
            const remaining = this.calculateRemaining(budget.amount, expenses)

            return { ...budget, remaining }
        })


        return budgetsWithRemaining

    }

    async copyTransaction(
        copyDate: QueryParams,
        pasteDate: string,
        budgetRepository: IBudgetRepository,
        expenseRepository: IExpenseRespository
    ): Promise<void> {

        try {

            const db = firestore()

            await db.runTransaction(async transaction => {

                const budgetsRef = db.collection(Collections.BUDGET)
                const expensesRef = db.collection(Collections.EXPENSE)

                const budgets = await budgetRepository.getAll(copyDate)

                // Uso de bucle for...of para manejar correctamente las operaciones asíncronas
                for (const budget of budgets) {

                    const newBudgetRef = budgetsRef.doc(); // Crear referencia de nuevo documento
                    const newBudget = {
                        ...budget, // Copia todas las propiedades existentes
                        date: pasteDate,
                        budgetId: newBudgetRef.id // Usar el nuevo ID
                    };

                    transaction.set(newBudgetRef, newBudget); // Crear el nuevo budget en la transacción

                    const expenses = await expenseRepository.getAllByBudgetId([budget.budgetId]);

                    for (const expense of expenses) {
                        this.createExpense(
                            expense,
                            pasteDate,
                            newBudgetRef.id,
                            expensesRef,
                            transaction
                        )
                    }
                }


                // expenses without a budgetId
                const expensesWithoutBudget = await expenseRepository.getWithoutBudget(copyDate);

                for (const expense of expensesWithoutBudget) {
                    this.createExpense(expense, pasteDate, "", expensesRef, transaction);
                }


            });
        } catch (error) {
            console.error("error en copyTransaction", error);
        }
    }

    private createExpense = (
        expense: Expense,
        pasteDate: string,
        budgetId: string,
        expensesRef: FirebaseFirestoreTypes.DocumentData,
        transaction: FirebaseFirestoreTypes.Transaction) => {

        const newExpenseRef = expensesRef.doc(); // Crear referencia de nuevo documento

        const newExpense = {
            ...expense, // Copia todas las propiedades existentes
            date: pasteDate,
            budgetId: budgetId, // Vincular al nuevo budget
            expenseId: newExpenseRef.id // Usar el nuevo ID
        };

        transaction.set(newExpenseRef, newExpense); // Crear el nuevo

    }



    // ----------------- private methods ----------------- //
    private getBudgetIds = (budgets: Budget[]) => {
        return budgets.map(budget => budget.budgetId)
    }

    private filterExpensesByBudgetId = (budgetId: string, expenses: Expense[]) => {
        return expenses.filter(expense => expense.budgetId === budgetId)
    }

    private calculateRemaining = (budgetAmount: number, expenses: Expense[]) => {

        let totalExpenses = 0
        expenses.forEach(expense => totalExpenses += expense.amount)

        return budgetAmount - totalExpenses
    }


}

export default BudgetExpenseUnitOfWork