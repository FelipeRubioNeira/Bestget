import { useEffect, useState } from "react"
import { HomeScreenProps } from "../../../navigation/NavigationParamList"
import { ScreenRoutes } from "../../../navigation/Routes"
import { currencyFormat } from "../../../utils/Convert"
import { Income } from "../../../data/types/Income"
import { Category } from "../../../data/types/Categoty"

import IncomeRepository from "../../../data/repository/incomeRepository/IncomeRepository"
import ICategoryRepository from "../../../data/repository/categoryRepository/ICategoryRespository"
import { Expense } from "../../../data/types/Expense"
import IBudgetExpenseRepository from "../../../data/repository/budgetExpenseRepository/IBugetExpenseRepository"
import { BudgetExpense } from "../../../data/types/BudgetExpense"



// ------------------ interfaces ------------------ //
export interface IMenuArrayButtonsProps {
    onPressBudgetsExpenses: () => void
    onPressIncomes: () => void
}

type HomeViewModelProps = {
    incomeRepository: IncomeRepository,
    categoryRepository: ICategoryRepository,
    budgetExpenseRepository: IBudgetExpenseRepository
} & HomeScreenProps



const useHomeViewModel = ({
    navigation,
    categoryRepository,
    incomeRepository,
    budgetExpenseRepository
}: HomeViewModelProps) => {


    // ------------------ states ------------------ //
    const [totalIncomes, setTotalIncomes] = useState("0")

    const [allIncomes, setAllIncomes] = useState<Income[]>([])
    const [allCategories, setAllCategories] = useState<Category[]>([])
    const [allBudgetExpense, setAllBudgetExpense] = useState<BudgetExpense[]>([])


    // ------------------ effects ------------------ //

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            getData()
        })

        return unsubscribe;

    }, [navigation])


    // ------------------ methods ------------------ //
    const getData = async () => {
        Promise.all([
            getIncomes(),
            getBudgetsExpenses(),
            getCategories(),
        ])
    }

    const calculateTotalAmount = (incomes: Income[]) => {

        let totalIncomes = 0

        incomes.forEach(income => {
            totalIncomes += income.amount
        })

        return totalIncomes

    }

    // ------------------ repository methods ------------------ //

    const getIncomes = async () => {

        const allIncomes = await incomeRepository.getAll()

        const totalIncomes = calculateTotalAmount(allIncomes)
        const totalIncomesFormatted = currencyFormat(totalIncomes)

        setAllIncomes(allIncomes)
        setTotalIncomes(totalIncomesFormatted)
    }

    const getCategories = async () => {
        const categories = await categoryRepository.getAll()
        console.log("categories => ", categories);

        setAllCategories(categories)
    }

    const getBudgetsExpenses = async () => {
        const budgetExpenses = await budgetExpenseRepository.getAll()
        setAllBudgetExpense(budgetExpenses)
    }


    // ------------------ user Events ------------------ //
    const onPressBudgetsExpenses = () => {
        navigation.navigate(ScreenRoutes.BUDGET_EXPENSES, {
            budgetExpenseList: allBudgetExpense,
            categoryList: allCategories,
        })
    }

    const onPressIncomes = () => {
        navigation.navigate(ScreenRoutes.INCOMES, {
            incomes: allIncomes
        })
    }


    // ------------------ return ------------------ //
    return {
        totalIncomes,
        allIncomes,
        allCategories,

        onPressBudgetsExpenses,
        onPressIncomes
    }

}

export default useHomeViewModel