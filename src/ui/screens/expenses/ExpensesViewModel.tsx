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


type ExpensesViewModelProps = {
    expenseRepository: IExpenseRespository,
    categoryRepository: ICategoryRepository,
} & ExpensesScreenProps

export interface ExpenseFormatted {
    name: string,
    amount: string,
    category: Category | undefined
}





const useExpensesViewModel = ({
    navigation,
    route,
    expenseRepository,
    categoryRepository
}: ExpensesViewModelProps) => {


    // ----------- states ----------- //
    const [totalAmount, setTotalAmount] = useState("0")

    const [buttonAddVisible, setButtonAddVisible] = useState(true)
    const [ExpenseOptionsVisible, setExpenseOptionsVisble] = useState(false)

    const [expenses, setExpenses] = useState<ExpenseFormatted[]>([])
    const [categories, setCategories] = useState<Category[]>([])


    // ----------- effects ----------- //
    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (route.params?.newExpenseId) getData()
    }, [route.params?.newExpenseId])


    // ----------- methods ----------- //
    const getData = async () => {

        //1 - getExpenses and getCategories
        const [expenses, categories] = await Promise.all([
            getExpenses(),
            getCategories()
        ])



        //2- setCategories
        setCategories(categories)


        //3 - calculateTotalAmount
        calculateTotalAmount(expenses)


        //4- applyExpensesFormat
        const expensesFormatted = applyExpensesFormat(expenses, categories)
        setExpenses(expensesFormatted)

    }

    const getExpenses = async (): Promise<Expense[]> => {
        const expensesRespository = await expenseRepository.getExpenses()
        return expensesRespository
    }

    const applyExpensesFormat = (expenses: Expense[], categories: Category[]): ExpenseFormatted[] => {

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

    const getCategories = async (): Promise<Category[]> => {
        const categories = await categoryRepository.getCategories()
        return categories
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
    }

    const onHideExpenseOptions = () => {
        setButtonAddVisible(true)
        setExpenseOptionsVisble(false)
    }


    return {
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