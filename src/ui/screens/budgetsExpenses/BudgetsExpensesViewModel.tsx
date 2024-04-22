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



    // ----------- params ----------- //
    const {
        categoryList,
        newExpenseId,
        newBudgetId,
        dateInterval
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
        buttonList: []
    })




    // ----------- effects ----------- //
    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            getData(categoryList, dateInterval)
        })

        return unsubscribe;

    }, [navigation])


    useEffect(() => {

        if (!newExpenseId && newExpenseId) return
        getData(categoryList, dateInterval)
        setCategories(categoryList)

    }, [categoryList, newExpenseId, newBudgetId])


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





    // ----------- methods ----------- //


    // ----------- get data ----------- //
    const getData = async (categoryList: Category[], dateInterval: DateInterval) => {

        setLoading(true)

        //1 - getExpenses and getCategories
        const [budgets, expenses, total] = await Promise.all([
            budgetRepository.getAll(dateInterval),
            expenseRepository.getWithoutBudget(dateInterval),
            expenseRepository.getTotal(dateInterval)
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


    // ----------- ui interaction ----------- //
    const onShowExpenseOptions = () => {
        setButtonAddVisible(false)
        setExpenseOptionsVisble(true)
    }

    const onHideExpenseOptions = () => {
        setButtonAddVisible(true)
        setExpenseOptionsVisble(false)
    }

    const findItem = (id: string, type: BudgetExpenseType) => {
        return budgetsExpenses.find(item => item.id === id && item.type == type);
    }


    // ----------- modal ----------- //
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

            const budget = convertToBudget(item as BudgetUI)

            navigation.navigate(ScreenRoutes.BUDGET_FORM, {
                categoryList: categories,
                budget: budget,
                dateInterval: dateInterval
            })

        } else {

            const expense = convertToExpense(item as ExpenseUI)

            navigation.navigate(ScreenRoutes.EXPENSES_FORM, {
                categoryList: categories,
                expense: expense,
                dateInterval: dateInterval
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
        await getData(categoryList, dateInterval)

    }



    // ----------- navigation ----------- //
    const onAddExpense = () => {
        setEditMode(false)
        onHideExpenseOptions()
        navigation.navigate(ScreenRoutes.EXPENSES_FORM, {
            categoryList: categories,
            dateInterval: dateInterval
        })
    }

    const onAddBudget = () => {
        setEditMode(false)
        onHideExpenseOptions()
        navigation.navigate(ScreenRoutes.BUDGET_FORM, {
            categoryList: categories,
            dateInterval: dateInterval
        })
    }

    const onPressItem = (id: string, type: BudgetExpenseType) => {

        setEditMode(false)

        const itemToNavigate = generateBudget(id)

        if (type === "Budget") {

            const navigationObject = {
                budget: itemToNavigate,
                categoryList: categoryList,
                dateInterval
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