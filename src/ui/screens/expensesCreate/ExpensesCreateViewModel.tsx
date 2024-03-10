import { useEffect, useState } from "react"
import { ExpensesCreateScreenProps } from "../../navigation/NavigationParamList"
import { Category } from "../../../data/types/Categoty"
import ICategoryRepository from "../../../data/repository/categoryRepository/CategoryRepository"

type ExpensesCreateViewModelProps = {

} & ExpensesCreateScreenProps


interface IExpenseState {
    expenseName: string,
    expenseAmount: string,
    expenseLabel: number,
}

type StateName = keyof IExpenseState
type StateType = IExpenseState[StateName]

const useExpensesCreateViewModel = ({
    navigation,
    route,
}: ExpensesCreateViewModelProps) => {

    const categoryList = route?.params?.categoryList || []


    // ------------------- states ------------------- //
    const [expenseCreateState, setExpenseCreateState] = useState<IExpenseState>({
        expenseName: "",
        expenseAmount: "",
        expenseLabel: 0,
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

    const updateExpenseLabel = (newExpenseLabel: number) => {
        updateExpenseState(
            "expenseLabel",
            newExpenseLabel
        )
    }


    return {
        categories,
        expenseCreateState,
        updateExpenseName,
        updateExpenseAmount,
        updateExpenseLabel

    }

}

export default useExpensesCreateViewModel