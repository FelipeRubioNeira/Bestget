import { useEffect, useState } from "react"
import { HomeScreenProps } from "../../../navigation/NavigationParamList"
import { ScreenRoutes } from "../../../navigation/Routes"
import { currencyFormat } from "../../../utils/Convert"
import { Income } from "../../../data/types/Income"
import { Category } from "../../../data/types/Categoty"
import IncomeRepository from "../../../data/repository/incomeRepository/IncomeRepository"
import ICategoryRepository from "../../../data/repository/categoryRepository/ICategoryRespository"
import IExpenseRespository from "../../../data/repository/expenseRepository/IExpenseRepository"



// ------------------ interfaces ------------------ //
export interface IMenuArrayButtonsProps {
    onPressBudgetsExpenses: () => void
    onPressIncomes: () => void
}

type HomeViewModelProps = {
    incomeRepository: IncomeRepository,
    expenseRepository: IExpenseRespository,
    categoryRepository: ICategoryRepository,
} & HomeScreenProps



const useHomeViewModel = ({
    navigation,
    incomeRepository,
    expenseRepository,
    categoryRepository,
}: HomeViewModelProps) => {


    // ------------------ states ------------------ //
    const [totalremaining, setTotalremaining] = useState("0")

    const [allIncomes, setAllIncomes] = useState<Income[]>([])
    const [allCategories, setAllCategories] = useState<Category[]>([])



    // ------------------ effects ------------------ //

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            getData()
        })

        return unsubscribe;

    }, [navigation])


    // ------------------ methods ------------------ //
    const getData = async () => {

        const [totalIncomes, totalExpenses] = await Promise.all([
            getIncomes(),
            getExpenses(),
            getCategories(),
        ])

        setTotalremaining(currencyFormat(totalIncomes - totalExpenses))
        
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

        setAllIncomes(allIncomes)
        
        return totalIncomes
    }

    const getExpenses = async () => {
        return expenseRepository.getTotal()
    }

    const getCategories = async () => {
        const categories = await categoryRepository.getAll()
        setAllCategories(categories)
    }



    // ------------------ user Events ------------------ //
    const onPressBudgetsExpenses = () => {
        navigation.navigate(ScreenRoutes.BUDGET_EXPENSES, {
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
        totalremaining,
        allIncomes,
        allCategories,

        onPressBudgetsExpenses,
        onPressIncomes
    }

}

export default useHomeViewModel