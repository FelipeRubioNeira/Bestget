/*
    View model for the Expenses screen
*/
import React from "react"
import { useEffect, useState } from "react"
import { BudgetsExpensesScreenProps } from "../../../navigation/NavigationParamList"
import { ScreenRoutes } from "../../../navigation/Routes"
import IExpenseRespository from "../../../data/repository/expenseRepository/IExpenseRepository"
import { Expense, ExpenseUI } from "../../../data/types/Expense"
import { currencyFormat, numberFormat } from "../../../utils/NumberFormat"
import { Category } from "../../../data/types/Categoty"
import IBudgetRepository from "../../../data/repository/budgetRepository/IBudgetRepository"
import { Budget, BudgetUI } from "../../../data/types/Budget"
import { BudgetExpenseType } from "../../../data/types/BudgetExpense"
import TouchableIcon from "../../components/touchableIcon/TouchableIcon"
import { ButtonModal, ModalProps } from "../../components/modal/Modal"
import DeleteBudgetUseCase from "../../../domain/useCases/DeleteBudgetUseCase"
import { ValidationResult } from "../../../data/types/Validation"
import DeleteExpenseUseCase from "../../../domain/useCases/DeleteExpenseUseCase"
import DefaultStyles from "../../styles/DefaultStyles"
import { DateInterval } from "../../../data/types/DateInterval"
import DateTime from "../../../utils/DateTime"
import Icons from "../../../assets/icons"
import { useGlobalContext } from "../../../data/globalContext/GlobalContext"


// ----------- types ----------- //

type ExpensesViewModelProps = {
    expenseRepository: IExpenseRespository,
    budgetRepository: IBudgetRepository,
    deleteBudgetUseCase: DeleteBudgetUseCase,
    deleteExpenseUseCase: DeleteExpenseUseCase,
} & BudgetsExpensesScreenProps

export type BudgetOrExpense = "Budget" | "Expense"


// ----------- view model ----------- //
const useBudgetExpensesViewModel = ({
    navigation,
    route,
    expenseRepository,
    budgetRepository,
    deleteBudgetUseCase,
    deleteExpenseUseCase
}: ExpensesViewModelProps) => {


    // ----------- context ----------- //
    const {
        dateInterval,
        expensesContext,
        updateExpensesContext,
        budgetsContext,
        updateBudgetsContext,
        categoriesContext
    } = useGlobalContext()



    // ----------- params ----------- //
    const {
        newExpenseId,
        newBudgetId,
    } = route?.params || {}




    // ----------- states ----------- //
    const [totalAmount, setTotalAmount] = useState("0")

    const [buttonAddVisible, setButtonAddVisible] = useState(true)
    const [ExpenseOptionsVisible, setExpenseOptionsVisble] = useState(false)

    const [budgetsExpenses, setBudgetsExpenses] = useState<(BudgetUI | ExpenseUI)[]>([])

    const [loading, setLoading] = useState(false)

    const [editMode, setEditMode] = useState(false)

    const [modalState, setModalState] = useState<ModalProps>({
        visible: false,
        title: "",
        message: "",
        buttonList: []
    })




    // ----------- effects ----------- //
    // we add the delete button to the header if there are budget or expenses
    useEffect(() => {

        navigation.setOptions({
            headerRight: () => {
                if (budgetsExpenses.length === 0) return null
                return (
                    <TouchableIcon
                        image={Icons.edit}
                        onPress={() => setEditMode(!editMode)}
                    />
                )
            }
        })

    }, [budgetsExpenses, editMode])


    // first time we mount the component
    useEffect(() => {
        formatData(
            expensesContext,
            budgetsContext,
            categoriesContext
        )
    }, [expensesContext, budgetsContext])


    // when we navigate from create or edit
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (!newExpenseId && !newExpenseId) return
            getData(dateInterval)

        })

        return unsubscribe;

    }, [navigation, newExpenseId, newBudgetId])










    // ------------------ data methods ------------------ //

    const getData = async (dateInterval: DateInterval) => {

        setLoading(true)

        // 1- getExpenses and budgets
        const [expenses, budgets] = await Promise.all([
            getExpenses(dateInterval),
            getBudgets(dateInterval),
        ])

        formatData(expenses, budgets, categoriesContext)


        setLoading(false)

    }

    const getExpenses = async (dateInterval: DateInterval): Promise<Expense[]> => {
        const expenses = await expenseRepository.getAll(dateInterval)
        updateExpensesContext(expenses)
        return expenses
    }

    const getBudgets = async (dateInterval: DateInterval): Promise<Budget[]> => {
        const budgets = await budgetRepository.getAll(dateInterval)
        updateBudgetsContext(budgets)
        return budgets
    }

    const formatData = async (expenses: Expense[], budgets: Budget[], categories: Category[]) => {

        const expensesWithoutBudget = expenses.filter(expense => !expense.budgetId)

        const expensesList = applyFormat<Expense, ExpenseUI>(expensesWithoutBudget, categories, "Expense")
        const budgetsList = applyFormat<Budget, BudgetUI>(budgets, categories, "Budget")


        const totalExpenses = currencyFormat(calculateTotalExpenses(expensesContext))
        setTotalAmount(totalExpenses)


        setBudgetsExpenses([
            ...expensesList,
            ...budgetsList
        ])

    }



    const calculateTotalExpenses = (expenses: Expense[]): number => {
        let total = 0
        expenses.forEach(expense => total += expense.amount)
        return total
    }

    function applyFormat<
        T extends Budget | Expense,
        U extends ExpenseUI | BudgetUI
    >(
        items: T[],
        categories: Category[],
        type: BudgetOrExpense
    ) {


        return items.map(item => {

            const { id, name, amount, date, categoryId } = item as T

            const dateTime = new DateTime(date)
            const normalDate = dateTime.convertToNormalDate(dateTime.date)

            const category = findCategory(categoryId, categories)
            const amountFormatted = currencyFormat(amount)

            const newItem = {
                id: id,
                name: name,
                amount: amountFormatted,
                category: category,
                date: normalDate,
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



    // -------------------- utils ------------------- //
    const findItem = (id: string, type: BudgetExpenseType) => {
        return budgetsExpenses.find(item => item.id === id && item.type == type);
    }


    // ------------------ modal ------------------ //
    const showAlert = (title: string, message: string, buttonList: ButtonModal[]) => {
        setModalState({
            title: title,
            message: message,
            buttonList: buttonList,
            visible: true,
        })
    }

    const hideAlert = () => {
        setModalState({
            ...modalState,
            visible: false,
        })
    }


    // ----------- onPress flatList items ----------- //
    const onPressEdit = (itemId: string, type: BudgetExpenseType) => {

        setEditMode(false)

        const item = findItem(itemId, type)

        if (type === "Budget") {
            const budgetUI = convertToBudget(item as BudgetUI)
            navigation.navigate(ScreenRoutes.BUDGET_FORM, { budget: budgetUI })

        } else {
            const expense = convertToExpense(item as ExpenseUI)
            navigation.navigate(ScreenRoutes.EXPENSES_FORM, {
                expense: expense,
            })

        }

    }

    const onPressDelete = (itemId: string, type: BudgetExpenseType) => {


        const budgetMessage = "¿Estás seguro que deseas eliminar este presupuesto? Se eliminarán todos los gastos asociados."
        const expenseMessage = "¿Estás seguro que deseas eliminar este gasto?"

        const message = type === "Budget" ? budgetMessage : expenseMessage


        showAlert(
            "Eliminar",
            message,
            [{
                text: 'Aceptar',
                onPress: () => deleteItem(itemId, type),
            },
            {
                text: 'Cancelar',
                onPress: hideAlert,
                style: DefaultStyles.mainButton
            }]
        )


    }

    const deleteItem = async (itemId: string, type: BudgetExpenseType) => {

        hideAlert()

        let validationResult: ValidationResult<void> = {
            isValid: true,
            message: {
                title: "",
                message: ""
            },
        }

        const buttonItem: ButtonModal[] = [{
            text: "Aceptar",
            onPress: hideAlert,
        }]


        // if the item to delete is a budget, we delete all the expenses associated with it
        if (type === "Budget") {

            validationResult = await deleteBudgetUseCase.delete(itemId)

            const { title, message } = validationResult.message
            if (!validationResult.isValid) showAlert(title, message, buttonItem)

        }

        // if the item to delete is an expense
        else {

            validationResult = await deleteExpenseUseCase.delete(itemId)

            const { title, message } = validationResult.message
            if (!validationResult.isValid) showAlert(title, message, buttonItem)
        }

        // finally we update the data
        await getData(dateInterval)

    }



    // ---------------------- navigation ---------------------- //
    const onAddExpense = () => {
        setEditMode(false)
        onHideExpenseOptions()
        navigation.navigate(ScreenRoutes.EXPENSES_FORM, {})
    }

    const onAddBudget = () => {
        setEditMode(false)
        onHideExpenseOptions()
        navigation.navigate(ScreenRoutes.BUDGET_FORM, {})
    }

    const onPressItem = (id: string, type: BudgetExpenseType) => {

        setEditMode(false)

        const itemToNavigate = generateBudget(id)

        if (type === "Budget") {

            navigation.navigate(ScreenRoutes.BUDGET, {
                budget: itemToNavigate,
            })

        } else {
            // type === "Expense"
            // ... future implementation
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


    // ------------------ UI ------------------ //
    const onShowExpenseOptions = () => {
        setButtonAddVisible(false)
        setExpenseOptionsVisble(true)
    }

    const onHideExpenseOptions = () => {
        setButtonAddVisible(true)
        setExpenseOptionsVisble(false)
    }


    // ----------- return ----------- //
    return {
        modalState,
        editMode,
        loading,
        categories: categoriesContext,
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