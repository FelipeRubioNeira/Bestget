import { useEffect, useState } from "react"
import { ExpensesCreateScreenProps } from "../../../navigation/NavigationParamList"
import { Category } from "../../../data/types/Categoty"
import CreateExpenseUseCase from "../../../domain/useCases/CreateExpenseUseCase"
import { currencyFormat, numberFormat } from "../../../utils/Convert"
import { Expense, ExpenseCreate } from "../../../data/types/Expense"
import { ScreenRoutes } from "../../../navigation/Routes"
import { getCurrentDate } from "../../../utils/Date"
import { ChipItemProps } from "../../components/chipItem/ChipItem"
import { Budget } from "../../../data/types/Budget"

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


const useExpenseFormViewModel = (
    { navigation, route, createExpenseUseCase }: ExpensesCreateViewModelProps
) => {


    const {
        categoryList,
        budget,
        expense
    } = route.params


    // ------------------- states ------------------- //
    const [expenseState, setExpenseState] = useState<IExpenseState>({
        expenseName: "",
        expenseAmount: "",
        categoryId: 0
    })

    const [categories, setCategories] = useState<Category[]>([])
    const [showChipItem, setShowChipItem] = useState<boolean>(false)
    const [chipItemProps, setChipItemProps] = useState<ChipItemProps>()






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
                categoryId: expense.categoryId
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

            setShowChipItem(true)

        } else setShowChipItem(false)

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


    // => create new expense
    const saveExpense = async () => {

        try {

            const newExpense = getExpenseFormatted(expenseState)
            const newExpenseId = await createExpenseUseCase.create(newExpense)

            const routeParams = {
                categoryList,
                newExpenseId: newExpenseId
            }

            if (budget) {

                navigation.navigate(ScreenRoutes.BUDGET, {
                    budget: budget,
                    ...routeParams
                })

            } else navigation.navigate(ScreenRoutes.BUDGET_EXPENSES, {
                ...routeParams,
            })


        } catch (error) {
            console.error("error al guardar el nuevo gasto", error);
        }

    }

    const getExpenseFormatted = (expenseState: IExpenseState) => {

        const { expenseAmount, expenseName, categoryId } = expenseState

        const amountInt = numberFormat(expenseAmount)
        const currentDate = getCurrentDate()

        const newExpense: ExpenseCreate = {
            name: expenseName,
            amount: amountInt,
            date: currentDate,
            categoryId: categoryId || 0,
            budgetId: budget?.id || ""
        }

        return newExpense

    }


    return {
        showChipItem,
        chipItemProps,
        categories,
        expenseState,
        updateExpenseName,
        updateExpenseAmount,
        updateCategory,
        saveExpense

    }

}

export default useExpenseFormViewModel