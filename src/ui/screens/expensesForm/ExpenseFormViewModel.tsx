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
import { ModalProps } from "../../components/modal/Modal"
import DateTime from "../../../utils/DateTime"
import { useGlobalContext } from "../../../data/globalContext/GlobalContext"
import { useEventBus } from "../../../data/globalContext/events/EventBus"

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
    const { emmitEvent } = useEventBus()

    const {
        dateInterval,
        categoriesContext
    } = useGlobalContext()


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
        validateBudget(budget, categoriesContext)
    }, [budget])

    useEffect(() => {
        updateForm(expense)
    }, [expense])





    // ------------------- methods ------------------- //
    const updateForm = (expense: Expense | undefined) => {

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


    const generateExpense = (id?: string) => {

        const { expenseAmount, expenseName, categoryId, expenseDate } = expenseState

        const amountInt = numberFormat(expenseAmount)
        const newDate = dateTime.getIsoDateTime(expenseDate)

        const expenseCreated = {
            name: expenseName,
            amount: amountInt,
            budgetId: budget?.id || "",
            categoryId: categoryId || 0,
            date: newDate,
        } as Expense

        if (id) {
            expenseCreated.id = id;
        }

        return expenseCreated

    }



    // => create new expense
    const saveExpense = async () => {
        if (expense) editExpense(expense)
        else createExpense()
    }


    const createExpense = async () => {

        const newExpense = generateExpense()
        const result = await createExpenseUseCase.create(
            newExpense,
            budget,
            emmitEvent
        )

        if (result.isValid) {

            if (budget) {
                navigation.navigate(ScreenRoutes.BUDGET, {
                    budget: budget,
                    newExpenseId: result.result
                })

            } else navigation.navigate(ScreenRoutes.BUDGET_EXPENSES, {
                newExpenseId: result.result
            })

        } else {
            const { title, message } = result.message
            showModal(title, message)
        }

    }

    const editExpense = async (expense: Expense) => {

        const newExpense = generateExpense(expense?.id)
        const result = await editExpenseUseCase.edit(newExpense, emmitEvent)

        if (result.isValid) {

            if (budget) {
                navigation.navigate(ScreenRoutes.BUDGET, {
                    budget: budget,
                    newExpenseId: newExpense.id,
                })

            } else {
                navigation.navigate(ScreenRoutes.BUDGET_EXPENSES, {
                    newExpenseId: newExpense.id,
                })
            }


        } else {
            const { title, message } = result.message
            showModal(title, message)
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
        categories: categoriesContext,
        expenseState,
        updateExpenseName,
        updateExpenseAmount,
        updateExpenseDate,
        updateCategory,
        saveExpense

    }

}

export default useExpenseFormViewModel