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
import DateTime from "../../../utils/DateTime"
import { DateInterval } from "../../../data/types/DateInterval"
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry"



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

type BottomSheetState = {
    visible: boolean,
    date: string
}


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

    const [bottomSheetState, setBottomSheetState] = useState<BottomSheetState>({
        visible: false,
        date: ""
    })



    // ------------------ effects ------------------ //
    useEffect(() => {
        const dateInterval = getCurrentDate()
        getData(dateInterval)
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const dateInterval = getCurrentDate()
            getData(dateInterval)
        })
        return unsubscribe;

    }, [navigation])


    // ------------------ methods ------------------ //
    const getData = async (dateInterval: DateInterval) => {

        const [totalIncomes, totalExpenses, categories] = await Promise.all([
            getIncomes(dateInterval),
            getExpenses(),
            getCategories(),

        ])

        setTotalExpenses(totalExpenses)
        setTotalIncomes(totalIncomes)
        setAllCategories(categories)

        setTotalremaining(currencyFormat(totalIncomes - totalExpenses))

        generateButtons(totalExpenses, totalIncomes, categories)

    }

    // ------------------ repository methods ------------------ //

    const getIncomes = async (dateInterval: DateInterval) => {

        const allIncomes = await incomeRepository.getAll(dateInterval)
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


    // ------------------ navigation methods ------------------ //

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


    // ------------------ bottom Sheets ------------------ //
    const getCurrentDate = (): DateInterval => {

        const dateTime = new DateTime().date

        setBottomSheetState({
            ...bottomSheetState,
            date: dateTime,
        })

        return {
            initialDate: dateTime,
            finalDate: getNextMonth(dateTime)
        }


    }

    const showBottomSheet = () => {
        setBottomSheetState({
            ...bottomSheetState,
            visible: true,
        })
    }

    const hideBottomSheet = () => {
        setBottomSheetState({
            ...bottomSheetState,
            visible: false,
        })
    }

    const confirmDate = (newDate: string) => {

        setBottomSheetState({
            visible: false,
            date: newDate,
        })

        const newDateInterval: DateInterval = {
            initialDate: newDate,
            finalDate: getNextMonth(newDate)
        }

        getData(newDateInterval)

    }

    const getNextMonth = (date: string): string => {
        const dateTime = new DateTime(date)
        return dateTime.getNextMonth(date)
    }




    // ------------------ return ------------------ //
    return {
        bottomSheetState,
        totalremaining,
        allIncomes,
        allCategories,
        totalExpenses,
        totalIncomes,
        buttonsHome,
        showBottomSheet,
        hideBottomSheet,
        confirmDate
    }

}

export default useHomeViewModel