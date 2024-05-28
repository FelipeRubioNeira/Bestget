import { useEffect, useState } from "react"
import { ExpensesCreateScreenProps } from "../../../navigation/NavigationParamList"
import { Category } from "../../../data/types/Categoty"
import CreateExpenseUseCase from "../../../domain/useCases/CreateExpenseUseCase"
import { currencyFormat, numberFormat } from "../../../utils/NumberFormat"
import { Expense } from "../../../data/types/Expense"
import { ScreenRoutes } from "../../../navigation/Routes"
import { ChipItemProps } from "../../components/chipItem/ChipItem"
import { Budget } from "../../../data/types/Budget"
import EditExpenseUseCase from "../../../domain/useCases/EditExpenseUseCase"
import DateTime from "../../../utils/DateTime"
import { useEventBus } from "../../../data/globalContext/events/EventBus"
import { ModalProps } from "../../components/modal/ModalViewModel"
import { useAppSelector } from "../../../data/globalContext/StoreHooks"
import { selectUserApp } from "../../../data/globalContext/UserAppSlice"
import { selectFinancesApp } from "../../../data/globalContext/FinancesAppSlice"
import { selectDateIntervalApp } from "../../../data/globalContext/DateIntervalAppSlice"

const dateTime = new DateTime()


type ExpensesCreateViewModelProps = {
    createExpenseUseCase: CreateExpenseUseCase,
    editExpenseUseCase: EditExpenseUseCase
} & ExpensesCreateScreenProps


interface IExpenseState {
    expenseName: string,
    expenseAmount: string,
    expenseDate: string,
    categoryId: number | undefined,
}

type StateName = keyof IExpenseState
type StateType = IExpenseState[StateName]


const useExpenseFormViewModel = (
    { navigation, route, createExpenseUseCase, editExpenseUseCase }: ExpensesCreateViewModelProps
) => {


    // ------------------- context ------------------- //
    const userApp = useAppSelector(selectUserApp)
    const { categories } = useAppSelector(selectFinancesApp)
    const dateInterval = useAppSelector(selectDateIntervalApp)

    const { emmitEvent } = useEventBus()

    // ------------------- params ------------------- //
    const {
        budget,
        expense,
    } = route.params







    // ------------------- states ------------------- //
    const [hasBudget, setHasBudget] = useState<boolean>(false)
    const [chipItemProps, setChipItemProps] = useState<ChipItemProps>()

    const [expenseState, setExpenseState] = useState<IExpenseState>({
        expenseName: "",
        expenseAmount: "",
        categoryId: 0,
        expenseDate: dateTime.mergeDate(dateTime.date, dateInterval.initialDate)
    })

    const [modalState, setModalState] = useState<ModalProps>({
        visible: false,
        title: "",
        message: "",
        buttonList: []
    })



    // ------------------- effects ------------------- //
    useEffect(() => {
        validateBudget(budget, categories)
    }, [budget])

    useEffect(() => {
        updateForm(expense)
    }, [expense])





    // ------------------- methods ------------------- //
    const updateForm = (expense?: Expense) => {

        if (!expense) return

        setExpenseState({
            expenseName: expense.name,
            expenseAmount: currencyFormat(expense.amount),
            categoryId: expense.categoryId,
            expenseDate: expense.date
        })

    }

    const validateBudget = (budget: Budget | undefined, categoryList: Category[]) => {

        if (budget) {

            const budgetCategory = categoryList.find(category => category.id === budget.categoryId)

            setChipItemProps({
                category: budgetCategory,
                disabled: true,
                style: { marginVertical: "4%", backgroundColor: budgetCategory?.color }
            })

            updateCategory(budget.categoryId)

            setHasBudget(true)

        } else setHasBudget(false)

    }

    const updateExpenseState = (state: StateName, value: StateType) => {
        setExpenseState({
            ...expenseState,
            [state]: value
        })
    }

    const updateExpenseName = (newExpenseName: string) => {
        updateExpenseState(
            "expenseName",
            newExpenseName
        )
    }

    const updateExpenseAmount = (newExpenseAmount: string) => {
        updateExpenseState(
            "expenseAmount",
            newExpenseAmount
        )
    }

    const updateCategory = (newCategoryId: number = 0) => {
        updateExpenseState(
            "categoryId",
            newCategoryId
        )
    }

    const updateExpenseDate = (newDate: string) => {
        updateExpenseState(
            "expenseDate",
            newDate
        )
    }


    const generateExpense = (expenseId?: string) => {

        const { expenseAmount, expenseName, categoryId, expenseDate } = expenseState

        const amountInt = numberFormat(expenseAmount)
        const newDate = dateTime.getIsoDateTime(expenseDate)

        const expenseCreated = {
            userId: userApp.userId,
            name: expenseName,
            amount: amountInt,
            budgetId: budget?.budgetId || "",
            categoryId: categoryId || 0,
            date: newDate,
        } as Expense

        if (expenseId) {
            expenseCreated.expenseId = expenseId;
        }

        return expenseCreated

    }


    // ------------------- create or update expense ------------------- //
    const saveExpense = async () => {
        if (expense) editExpense(expense)
        else createExpense()
    }

    const createExpense = async () => {

        const newExpense = generateExpense()
        const result = await createExpenseUseCase.create(
            newExpense,
            budget || null,
            emmitEvent
        )

        if (result.isValid) {

            if (budget) {
                navigation.navigate(ScreenRoutes.BUDGET, {
                    budget: budget,
                    ...(result.result && { newExpenseId: result.result.budgetId })
                })

            } else navigation.navigate(ScreenRoutes.BUDGET_EXPENSES, {
                ...(result.result && { newExpenseId: result.result.expenseId })
            })

        } else {
            showModal("Error", result.message)
        }

    }

    const editExpense = async (expense: Expense) => {

        const newExpense = generateExpense(expense?.expenseId)

        const result = await editExpenseUseCase.edit(newExpense, emmitEvent)

        if (result.isValid) {

            if (budget) {
                navigation.navigate(ScreenRoutes.BUDGET, {
                    budget: budget,
                    newExpenseId: newExpense.expenseId,
                })

            } else {
                navigation.navigate(ScreenRoutes.BUDGET_EXPENSES, {
                    newExpenseId: newExpense.expenseId,
                })
            }


        } else {
            showModal("Error", result.message)
        }

    }


    // ------------------- modal ------------------- //
    const showModal = (title: string, message: string) => {

        setModalState({
            visible: true,
            title: title,
            message: message,
            buttonList: [
                {
                    text: "Aceptar",
                    onPress: hideModal
                }
            ]
        })

    }

    const hideModal = () => {
        setModalState({
            ...modalState,
            visible: false
        })

    }



    return {
        modalState,
        hasBudget,
        chipItemProps,
        categories,
        expenseState,
        updateExpenseName,
        updateExpenseAmount,
        updateExpenseDate,
        updateCategory,
        saveExpense

    }

}

export default useExpenseFormViewModel