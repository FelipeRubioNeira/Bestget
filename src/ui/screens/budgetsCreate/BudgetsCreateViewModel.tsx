import { useEffect, useState } from "react"
import { BudgetsCreateScreenProps } from "../../navigation/NavigationParamList"
import { Category } from "../../../data/types/Categoty"
import CreateBudgetUseCase from "../../../domain/useCases/CreateBudgetUseCase"
import { Budget, BudgetCreate } from "../../../data/types/Budget"
import { plainFormat } from "../../../utils/Convert"
import BudgetExpense from "../../../data/types/BudgetExpense"
import { ScreenRoutes } from "../../navigation/Routes"

type IBudgetCreateViewModel = {
    createBudgetUseCase: CreateBudgetUseCase
} & BudgetsCreateScreenProps


interface BudgetState {
    budgetName: string,
    budgetAmount: string,
    categoryId: number
}

type StateName = keyof BudgetState
type StateType = BudgetState[StateName]


const useBudgetsCreateViewModel = ({
    navigation,
    route,
    createBudgetUseCase
}: IBudgetCreateViewModel) => {


    // ------------------- params ------------------- //
    const categoryList = route?.params?.categoryList || []

    // ------------------- states ------------------- //
    const [categories, setCategories] = useState<Category[]>([])

    const [budgetState, setBudgetState] = useState<BudgetState>({
        budgetName: "",
        budgetAmount: "",
        categoryId: 0
    })


    // ------------------- effects ------------------- //
    useEffect(() => {
        setCategories(categoryList)
    }, [categoryList])


    // ------------------- methods ------------------- //
    const updateBudgetState = (state: StateName, value: StateType) => {
        setBudgetState({
            ...budgetState,
            [state]: value
        })
    }

    const updateBudgetName = (newBudgetName: string) => {
        updateBudgetState("budgetName", newBudgetName)
    }

    const updateBudgetAmount = (newBudgetAmount: string) => {
        updateBudgetState("budgetAmount", newBudgetAmount)
    }

    const updateCategory = (categoryId: number) => {
        updateBudgetState("categoryId", categoryId)
    }

    const onSubmit = async () => {

        // 1- convert $ to int
        const amountInt = parseInt(plainFormat(budgetState.budgetAmount))

        // 2- create budget
        const budgetCreate: BudgetCreate = {
            name: budgetState.budgetName,
            amount: amountInt,
            categoryId: budgetState.categoryId
        }

        // 3- upload budget and budget expenses
        const budgetId = await createBudgetUseCase.createBudget(budgetCreate)


        if (budgetId) {

            // 4- navigate to budgets screen with a new full budget
            const newBudget: Budget = {
                id: budgetId,
                name: budgetCreate.name,
                amount: budgetCreate.amount,
                categoryId: budgetState.categoryId
            }

            navigation.navigate(ScreenRoutes.BUDGETS, { budget: newBudget })

        } else {
            // showError
        }

    }

    // ------------------- return ------------------- //
    return {
        categories,
        budgetState,
        updateBudgetName,
        updateBudgetAmount,
        updateCategory,
        onSubmit

    }


}

export default useBudgetsCreateViewModel