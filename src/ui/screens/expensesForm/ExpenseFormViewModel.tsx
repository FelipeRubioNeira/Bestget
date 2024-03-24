import { useEffect, useState } from "react"
import { ExpensesCreateScreenProps } from "../../../navigation/NavigationParamList"
import { Category } from "../../../data/types/Categoty"
import CreateExpenseUseCase from "../../../domain/useCases/CreateExpenseUseCase"
import { currencyFormat, numberFormat } from "../../../utils/NumberFormat"
import { Expense, ExpenseCreate } from "../../../data/types/Expense"
import { ScreenRoutes } from "../../../navigation/Routes"
import { convertToIsoDate, convertToNormalDate, getCurrentDate } from "../../../utils/Date"
import { ChipItemProps } from "../../components/chipItem/ChipItem"
import { Budget } from "../../../data/types/Budget"
import EditExpenseUseCase from "../../../domain/useCases/EditExpenseUseCase"
import { ModalProps } from "../../components/modal/Modal"

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


    const {
        categoryList,
        budget,
        expense
    } = route.params


    // ------------------- states ------------------- //
    const [categories, setCategories] = useState<Category[]>([])
    const [hasBudget, setHasBudget] = useState<boolean>(false)
    const [chipItemProps, setChipItemProps] = useState<ChipItemProps>()

    const [expenseState, setExpenseState] = useState<IExpenseState>({
        expenseName: "",
        expenseAmount: "",
        categoryId: 0,
        expenseDate: convertToNormalDate()
    })

    const [modalState, setModalState] = useState<ModalProps>({
        visible: false,
        title: "",
        message: "",
        buttonList: []
    })



    // ------------------- effects ------------------- //
    useEffect(() => {
        setCategories(categoryList)
    }, [categoryList])

    useEffect(() => {
        validateBudget(budget, categoryList)
    }, [budget])

    useEffect(() => {
        updateForm(expense)
    }, [expense])





    // ------------------- methods ------------------- //
    const updateForm = (expense: Expense | undefined) => {

        if (expense) {
            setExpenseState({
                expenseName: expense.name,
                expenseAmount: currencyFormat(expense.amount),
                categoryId: expense.categoryId,
                expenseDate: expense.date
            })
        }
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


    const generateExpenseCreate = () => {

        const { expenseAmount, expenseName, categoryId } = expenseState

        const amountInt = numberFormat(expenseAmount)
        const currentDate = getCurrentDate()

        const expenseCreated: ExpenseCreate = {
            name: expenseName,
            amount: amountInt,
            date: currentDate,
            categoryId: categoryId || 0,
            budgetId: budget?.id || ""
        }

        return expenseCreated

    }

    const generateExpense = () => {

        const { expenseAmount, expenseName, categoryId, expenseDate } = expenseState

        const amountInt = numberFormat(expenseAmount)
        const date = convertToIsoDate(expenseDate)


        const expenseCreated: Expense = {
            id: expense?.id || "",
            name: expenseName,
            amount: amountInt,
            date: date,
            categoryId: categoryId || 0,
            budgetId: budget?.id || ""
        }

        return expenseCreated

    }


    // => create new expense
    const saveExpense = async () => {


        if (expense) { // edit
            editExpense()

        } else { // create
            createExpense()
        }

    }


    const createExpense = async () => {

        let expense = generateExpenseCreate()

        const result = await createExpenseUseCase.create(expense)

        if (result.isValid) {

            const routeParams = {
                categoryList,
                newExpenseId: result.result
            }

            if (budget) {

                navigation.navigate(ScreenRoutes.BUDGET, {
                    budget: budget,
                    ...routeParams
                })

            } else navigation.navigate(ScreenRoutes.BUDGET_EXPENSES, { ...routeParams })

        } else {
            const { title, message } = result.message
            showModal(title, message)
        }

    }

    const editExpense = async () => {

        const expense = generateExpense()
        const result = await editExpenseUseCase.edit(expense)

        if (result.isValid) {

            if (budget) {

                navigation.navigate(ScreenRoutes.BUDGET, {
                    budget: budget,
                    categoryList,
                    newExpenseId: expense.id
                })

            } else {
                navigation.navigate(ScreenRoutes.BUDGET_EXPENSES, { ...route.params })
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