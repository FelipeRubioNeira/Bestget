/*
    View model for the Expenses screen
*/

import { useEffect, useState } from "react"
import { BudgetsExpensesScreenProps } from "../../navigation/NavigationParamList"
import { ScreenRoutes } from "../../navigation/Routes"
import IExpenseRespository from "../../../data/repository/expenseRepository/IExpenseRepository"
import ICategoryRepository from "../../../data/repository/categoryRepository/ICategoryRespository"
import { Expense, ExpenseItem } from "../../../data/types/Expense"
import { currencyFormat } from "../../../utils/Convert"
import { Category } from "../../../data/types/Categoty"
import IBudgetRepository from "../../../data/repository/budgetRepository/IBudgetRepository"
import { Budget, BudgetItem } from "../../../data/types/Budget"
import {BudgetExpense} from "../../../data/types/BudgetExpense"

// ----------- interfaces and types ----------- //

type ExpensesViewModelProps = {
    expenseRepository: IExpenseRespository,
    budgetRepository: IBudgetRepository,
    categoryRepository: ICategoryRepository,
} & BudgetsExpensesScreenProps



// ----------- view model ----------- //
const useBudgetExpensesViewModel = ({
    navigation,
    route,
    expenseRepository,
    budgetRepository,
    categoryRepository
}: ExpensesViewModelProps) => {


    // ----------- states ----------- //
    const [totalAmount, setTotalAmount] = useState("0")

    const [buttonAddVisible, setButtonAddVisible] = useState(true)
    const [ExpenseOptionsVisible, setExpenseOptionsVisble] = useState(false)

    const [categories, setCategories] = useState<Category[]>([])
    const [budgetsExpenses, setBudgetsExpenses] = useState<BudgetExpense[]>([])

    const [loading, setLoading] = useState(false)


    // ----------- effects ----------- //
    useEffect(() => {
        getData()
    }, [])

    // ----------- methods ----------- //
    const getData = async () => {


        setLoading(true)


        //1 - getExpenses and getCategories
        const [expenses, budgets, categories] = await Promise.all([
            expenseRepository.getExpenses(),
            budgetRepository.getAll(),
            categoryRepository.getCategories()
        ])


        //2- setCategories
        setCategories(categories)


        //3 - calculateTotalAmount
        calculateTotalAmount(expenses)


        // 4 - fill the lists
        const budgetsList = applyBudgetFormat(budgets, categories)
        const expensesList = applyExpenseFormat(expenses, categories)


        setLoading(false)


    }

    const applyBudgetFormat = (budgets: Budget[], categories: Category[]) => {

        return budgets.map(budget => {

            const { id, name, amount, categoryId, date } = budget
            const category = findCategory(categoryId, categories)

            const budgetItem: BudgetItem = {
                id: id,
                name: name,
                amount: amount,
                category: category,
                date: date
            }

            return budgetItem

        })

    }

    const applyExpenseFormat = (expenses: Expense[], categories: Category[]) => {

        return expenses.map(expense => {

            const { id, name, amount, categoryId, date } = expense
            const category = findCategory(expense.categoryId, categories)

            const expenseItem: ExpenseItem = {
                id: id,
                name: name,
                amount: amount,
                date: date,
                category: category
            }

            return expenseItem

        })
    }

    const findCategory = (categoryId: number, categories: Category[]): Category | undefined => {
        if (!categoryId) return undefined
        else if (categories.length === 0) return undefined
        else return categories.find(category => category.id === categoryId)
    }

    const calculateTotalAmount = (expeses: Expense[]) => {
        let totalAmount = 0
        expeses.forEach(expense => totalAmount += expense.amount)
        setTotalAmount(currencyFormat(totalAmount))
    }

    const onShowExpenseOptions = () => {
        setButtonAddVisible(false)
        setExpenseOptionsVisble(true)
    }

    const onAddExpense = () => {
        onHideExpenseOptions()
        navigation.navigate(ScreenRoutes.EXPENSES_CREATE, {
            categoryList: categories
        })
    }

    const onAddBudget = () => {
        onHideExpenseOptions()
        navigation.navigate(ScreenRoutes.BUDGETS_CREATE, {
            categoryList: categories
        })
    }

    const onHideExpenseOptions = () => {
        setButtonAddVisible(true)
        setExpenseOptionsVisble(false)
    }


    // ----------- return ----------- //
    return {
        loading,
        categories,
        buttonAddVisible,
        ExpenseOptionsVisible,
        totalAmount,

        onShowExpenseOptions,
        onAddExpense,
        onAddBudget,

        onHideExpenseOptions,

    }

}

export default useBudgetExpensesViewModel