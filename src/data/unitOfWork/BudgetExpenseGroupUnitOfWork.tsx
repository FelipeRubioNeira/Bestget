/**
 * BudgetExpenseUnitOfWork
 * 
 * Esta clase es reponsable de traer los ingresos y gastos haciendo
 * un join entre los repositorios de budget y expense.
 */


import { Collections } from "../collections/Collections";
import IBudgetGroupRepository from "../repository/budgetRepository/IBudgetGroupRepository";
import IExpenseGroupRepository from "../repository/expenseRepository/IExpenseGroupRepository";
import IExpenseRespository from "../repository/expenseRepository/IExpenseRepository";
import { Budget } from "../types/Budget";
import { Expense } from "../types/Expense";
import { QueryGroupParams, QueryParams } from "../types/QueryParams";
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';


class BudgetExpenseGroupUnitOfWork {
    constructor(
        private budgetGroupRepository: IBudgetGroupRepository,
        private expenseGroupRepository: IExpenseGroupRepository
    ) { }


    // ----------------- public methods ----------------- //
    async getBudgetsWithRemaining(queryGroupParams: QueryGroupParams): Promise<Budget[]> {

        const budgets = await this.budgetGroupRepository.getAll(queryGroupParams)
        const budgetIds = this.getBudgetIds(budgets)

        const expensesByBudget = await this.expenseGroupRepository.getAllByBudgetId(budgetIds)

        const budgetsWithRemaining = budgets.map(budget => {
            const expenses = this.filterExpensesByBudgetId(budget.budgetId, expensesByBudget)
            const remaining = this.calculateRemaining(budget.amount, expenses)

            return { ...budget, remaining }
        })


        return budgetsWithRemaining

    }

    async copyTransaction(
        copyDate: QueryGroupParams,
        pasteDate: string,
        budgetGroupRepository: IBudgetGroupRepository,
        expenseRepository: IExpenseGroupRepository
    ): Promise<void> {

        try {

            const db = firestore()

            await db.runTransaction(async transaction => {

                const budgetsRef = db.collection(Collections.BUDGET)
                const expensesRef = db.collection(Collections.EXPENSE)

                const budgets = await budgetGroupRepository.getAll(copyDate)

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

export default BudgetExpenseGroupUnitOfWork