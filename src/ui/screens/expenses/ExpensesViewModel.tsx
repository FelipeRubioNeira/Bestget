/*
    View model for the Expenses screen
*/

import { useEffect, useState } from "react"
import { ExpensesScreenProps } from "../../navigation/NavigationParamList"
import { ScreenRoutes } from "../../navigation/Routes"
import IExpenseRespository from "../../../data/repository/expenseRepository/IExpenseRepository"
import ICategoryRepository from "../../../data/repository/categoryRepository/ICategoryRespository"
import Expense from "../../../data/types/Expense"
import { currencyFormat } from "../../../utils/Convert"
import { Category } from "../../../data/types/Categoty"
import IBudgetRepository from "../../../data/repository/budgetRepository/IBudgetRepository"
import { Budget } from "../../../data/types/Budget"

// ----------- interfaces and types ----------- //

type ExpensesViewModelProps = {
    expenseRepository: IExpenseRespository,
    budgetRepository: IBudgetRepository,
    categoryRepository: ICategoryRepository,
} & ExpensesScreenProps

export interface ExpenseFormatted {
    name: string,
    amount: string,
    category: Category | undefined
}


// ----------- view model ----------- //
const useExpensesViewModel = ({
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

    const [expenses, setExpenses] = useState<ExpenseFormatted[]>([])
    const [categories, setCategories] = useState<Category[]>([])

    const [loading, setLoading] = useState(false)


    // ----------- effects ----------- //
    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (route.params?.newExpenseId) getData()
    }, [route.params?.newExpenseId])


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


        //4- applyExpensesFormat
        const expensesFormatted = applyExpensesFormat(expenses, budgets, categories)
        setExpenses(expensesFormatted)


        setLoading(false)


    }


    const applyExpensesFormat = (
        expenses: Expense[],
        budgets: Budget[],
        categories: Category[]
    ): ExpenseFormatted[] => {

        const expensesFormatted = expenses.map(expense => {

            let category = findCategory(expense.categoryId, categories)

            const expenseFormatted: ExpenseFormatted = {
                name: expense.name,
                amount: currencyFormat(expense.amount),
                category: category
            }

            return expenseFormatted

        })

        return expensesFormatted

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
        expenses,
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

export default useExpensesViewModel