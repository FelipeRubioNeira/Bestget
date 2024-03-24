import { useEffect, useState } from "react"
import { HomeScreenProps } from "../../../navigation/NavigationParamList"
import { ScreenRoutes } from "../../../navigation/Routes"
import { currencyFormat } from "../../../utils/NumberFormat"
import { Income } from "../../../data/types/Income"
import { Category } from "../../../data/types/Categoty"
import IncomeRepository from "../../../data/repository/incomeRepository/IncomeRepository"
import ICategoryRepository from "../../../data/repository/categoryRepository/ICategoryRespository"
import IExpenseRespository from "../../../data/repository/expenseRepository/IExpenseRepository"
import { Colors } from "../../constants/Colors"



// ------------------ types ------------------ //
export type MenuType = "gastos" | "ingresos" | "estadisticas" | "perfil"

export type ButtonHomeProps = {
    title: string,
    subTitle?: string,
    onPress: () => void,
    backgroundColor: string,
    titleColor: string
    type: MenuType
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

    const [totalIncomes, setTotalIncomes] = useState(0)
    const [totalExpenses, setTotalExpenses] = useState(0)

    const [buttonsHome, setButtonsHome] = useState<ButtonHomeProps[]>([])



    // ------------------ effects ------------------ //

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            getData()
        })

        return unsubscribe;

    }, [navigation])


    // ------------------ methods ------------------ //
    const getData = async () => {

        const [totalIncomes, totalExpenses, categories] = await Promise.all([
            getIncomes(),
            getExpenses(),
            getCategories(),
        ])

        setTotalExpenses(totalExpenses)
        setTotalIncomes(totalIncomes)
        setAllCategories(categories)

        setTotalremaining(currencyFormat(totalIncomes - totalExpenses))

        generateButtons(totalExpenses, totalIncomes, categories)

    }

    const calculateTotalAmount = (incomes: Income[]) => {

        let totalIncomes = 0

        incomes.forEach(income => {
            totalIncomes += income.amount
        })

        return totalIncomes

    }

    const generateButtons = (expenses: number, incomes: number, categories: Category[]) => {

        setButtonsHome([
            {
                title: 'Gastos y Presupuestos',
                subTitle: `$${currencyFormat(expenses)}`,
                onPress: () => onPressBudgetsExpenses(categories),
                backgroundColor: Colors.YELLOW,
                titleColor: Colors.BLACK,
                type: "gastos"
            },
            {
                title: 'Ingresos',
                subTitle: `$${currencyFormat(incomes)}`,
                onPress: () => onPressIncomes(),
                backgroundColor: Colors.GREEN,
                titleColor: Colors.BLACK,
                type: "ingresos"
            },
            {
                title: 'Estadisticas',
                onPress: () => onPressStatistics(),
                backgroundColor: Colors.PURPLE,
                titleColor: Colors.BLACK,
                type: "estadisticas"
            },
            {
                title: 'Mi Cuenta',
                onPress: () => onPressProfile(),
                backgroundColor: Colors.RED,
                titleColor: Colors.BLACK,
                type: "perfil"
            },
        ])

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
        return categories
    }

    const onPressBudgetsExpenses = (categories: Category[]) => {

        navigation.navigate(ScreenRoutes.BUDGET_EXPENSES, {
            categoryList: categories,
        })
    }

    const onPressIncomes = () => {
        navigation.navigate(ScreenRoutes.INCOMES, {
            incomes: allIncomes
        })
    }

    const onPressStatistics = () => { }

    const onPressProfile = () => { }


    // ------------------ return ------------------ //
    return {
        totalremaining,
        allIncomes,
        allCategories,
        totalExpenses,
        totalIncomes,
        buttonsHome,
    }

}

export default useHomeViewModel