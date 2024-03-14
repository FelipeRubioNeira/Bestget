/*
    View model for the Expenses screen
*/

import { useEffect, useState } from "react"
import { BudgetsExpensesScreenProps } from "../../../navigation/NavigationParamList"
import { ScreenRoutes } from "../../../navigation/Routes"
import IExpenseRespository from "../../../data/repository/expenseRepository/IExpenseRepository"
import { Expense, ExpenseUI } from "../../../data/types/Expense"
import { currencyFormat, numberFormat } from "../../../utils/Convert"
import { Category } from "../../../data/types/Categoty"
import IBudgetRepository from "../../../data/repository/budgetRepository/IBudgetRepository"
import { Budget, BudgetUI } from "../../../data/types/Budget"
import { BudgetExpenseItemType } from "../../../data/types/BudgetExpense"

// ----------- interfaces and types ----------- //

type ExpensesViewModelProps = {
    expenseRepository: IExpenseRespository,
    budgetRepository: IBudgetRepository,
} & BudgetsExpensesScreenProps

export type BudgetOrExpense = "Budget" | "Expense"


// ----------- view model ----------- //
const useBudgetExpensesViewModel = ({
    navigation,
    route,
    expenseRepository,
    budgetRepository,
}: ExpensesViewModelProps) => {



    // ----------- params ----------- //
    const {
        categoryList = [],
        newExpenseId,
        newBudgetId
    } = route?.params || {}



    // ----------- states ----------- //
    const [totalAmount, setTotalAmount] = useState("0")

    const [buttonAddVisible, setButtonAddVisible] = useState(true)
    const [ExpenseOptionsVisible, setExpenseOptionsVisble] = useState(false)

    const [categories, setCategories] = useState<Category[]>([])

    const [budgetsExpenses, setBudgetsExpenses] = useState<(BudgetUI | ExpenseUI)[]>([])

    const [loading, setLoading] = useState(false)



    // ----------- effects ----------- //
    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            getData(categoryList)
            setCategories(categoryList)
        })

        return unsubscribe;

    }, [])


    useEffect(() => {

        if (!newExpenseId && newExpenseId) return
        getData(categoryList)
        setCategories(categoryList)

    }, [newExpenseId, newBudgetId])




    // ########## methods ########## //



    // ----------- get data ----------- //
    const getData = async (categoryList: Category[]) => {

        setLoading(true)

        //1 - getExpenses and getCategories
        const [budgets, expenses] = await Promise.all([
            budgetRepository.getAll(),
            expenseRepository.getWithoutBudget(),
        ])


        //3 - calculateTotalAmount
        calculateTotalAmount(expenses)


        // 4 - fill the lists
        const budgetsList = applyFormat<Budget, BudgetUI>(budgets, categoryList, "Budget")
        const expensesList = applyFormat<Expense, ExpenseUI>(expenses, categoryList, "Expense")


        setBudgetsExpenses([
            ...budgetsList,
            ...expensesList
        ])

        setLoading(false)

    }

    function applyFormat<T extends Budget | Expense, U>(
        items: T[],
        categories: Category[],
        type: BudgetOrExpense
    ) {

        return items.map(item => {

            const { id, name, amount, date, categoryId } = item as T

            const category = findCategory(categoryId, categories)
            const amountFormatted = currencyFormat(amount)

            const newItem = {
                id: id,
                name: name,
                amount: amountFormatted,
                category: category,
                date: date,
                type: type
            } as U

            return newItem

        })

    }

    const findCategory = (categoryId: number = 0, categories: Category[]): Category | undefined => {
        if (!categoryId) return undefined
        else if (categories.length === 0) return undefined
        else return categories.find(category => category.id === categoryId)
    }


    // ----------- ui interaction ----------- //

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



    // ----------- navigation ----------- //
    const onPressItem = (id: string, type: BudgetExpenseItemType) => {


        const [itemToNavigate, category] = createItemToNavigate(id, type)


        if (type === "Budget") {

            const navigationObject = {
                budget: itemToNavigate as Budget,
                categoryList: categoryList
            }

            navigation.navigate(ScreenRoutes.BUDGET, navigationObject)

        } else {
            // type === "Expense"
        }


    }

    const createItemToNavigate = (id: string, type: BudgetExpenseItemType) => {

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

        return [finalObject, category]

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