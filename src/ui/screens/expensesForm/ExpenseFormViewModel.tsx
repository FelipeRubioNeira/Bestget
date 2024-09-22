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
import { selectUserApp } from "../../../data/globalContext/redux/slices/UserAppSlice"
import { selectFinancesApp } from "../../../data/globalContext/redux/slices/FinancesAppSlice"
import { selectDateIntervalApp } from "../../../data/globalContext/redux/slices/DateIntervalAppSlice"
import { getFinanceType } from "../../../data/types/FinanceType"

const dateTime = new DateTime()


type ExpensesCreateViewModelProps = {
    createExpenseUseCase: CreateExpenseUseCase,
    editExpenseUseCase: EditExpenseUseCase,
} & ExpensesCreateScreenProps


interface IExpenseState {
    expenseName: string,
    expenseAmount: string,
    expenseDate: string,
    categoryId: number | undefined,
}

type StateName = keyof IExpenseState
type StateType = IExpenseState[StateName]


const useExpenseFormViewModel = ({
    navigation,
    route,
    createExpenseUseCase,
    editExpenseUseCase
}: ExpensesCreateViewModelProps) => {


    // ------------------- context ------------------- //
    const userApp = useAppSelector(selectUserApp)
    const { categories, groupId } = useAppSelector(selectFinancesApp)
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

        const expenseCreated: Expense = {
            expenseId: "",
            userId: userApp.userId,
            groupId,
            financeType: getFinanceType(groupId),
            name: expenseName,
            amount: amountInt,
            budgetId: budget?.budgetId || "",
            categoryId: categoryId || 0,
            date: newDate,
        }

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

        const { isValid, message, result } = await createExpenseUseCase.create(
            generateExpense(),
            emmitEvent,
        )

        // if the expense is not valid, show the error message
        if (!isValid) {
            showModal("Error", message)
            return
        }

        // if the expense is valid, navigate to the budget
        if (budget) {
            navigation.navigate(ScreenRoutes.BUDGET, {
                budget,
                newExpenseId: result?.expenseId
            })

        } else {
            navigation.navigate(ScreenRoutes.BUDGET_EXPENSES, {
                newExpenseId: result?.expenseId
            })
        }

    }

    const editExpense = async (expense: Expense) => {

        const newExpense = generateExpense(expense?.expenseId)

        const { isValid, message } = await editExpenseUseCase.edit(newExpense, emmitEvent)

        
        if (!isValid) return showModal("Error", message)

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