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
import { useGlobalContext } from "../../../data/globalContext/GlobalContext"


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


    // ------------------ context ------------------ //
    const {
        dateInterval,
        updateDateIntervalContext,

        incomesContext,
        updateIncomesContext
    } = useGlobalContext()



    // ------------------ states ------------------ //
    const [totalremaining, setTotalremaining] = useState("0")

    const [allCategories, setAllCategories] = useState<Category[]>([])

    const [totalIncomes, setTotalIncomes] = useState(0)
    const [totalExpenses, setTotalExpenses] = useState(0)

    const [buttonsHome, setButtonsHome] = useState<ButtonHomeProps[]>([])

    const [bottomSheetState, setBottomSheetState] = useState<BottomSheetState>({
        visible: false,
        date: ""
    })

    const [loading, setLoading] = useState(false)

    

    // ------------------ effects ------------------ //
    useEffect(() => {
        const dateInterval = getCurrentDate()
        getData(dateInterval)
    }, [])

    useEffect(() => {
        refreshIncomesData()
    }, [incomesContext])







    // ------------------ methods ------------------ //
    const getData = async (dateInterval: DateInterval) => {

        setLoading(true)

        const [incomes, totalExpenses, categories] = await Promise.all([
            getIncomes(dateInterval),
            getExpenses(dateInterval),
            getCategories(),
        ])


        const totalIncomes = calculateTotalAmount(incomes)

        setTotalIncomes(totalIncomes)
        setTotalExpenses(totalExpenses)
        setAllCategories(categories)

        updateTotalRemaining(totalIncomes, totalExpenses)

        generateButtons(totalExpenses, totalIncomes, categories)

        setLoading(false)

    }

    const refreshIncomesData = async () => {

        const totalIncomesAmount = calculateTotalAmount(incomesContext)

        setTotalIncomes(totalIncomesAmount)
        generateButtons(totalExpenses, totalIncomesAmount, allCategories)
        updateTotalRemaining(totalIncomesAmount, totalExpenses)

    }

    const updateTotalRemaining = (totalIncomes: number, totalExpenses: number) => {
        setTotalremaining(currencyFormat(totalIncomes - totalExpenses))
    }

    // ------------------ repository methods ------------------ //
    const getIncomes = async (dateInterval: DateInterval) => {
        const incomes = await incomeRepository.getAll(dateInterval)
        updateIncomesContext(incomes)
        return incomes
    }

    const getExpenses = async (dateInterval: DateInterval) => {
        return expenseRepository.getTotal(dateInterval)
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
            dateInterval: dateInterval
        })
    }

    const onPressIncomes = () => {
        navigation.navigate(ScreenRoutes.INCOMES, {})
    }

    const onPressStatistics = () => { }

    const onPressProfile = () => { }


    // ------------------ bottom Sheets ------------------ //
    const getCurrentDate = (): DateInterval => {

        const dateTime = new DateTime()
        const startOfMonth = dateTime.getStartOfMonth(dateTime.date)


        setBottomSheetState({
            ...bottomSheetState,
            date: startOfMonth,
        })

        const nextMonth = getNextMonth(startOfMonth)


        updateDateIntervalContext({
            initialDate: startOfMonth,
            finalDate: nextMonth
        })


        return {
            initialDate: startOfMonth,
            finalDate: nextMonth
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

        updateDateIntervalContext(newDateInterval)
        getData(newDateInterval)

    }

    const getNextMonth = (date: string): string => {
        const dateTime = new DateTime(date)
        return dateTime.getNextMonth(date)
    }




    // ------------------ return ------------------ //
    return {
        loading,
        bottomSheetState,
        totalremaining,
        allIncomes: incomesContext,
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