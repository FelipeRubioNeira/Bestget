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
import TouchableIcon from "../../components/touchableIcon/TouchableIcon"
import { ModalProps } from "../../components/modal/Modal"
import DeleteBudgetUseCase from "../../../domain/useCases/DeleteBudgetUseCase"

const editIcon = require("../../../assets/icons/ic_edit.png")


// ----------- interfaces and types ----------- //

type ExpensesViewModelProps = {
    expenseRepository: IExpenseRespository,
    budgetRepository: IBudgetRepository,
    deleteBudgetUseCase: DeleteBudgetUseCase
} & BudgetsExpensesScreenProps

export type BudgetOrExpense = "Budget" | "Expense"


// ----------- view model ----------- //
const useBudgetExpensesViewModel = ({
    navigation,
    route,
    expenseRepository,
    budgetRepository,
    deleteBudgetUseCase
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

    const [editMode, setEditMode] = useState(false)

    const [modalState, setModalState] = useState<ModalProps>({
        visible: false,
        title: "",
        message: "",
    })

    const [selectedItemToDelete, setSelectedItemToDelete] = useState({
        id: "",
        type: "Budget" as BudgetExpenseItemType
    })



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


    // we add the delete button to the header if there are budget or expenses
    useEffect(() => {

        navigation.setOptions({
            headerRight: () => {
                if (budgetsExpenses.length === 0) return null
                return (
                    <TouchableIcon
                        image={editIcon}
                        onPress={() => setEditMode(!editMode)}
                    />
                )
            }
        })

    }, [budgetsExpenses, editMode])





    // ----------- methods ----------- //


    // ----------- get data ----------- //
    const getData = async (categoryList: Category[]) => {

        setLoading(true)

        //1 - getExpenses and getCategories
        const [budgets, expenses, total] = await Promise.all([
            budgetRepository.getAll(),
            expenseRepository.getWithoutBudget(),
            expenseRepository.getTotal()
        ])


        //3 - calculateTotalAmount
        const totalCurrency = currencyFormat(total)
        setTotalAmount(totalCurrency)


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

    const convertToBudget = (item: BudgetUI): Budget => {
        return convertTo<Budget>(item)
    }

    const convertToExpense = (item: ExpenseUI, budgetId?: string): Expense => {

        const expense: Expense = {
            ...convertTo<Expense>(item),
            budgetId: budgetId || ""
        }

        return expense
    }

    function convertTo<T extends Budget | Expense>(item?: BudgetUI | ExpenseUI) {

        if (!item) return {} as T

        const { id, name, amount, date, category } = item
        const amountInt = numberFormat(amount)
        const categoryId = category?.id || 0

        return {
            id: id,
            name: name,
            amount: amountInt,
            date: date,
            categoryId: categoryId
        } as T

    }


    // ----------- ui interaction ----------- //
    const onShowExpenseOptions = () => {
        setButtonAddVisible(false)
        setExpenseOptionsVisble(true)
    }

    const onHideExpenseOptions = () => {
        setButtonAddVisible(true)
        setExpenseOptionsVisble(false)
    }

    const findItem = (id: string, type: BudgetExpenseItemType) => {
        return budgetsExpenses.find(item => item.id === id && item.type == type);
    }


    // ----------- modal ----------- //
    const showAlert = (title: string, message: string) => {
        setModalState({
            visible: true,
            title: title,
            message: message
        })
    }

    const hideAlert = () => {
        setModalState({
            ...modalState,
            visible: false,
        })
    }


    // ----------- onPress flatList items ----------- //
    const onPressEdit = (itemId: string, type: BudgetExpenseItemType) => {

        setEditMode(false)

        const item = findItem(itemId, type)

        if (type === "Budget") {

            const budget = convertToBudget(item as BudgetUI)

            navigation.navigate(ScreenRoutes.BUDGET_FORM, {
                categoryList: categories,
                budget: budget
            })

        } else {

            const expense = convertToExpense(item as ExpenseUI)

            navigation.navigate(ScreenRoutes.EXPENSES_FORM, {
                categoryList: categories,
                expense: expense
            })
            
        }

    }

    const onPressDelete = (itemId: string, type: BudgetExpenseItemType) => {

        const budgetMessage = "¿Estás seguro que deseas eliminar este presupuesto? Se eliminarán todos los gastos asociados."
        const expenseMessage = "¿Estás seguro que deseas eliminar este gasto?"

        const message = type === "Budget" ? budgetMessage : expenseMessage

        showAlert("Eliminar", message)

        setSelectedItemToDelete({
            id: itemId,
            type: type
        })
    }

    const deleteItem = async () => {

        hideAlert()

        // if the item to delete is a budget, we delete all the expenses associated with it
        if (selectedItemToDelete.type === "Budget") await deleteBudgetUseCase.delete(selectedItemToDelete.id)

        // if the item to delete is an expense, we just delete it
        else await expenseRepository.delete(selectedItemToDelete.id)

        // finally we update the data
        await getData(categoryList)

    }



    // ----------- navigation ----------- //
    const onAddExpense = () => {
        setEditMode(false)
        onHideExpenseOptions()
        navigation.navigate(ScreenRoutes.EXPENSES_FORM, {
            categoryList: categories
        })
    }

    const onAddBudget = () => {
        setEditMode(false)
        onHideExpenseOptions()
        navigation.navigate(ScreenRoutes.BUDGET_FORM, {
            categoryList: categories
        })
    }

    const onPressItem = (id: string, type: BudgetExpenseItemType) => {

        setEditMode(false)

        const itemToNavigate = generateBudget(id)

        if (type === "Budget") {

            const navigationObject = {
                budget: itemToNavigate,
                categoryList: categoryList
            }

            navigation.navigate(ScreenRoutes.BUDGET, navigationObject)

        } else {
            // type === "Expense"
        }

    }

    const generateBudget = (id: string): Budget => {

        const budgetOrExpensItem = findItem(id, "Budget")
        const amountInt = numberFormat(budgetOrExpensItem?.amount)


        const navigationObject = {
            id: budgetOrExpensItem?.id || "",
            name: budgetOrExpensItem?.name || "",
            amount: amountInt,
            categoryId: budgetOrExpensItem?.category?.id,
            date: budgetOrExpensItem?.date || "",
        }

        return navigationObject

    }


    // ----------- return ----------- //
    return {
        modalState,
        editMode,
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
        onPressEdit,
        onPressDelete,
        deleteItem,
        showAlert,
        hideAlert,
    }

}

export default useBudgetExpensesViewModel