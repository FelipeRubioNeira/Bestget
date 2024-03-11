import { useEffect, useState } from "react"
import { ExpensesCreateScreenProps } from "../../navigation/NavigationParamList"
import { Category } from "../../../data/types/Categoty"
import CreateExpenseUseCase from "../../../domain/useCases/CreateExpenseUseCase"
import { currencyFormat, plainFormat } from "../../../utils/Convert"
import { ExpenseCreate } from "../../../data/types/Expense"
import { ScreenRoutes } from "../../navigation/Routes"
import { getCurrentDate } from "../../../utils/Date"

type ExpensesCreateViewModelProps = {
    createExpenseUseCase: CreateExpenseUseCase
} & ExpensesCreateScreenProps


interface IExpenseState {
    expenseName: string,
    expenseAmount: string,
    categoryId: number | undefined
}

type StateName = keyof IExpenseState
type StateType = IExpenseState[StateName]

const useExpensesCreateViewModel = (
    { navigation, route, createExpenseUseCase }: ExpensesCreateViewModelProps
) => {

    const categoryList = route?.params?.categoryList || []


    // ------------------- states ------------------- //
    const [expenseCreateState, setExpenseCreateState] = useState<IExpenseState>({
        expenseName: "",
        expenseAmount: "",
        categoryId: 0
    })

    const [categories, setCategories] = useState<Category[]>([])



    // ------------------- effects ------------------- //
    useEffect(() => {
        setCategories(categoryList)
    }, [categoryList])


    // ------------------- methods ------------------- //

    const updateExpenseState = (state: StateName, value: StateType) => {
        setExpenseCreateState({
            ...expenseCreateState,
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

    const updateCategory = (newCategoryId: number) => {

        updateExpenseState(
            "categoryId",
            newCategoryId
        )
    }

    const saveExpense = async () => {

        try {

            const amountInt = parseInt(plainFormat(expenseCreateState.expenseAmount))
            const currentDate = getCurrentDate()

            const expense: ExpenseCreate = {
                name: expenseCreateState.expenseName,
                amount: amountInt,
                categoryId: expenseCreateState.categoryId || 0,
                date: currentDate
            }

            const newExpenseId = await createExpenseUseCase.create(expense)

            navigation.navigate(ScreenRoutes.EXPENSES, {
                newExpenseId: newExpenseId
            })

        } catch (error) {
            console.log("error al guardar el nuevo gasto", error);

        }

    }


    return {
        categories,
        expenseCreateState,
        updateExpenseName,
        updateExpenseAmount,
        updateCategory,
        saveExpense

    }

}

export default useExpensesCreateViewModel