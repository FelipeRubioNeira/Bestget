import { useEffect, useState } from "react"
import { HomeScreenProps } from "../../../navigation/NavigationParamList"
import { ScreenRoutes } from "../../../navigation/Routes"
import { currencyFormat } from "../../../utils/Convert"
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

    const [buttonsHome, setButtonsHome] = useState<ButtonHomeProps[]>([
        {
            title: 'Gastos y Presupuestos',
            subTitle: "",
            onPress: () => onPressBudgetsExpenses(),
            backgroundColor: Colors.YELLOW,
            titleColor: Colors.BLACK,
            type: "gastos"
        },
        {
            title: 'Ingresos',
            subTitle: "",
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

        setTotalExpenses(totalExpenses)
        setTotalIncomes(totalIncomes)

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

    const onPressItem = (item: MenuType) => {

        switch (item) {

            case "gastos":
                onPressBudgetsExpenses()
                break;

            case "ingresos":
                onPressIncomes()
                break;

            case "estadisticas":
                onPressStatistics()
                break;

            case "perfil":
                onPressProfile()
                break;

        }

    }

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

        onPressItem,
    }

}

export default useHomeViewModel