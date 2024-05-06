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
import { ModalButtonList, ModalProps } from "../../components/modal/Modal"
import DeleteBudgetUseCase from "../../../domain/useCases/DeleteBudgetUseCase"
import { ValidationResult } from "../../../data/types/Validation"
import DeleteExpenseUseCase from "../../../domain/useCases/DeleteExpenseUseCase"
import DefaultStyles from "../../styles/DefaultStyles"
import { DateInterval } from "../../../data/types/DateInterval"
import DateTime from "../../../utils/DateTime"
import Icons from "../../../assets/icons"
import { useGlobalContext } from "../../../data/globalContext/GlobalContext"
import { useEventBus } from "../../../data/globalContext/events/EventBus"
import { Event } from "../../../data/globalContext/events/EventBusReducer"
import BudgetExpenseRepository from "../../../data/repository/budgetExpenseRepository/BudgetExpenseRepository"


const dateTime = new DateTime()

// ----------- types ----------- //

type ExpensesViewModelProps = {
    expenseRepository: IExpenseRespository,
    budgetRepository: IBudgetRepository,
    budgetExpenseRepository: BudgetExpenseRepository,
    deleteBudgetUseCase: DeleteBudgetUseCase,
    deleteExpenseUseCase: DeleteExpenseUseCase,
} & BudgetsExpensesScreenProps

export type BudgetOrExpense = "Budget" | "Expense"


// ----------- view model ----------- //
const useBudgetExpensesViewModel = ({
    navigation,
    expenseRepository,
    budgetExpenseRepository,
    deleteBudgetUseCase,
    deleteExpenseUseCase
}: ExpensesViewModelProps) => {


    // ----------- context ----------- //

    const {
        emmitEvent,
        budgetsQueue,
        expensesQueue,
        consumeBudgetsQueue,
        consumeExpensesQueue
    } = useEventBus()


    const {
        dateInterval,
        expensesContext,
        updateExpensesContext,
        budgetsContext,
        updateBudgetsContext,
        categoriesContext
    } = useGlobalContext()



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




    // ------------------ effects ------------------ //

    // header right button
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


    // first time we mount the component and when we change expenses or budgets
    useEffect(() => {
        formatData({
            expenses: expensesContext,
            budgets: budgetsContext,
            categories: categoriesContext
        })
    }, [])


    //when we navigate from create or edit
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            handleEvents({
                expensesQueue,
                budgetsQueue
            })
        })

        return unsubscribe;

    }, [
        navigation,         // navigation
        budgetsQueue,        // event of budget created on budget form
        expensesQueue        // event of expense created base on budget 
    ])











    // ------------------ data methods ------------------ //
    const handleEvents = async (queues: {
        budgetsQueue: Event[],
        expensesQueue: Event[]
    }) => {

        setLoading(true)

        const dataToFormat = await evaluateEvents(queues)

        // we get keys from object to know if there is data
        const thereIsData = Object.keys(dataToFormat).length > 0

        if (!thereIsData) return setLoading(false)

        formatData(dataToFormat)
        setLoading(false)


    }


    // evaluate events and return new data if there are
    const evaluateEvents = async (queues: {
        budgetsQueue: Event[],
        expensesQueue: Event[]
    }) => {

        const [newBudgets, newExpenses] = await Promise.all([
            updateBudgetsIfNeeded(queues),
            queues.expensesQueue.length > 0 ? updateExpenses() : Promise.resolve([])
        ]);

        const dataToFormat = {
            ...(newBudgets.length > 0 && { budgets: newBudgets }),
            ...(newExpenses.length > 0 && { expenses: newExpenses })
        }

        return dataToFormat

    }

    const updateBudgetsIfNeeded = async (queues: {
        budgetsQueue: Event[],
        expensesQueue: Event[]
    }) => {

        const thereAreNewBudgetExpenses = queues.expensesQueue.some(event => event.eventName.includes("FROM.BUDGET"))

        if (queues.budgetsQueue.length > 0 || thereAreNewBudgetExpenses) {
            return updateBudgets();
        }

        return Promise.resolve([]);
    };

    const updateBudgets = async () => {
        consumeBudgetsQueue()
        return getBudgets(dateInterval)
    }

    const updateExpenses = async () => {
        consumeExpensesQueue()
        return getExpenses(dateInterval)
    }

    const getData = async (dateInterval: DateInterval) => {

        setLoading(true)

        // 1- getExpenses and budgets
        const [expenses, budgets] = await Promise.all([
            getExpenses(dateInterval),
            getBudgets(dateInterval),
        ])

        formatData({
            expenses,
            budgets,
            categories: categoriesContext
        })


        setLoading(false)

    }

    const getExpenses = async (dateInterval: DateInterval): Promise<Expense[]> => {
        const expenses = await expenseRepository.getAll(dateInterval)
        updateExpensesContext(expenses)
        return expenses
    }

    const getBudgets = async (dateInterval: DateInterval): Promise<Budget[]> => {
        const budgetWithRemaining = await budgetExpenseRepository.getAllWithRemaining(dateInterval)
        updateBudgetsContext(budgetWithRemaining)
        return budgetWithRemaining
    }


    // ------------------ format data ------------------ //
    const formatData = async (data: {
        budgets?: Budget[],
        expenses?: Expense[],
        categories?: Category[]
    }) => {


        // if we don't receive data, we use the context
        const {
            expenses = expensesContext,
            budgets = budgetsContext,
            categories = categoriesContext
        } = data


        const expensesWithoutBudget = getExpensesWithoutBudget(expenses)
        const budgetsList = applyBudgetFormat(budgets, categories)
        const expensesList = applyFormat<Expense, ExpenseUI>(expensesWithoutBudget, categories, "Expense")

        const totalExpenses = currencyFormat(
            calculateTotalExpenses(expenses)
        )

        setTotalAmount(totalExpenses)

        setBudgetsExpenses([
            ...expensesList,
            ...budgetsList
        ])

    }

    const getExpensesWithoutBudget = (expenses: Expense[]): Expense[] => {
        return expenses.filter(expense => !expense.budgetId)
    }

    const calculateTotalExpenses = (expenses: Expense[]): number => {
        let total = 0
        expenses.forEach(expense => total += expense.amount)
        return total
    }

    const applyBudgetFormat = (budgets: Budget[], categories: Category[]): BudgetUI[] => {


        return budgets.map(budget => {

            const { id, name, amount, date, categoryId, remaining } = budget

            const normalDate = dateTime.convertToNormalDate(date)


            const category = findCategory(categoryId, categories)
            const amountFormatted = currencyFormat(amount)
            const remainingFormatted = currencyFormat(remaining || 0)

            const newBudgetUI: BudgetUI = {
                id: id,
                name: name,
                amount: amountFormatted,
                category: category,
                date: normalDate,
                remaining: remainingFormatted,
                type: "Budget"
            }

            return newBudgetUI

        })

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
    const showAlert = (title: string, message: string, buttonList: ModalButtonList[]) => {
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

        const buttonItem: ModalButtonList[] = [{
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
            validationResult = await deleteExpenseUseCase.delete(itemId, emmitEvent)

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

        const budget = generateBudget(id)

        // just we can navigate to budget
        if (type === "Budget") {
            navigation.navigate(ScreenRoutes.BUDGET, {
                budget: budget,
            })

        }

    }

    const generateBudget = (id: string): Budget => {

        const budgetFinded = findItem(id, "Budget") as BudgetUI
        const amountInt = numberFormat(budgetFinded?.amount)
        const remainingInt = numberFormat(budgetFinded?.remaining)

        const budget: Budget = {
            id: budgetFinded?.id || "",
            name: budgetFinded?.name || "",
            amount: amountInt,
            categoryId: budgetFinded?.category?.id,
            date: budgetFinded?.date || "",
            remaining: remainingInt
        }

        return budget

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