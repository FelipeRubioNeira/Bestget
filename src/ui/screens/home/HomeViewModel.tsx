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
import IBudgetRepository from "../../../data/repository/budgetRepository/IBudgetRepository"
import { Expense } from "../../../data/types/Expense"


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
    budgetRepository: IBudgetRepository,
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
    budgetRepository,
    categoryRepository,
}: HomeViewModelProps) => {


    // ------------------ context ------------------ //
    const {
        dateInterval,
        updateDateIntervalContext,

        // incomes
        incomesContext,
        updateIncomesContext,

        // expenses
        expensesContext,
        updateExpensesContext,

        // budgets
        budgetsContext,
        updateBudgetsContext,

        // categories
        categoriesContext,
        updateCategoriesContext

    } = useGlobalContext()



    // ------------------ states ------------------ //
    const [totalremaining, setTotalremaining] = useState("0")

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
        refreshIncomesData(incomesContext)
    }, [incomesContext])

    useEffect(() => {
        refreshExpensesData(expensesContext)
    }, [expensesContext])







    // ------------------ methods ------------------ //
    const getData = async (dateInterval: DateInterval) => {

        setLoading(true)

        const [
            categories,
            incomes,
            expenses,
        ] = await Promise.all([
            getCategories(),
            getIncomes(dateInterval),
            getExpenses(dateInterval),
            getBudgets(dateInterval),
        ])

        const totalIncomes = calculateTotalAmount(incomes)
        const totalExpenses = calculateTotalExpenses(expenses)

        setTotalIncomes(totalIncomes)
        setTotalExpenses(totalExpenses)


        updateTotalRemaining(totalIncomes, totalExpenses)
        generateButtons(totalExpenses, totalIncomes, categories)

        setLoading(false)

    }

    const refreshIncomesData = async (incomes: Income[]) => {
        const totalIncomesAmount = calculateTotalAmount(incomes)

        setTotalIncomes(totalIncomesAmount)
        generateButtons(totalExpenses, totalIncomesAmount, categoriesContext)
        updateTotalRemaining(totalIncomesAmount, totalExpenses)

    }

    const refreshExpensesData = async (expenses: Expense[]) => {
        const totalExpensesAmount = calculateTotalExpenses(expenses)

        setTotalExpenses(totalExpensesAmount)
        generateButtons(totalExpensesAmount, totalIncomes, categoriesContext)
        updateTotalRemaining(totalIncomes, totalExpensesAmount)

    }

    const refreshBudgetsData = async () => {

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
        const expenses = await expenseRepository.getAll(dateInterval)
        updateExpensesContext(expenses)
        return expenses
    }

    const getBudgets = async (dateInterval: DateInterval) => {
        const budgets = await budgetRepository.getAll(dateInterval)
        updateBudgetsContext(budgets)
        return budgets
    }

    const getCategories = async () => {
        const categories = await categoryRepository.getAll()
        updateCategoriesContext(categories)
        return categories
    }

    // ------------------ calculate totals ------------------ //
    const calculateTotalAmount = (incomes: Income[]) => {
        let totalIncomes = 0
        incomes.forEach(income => totalIncomes += income.amount)

        return totalIncomes

    }

    const calculateTotalExpenses = (expenses: Expense[]) => {
        let totalExpenses = 0
        expenses.forEach(expense => totalExpenses += expense.amount)

        return totalExpenses
    }

    const generateButtons = (expenses: number, incomes: number, categories: Category[]) => {

        setButtonsHome([
            {
                title: 'Gastos y Presupuestos',
                subTitle: `$${currencyFormat(expenses)}`,
                onPress: () => onPressBudgetsExpenses(),
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

    const onPressBudgetsExpenses = () => {
        navigation.navigate(ScreenRoutes.BUDGET_EXPENSES, {})
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
        allCategories: categoriesContext,
        totalExpenses,
        totalIncomes,
        buttonsHome,
        showBottomSheet,
        hideBottomSheet,
        confirmDate
    }

}

export default useHomeViewModel