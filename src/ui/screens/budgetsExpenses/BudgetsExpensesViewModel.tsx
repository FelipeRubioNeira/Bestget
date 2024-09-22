/*
    View model for the Expenses screen
*/
import React from "react"
import { useEffect, useState } from "react"
import { BudgetsExpensesScreenProps } from "../../../navigation/NavigationParamList"
import { ScreenRoutes } from "../../../navigation/Routes"
import IExpenseRespository from "../../../data/repository/expenseRepository/IExpenseRepository"
import { Expense, ExpenseUI } from "../../../data/types/Expense"
import { currencyFormat } from "../../../utils/NumberFormat"
import { Category } from "../../../data/types/Categoty"
import IBudgetRepository from "../../../data/repository/budgetRepository/IBudgetRepository"
import { Budget, BudgetUI } from "../../../data/types/Budget"
import { BudgetExpenseType } from "../../../data/types/BudgetExpense"
import useModalViewModel, { ModalButtonList } from "../../components/modal/ModalViewModel"
import DeleteBudgetUseCase from "../../../domain/useCases/DeleteBudgetUseCase"
import { ValidationResult } from "../../../data/types/Validation"
import DeleteExpenseUseCase from "../../../domain/useCases/DeleteExpenseUseCase"
import DefaultStyles from "../../styles/DefaultStyles"
import { DateInterval } from "../../../data/types/DateInterval"
import DateTime from "../../../utils/DateTime"
import { useEventBus } from "../../../data/globalContext/events/EventBus"
import { Event } from "../../../data/globalContext/events/EventBusReducer"
import BudgetExpenseUnitOfWork from "../../../data/unitOfWork/BudgetExpenseUnitOfWork"
import { QueryGroupParams, QueryParams } from "../../../data/types/QueryParams"
import { useAppDispatch, useAppSelector } from "../../../data/globalContext/StoreHooks"
import { selectUserApp } from "../../../data/globalContext/redux/slices/UserAppSlice"
import { selectFinancesApp } from "../../../data/globalContext/redux/slices/FinancesAppSlice"
import {
    updateExpenses as updateExpensesContext,
    updateBudgets as updateBudgetsContext
} from "../../../data/globalContext/redux/slices/FinancesAppSlice"
import { selectDateIntervalApp } from "../../../data/globalContext/redux/slices/DateIntervalAppSlice"
import HeaderRight from "../../components/headerRight/HeaderRight"
import useSearchViewModel from "../../components/search/SearchViewModel"

const dateTime = new DateTime()

// ----------- types ----------- //

type ExpensesViewModelProps = {
    expenseRepository: IExpenseRespository,
    budgetRepository: IBudgetRepository,
    budgetExpenseUnitOfWork: BudgetExpenseUnitOfWork,
    deleteBudgetUseCase: DeleteBudgetUseCase,
    deleteExpenseUseCase: DeleteExpenseUseCase,
} & BudgetsExpensesScreenProps

export type BudgetOrExpense = "Budget" | "Expense"


// ------------------ view model ------------------ //
const useBudgetExpensesViewModel = ({
    navigation,
    expenseRepository,
    budgetExpenseUnitOfWork,
    deleteBudgetUseCase,
    deleteExpenseUseCase
}: ExpensesViewModelProps) => {


    // ------------------ context ------------------ //
    const {
        userId
    } = useAppSelector(selectUserApp)

    const {
        groupId,
        expenses: expensesContext,
        budgets: budgetsContext,
        categories: categoriesContext
    } = useAppSelector(selectFinancesApp)

    const dateInterval = useAppSelector(selectDateIntervalApp)
    const appDispatch = useAppDispatch()




    // ------------------ event bus ------------------ //
    const {
        emmitEvent,
        budgetsQueue,
        expensesQueue,
        consumeBudgetsQueue,
        consumeExpensesQueue
    } = useEventBus()



    // ------------------ states ------------------ //
    const [totalAmount, setTotalAmount] = useState("0")

    const [buttonAddVisible, setButtonAddVisible] = useState(true)
    const [ExpenseOptionsVisible, setExpenseOptionsVisble] = useState(false)

    const [budgetsExpenses, setBudgetsExpenses] = useState<(BudgetUI | ExpenseUI)[]>([])
    const [filteredBudgetsExpenses, setFilteredBudgetsExpenses] = useState<(BudgetUI | ExpenseUI)[]>([])

    const [loading, setLoading] = useState(false)

    const [editMode, setEditMode] = useState(false)



    // ------------------ hooks ------------------ //
    const { hideModal, showModal, modalState } = useModalViewModel()
    const { searchedValue, updateSearchValue, onSearch } = useSearchViewModel()




    // ------------------ effects ------------------ //

    // header right button
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <HeaderRight
                        onPressQuestion={onPressQuestionHeaderIcon}
                        onPressEdit={onPressEditHeaderIcon}
                        editIconVisible={budgetsExpenses.length > 0}
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












    // ------------------- header events ------------------- //
    const onPressEditHeaderIcon = () => {
        !editMode ? turnOnDeleteMode() : turnOffDeleteMode();
    }

    // ------------------- delete events------------------- //
    const turnOnDeleteMode = () => {
        setEditMode(true)
    }

    const turnOffDeleteMode = () => {
        setEditMode(false)
    }

    const onPressQuestionHeaderIcon = () => {
        showModal(
            "Ayuda",
            "Un egreso o presupuesto es cualquier gasto que tengas, como el pago de la renta, la compra de alimentos, salidas con amigos, etc.",
            [{ text: 'Aceptar', onPress: hideModal }]
        )
    }


    // ------------------ data methods ------------------ //
    const handleEvents = async ({
        budgetsQueue,
        expensesQueue
    }: {
        budgetsQueue: Event[],
        expensesQueue: Event[]
    }) => {

        // if there is no data, we return
        const thereIsData = budgetsQueue.length > 0 || expensesQueue.length > 0
        if (!thereIsData) return

        setLoading(true)

        const dataToFormat = await evaluateEvents({
            budgetsQueue,
            expensesQueue
        })

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
        consumeBudgetsQueue();
        return groupId ? getBudgetsByGroup({ groupId, ...dateInterval }) : getBudgets({ userId, ...dateInterval });
    };

    const updateExpenses = async () => {
        consumeExpensesQueue();
        return groupId ? getExpensesByGroup({ groupId, ...dateInterval }) : getExpenses({ userId, ...dateInterval });
    };

    const getData = async (dateInterval: DateInterval) => {

        setLoading(true)

        // 1- getE xpenses and budgets
        const [expenses, budgets] = await Promise.all([
            groupId ? getExpensesByGroup({ groupId, ...dateInterval }) : getExpenses({ userId, ...dateInterval }),
            groupId ? getBudgetsByGroup({ groupId, ...dateInterval }) : getBudgets({ userId, ...dateInterval }),
        ])

        formatData({
            expenses,
            budgets,
            categories: categoriesContext
        })

        setLoading(false)

    }

    const getExpenses = async (queryParams: QueryParams): Promise<Expense[]> => {
        const expenses = await expenseRepository.getAll(queryParams)
        appDispatch(updateExpensesContext(expenses))
        return expenses
    }

    const getExpensesByGroup = async (queryParams: QueryGroupParams): Promise<Expense[]> => {
        const expenses = await expenseRepository.getAllByGroup(queryParams)
        appDispatch(updateExpensesContext(expenses))
        return expenses
    }

    const getBudgets = async (queryParams: QueryParams): Promise<Budget[]> => {
        const budgetsWithRemaing = await budgetExpenseUnitOfWork.getBudgetsWithRemaining(queryParams)
        appDispatch(updateBudgetsContext(budgetsWithRemaing))
        return budgetsWithRemaing
    }

    const getBudgetsByGroup = async (queryParams: QueryGroupParams): Promise<Budget[]> => {

        const budgetsWithRemaing = await budgetExpenseUnitOfWork.getBudgetsWithRemaingByGroup(queryParams)
        appDispatch(updateBudgetsContext(budgetsWithRemaing))
        return budgetsWithRemaing
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
        const expensesList = applyExpenseFormat(expensesWithoutBudget, categories)

        const totalExpenses = currencyFormat(
            calculateTotalExpenses(expenses)
        )

        setTotalAmount(totalExpenses)

        setBudgetsExpenses([
            ...expensesList,
            ...budgetsList
        ])

        setFilteredBudgetsExpenses([
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

            const { budgetId, name, amount, date, categoryId, remaining } = budget

            const normalDate = dateTime.convertToNormalDate(date)


            const category = findCategory(categoryId, categories)
            const amountFormatted = currencyFormat(amount)
            const remainingFormatted = currencyFormat(remaining || 0)

            const newBudgetUI: BudgetUI = {
                id: budgetId,
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

    const applyExpenseFormat = (expenses: Expense[], categories: Category[]): ExpenseUI[] => {

        return expenses.map(expense => {

            const { expenseId, name, amount, date, categoryId } = expense

            const dateTime = new DateTime(date)
            const normalDate = dateTime.convertToNormalDate(dateTime.date)

            const category = findCategory(categoryId, categories)
            const amountFormatted = currencyFormat(amount)

            const newItem: ExpenseUI = {
                id: expenseId,
                name: name,
                amount: amountFormatted,
                category: category,
                date: normalDate,
                type: "Expense"
            }

            return newItem

        })

    }

    const findCategory = (categoryId: number = 0, categories: Category[]): Category | undefined => {
        if (!categoryId) return undefined
        else if (categories.length === 0) return undefined
        else return categories.find(category => category.id === categoryId)
    }


    // ----------- onPress flatList items ----------- //
    const onPressEdit = (itemId: string, type: BudgetExpenseType) => {

        setEditMode(false)


        if (type === "Budget") {

            const budgetFinded = findBudgetOnContext(itemId)
            navigation.navigate(ScreenRoutes.BUDGET_FORM, {
                budget: budgetFinded,
            })

        } else {

            const expenseFinded = findExpenseOnContext(itemId)
            navigation.navigate(ScreenRoutes.EXPENSES_FORM, {
                expense: expenseFinded,
            })
        }

    }

    const findExpenseOnContext = (id: string): Expense | undefined => {
        return expensesContext.find(expense => expense.expenseId === id)
    }

    const findBudgetOnContext = (id: string): Budget | undefined => {
        return budgetsContext.find(budget => budget.budgetId === id)
    }


    const onPressDelete = (itemId: string, type: BudgetExpenseType) => {


        const budgetMessage = "¿Estás seguro que deseas eliminar este presupuesto? Se eliminarán todos los gastos asociados."
        const expenseMessage = "¿Estás seguro que deseas eliminar este gasto?"

        const message = type === "Budget" ? budgetMessage : expenseMessage


        showModal(
            "Eliminar",
            message,
            [{
                text: 'Aceptar',
                onPress: () => deleteItem(itemId, type),
            },
            {
                text: 'Cancelar',
                onPress: hideModal,
                style: DefaultStyles.mainButton
            }]
        )


    }

    const deleteItem = async (itemId: string, type: BudgetExpenseType) => {

        hideModal()

        let validationResult: ValidationResult<void> = {
            isValid: true,
            message: "",
            result: undefined
        }

        const buttonItem: ModalButtonList[] = [{
            text: "Aceptar",
            onPress: hideModal,
        }]


        // if the item to delete is a budget, we delete all the expenses associated with it
        if (type === "Budget") {

            validationResult = await deleteBudgetUseCase.delete(itemId)

            const message = validationResult.message
            if (!validationResult.isValid) showModal("Error", message, buttonItem)


        }
        // if the item to delete is an expense
        else {
            validationResult = await deleteExpenseUseCase.delete(itemId, emmitEvent, groupId)

            const message = validationResult.message
            if (!validationResult.isValid) showModal("Error", message, buttonItem)
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

    // when we press on a flatlist item
    const onPressItem = (id: string, type: BudgetExpenseType) => {

        setEditMode(false)

        const budgetFound = findBudgetOnContext(id)


        if (!budgetFound) {
            console.log("onPressItem, item not found");
            return
        }

        // just we can navigate to budget
        if (type === "Budget") {
            navigation.navigate(ScreenRoutes.BUDGET, {
                budget: budgetFound,
            })

        }

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


    // ------------------ search events ------------------ //
    const onSearchValue = (value: string) => {
        const newList = onSearch(value, "name", budgetsExpenses)
        setFilteredBudgetsExpenses(newList)
    }

    const onDeleteSearch = () => {
        updateSearchValue("")
        setFilteredBudgetsExpenses(budgetsExpenses)
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
        filteredBudgetsExpenses,

        onShowExpenseOptions,
        onAddExpense,
        onAddBudget,
        onPressItem,

        onHideExpenseOptions,
        onPressEdit,
        onPressDelete,
        deleteItem,
        showModal,
        hideModal,

        onSearchValue,
        onDeleteSearch,
        searchedValue,

    }

}

export default useBudgetExpensesViewModel