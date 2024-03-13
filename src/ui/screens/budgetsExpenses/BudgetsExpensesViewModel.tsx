/*
    View model for the Expenses screen
*/

import { useEffect, useState } from "react"
import { BudgetsExpensesScreenProps } from "../../navigation/NavigationParamList"
import { ScreenRoutes } from "../../navigation/Routes"
import IExpenseRespository from "../../../data/repository/expenseRepository/IExpenseRepository"
import ICategoryRepository from "../../../data/repository/categoryRepository/ICategoryRespository"
import { Expense } from "../../../data/types/Expense"
import { currencyFormat, numberFormat } from "../../../utils/Convert"
import { Category } from "../../../data/types/Categoty"
import IBudgetRepository from "../../../data/repository/budgetRepository/IBudgetRepository"
import { Budget } from "../../../data/types/Budget"
import { BudgetExpenseItem, BudgetExpenseItemType } from "../../../data/types/BudgetExpense"

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

    const [budgetsExpenses, setBudgetsExpenses] = useState<BudgetExpenseItem[]>([])

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
        const budgetsList = applyFormat(budgets, categories, "Budget")
        const expensesList = applyFormat(expenses, categories, "Expense")



        setBudgetsExpenses([
            ...budgetsList,
            ...expensesList
        ])

        setLoading(false)

    }

    // apply to budgets and expenses
    const applyFormat = (
        budgetsOrExpenses: Budget[] | Expense[],
        categories: Category[],
        type: BudgetExpenseItemType
    ) => {

        return budgetsOrExpenses.map(item => {

            const { id, name, amount, categoryId, date } = item
            const category = findCategory(categoryId, categories)
            const amountFormatted = currencyFormat(amount)

            const budgetOrExpensItem: BudgetExpenseItem = {
                id: id,
                name: name,
                amount: amountFormatted,
                category: category,
                date: date,
                type: type
            }

            return budgetOrExpensItem

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

    const findItem = <T extends BudgetExpenseItemType>(id: string, type: T) => {
        return budgetsExpenses.find(item => item.id === id && item.type == type);
    };

    const findCategoryById = (id: number) => {
        return categories.find(category => category.id === id)
    }


    const onPressItem = (id: string, type: BudgetExpenseItemType) => {

        const budgetOrExpensItem = findItem(id, type)
        const amountInt = numberFormat(budgetOrExpensItem?.amount)
        const category = findCategoryById(budgetOrExpensItem?.category?.id as number)

        let finalObject = {
            id: budgetOrExpensItem?.id as string,
            name: budgetOrExpensItem?.name as string,
            amount: amountInt,
            categoryId: budgetOrExpensItem?.category?.id as number,
            date: budgetOrExpensItem?.date as string
        }


        if (type === "Budget") {

            const navigationObject = {
                budget: finalObject as Budget,
                category: category
            } 

            navigation.navigate(ScreenRoutes.BUDGET, navigationObject)

        } else {
            // type === "Expense"
        }


    }


    // ----------- return ----------- //
    return {
        loading,
        categories,
        buttonAddVisible,
        ExpenseOptionsVisible,
        totalAmount,
        budgetsExpenses,

        onShowExpenseOptions,
        onAddExpense,
        onAddBudget,
        onPressItem,

        onHideExpenseOptions,

    }

}

export default useBudgetExpensesViewModel