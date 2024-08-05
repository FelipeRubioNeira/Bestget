import { useEffect, useState } from "react";
import { useAppSelector } from "../../../data/globalContext/StoreHooks";
import { selectFinancesApp } from "../../../data/globalContext/redux/slices/FinancesAppSlice";
import { Expense } from "../../../data/types/Expense";
import { Colors } from "../../constants/Colors";
import { Category } from "../../../data/types/Categoty";
import { Income } from "../../../data/types/Income";
import { capitalizeFirstLetter } from "../../../utils/String";
import { selectDateIntervalApp } from "../../../data/globalContext/redux/slices/DateIntervalAppSlice";
import DateTime from "../../../utils/DateTime";
import { getMonth } from 'date-fns';
const dateTime = new DateTime();


// ------------------ types ------------------ //
export type PieChartItem = {
    name: string,
    amount: number,
    color: string,
    percentage?: string,
}

export type BarChartData = {
    data: number[],
}

export type ContributionChartValue = {
    date: String,
    count: number,
    expenseList: Expense[],
}

export type ContributionData = {
    month: string,
    endDate: string,
    values: ContributionChartValue[],
}






const useStatisticsViewModel = () => {

    // ------------------ context ------------------ //
    const {
        incomes,
        categories,
        expenses
    } = useAppSelector(selectFinancesApp)

    const {
        initialDate,
        finalDate,
    } = useAppSelector(selectDateIntervalApp)


    // ------------------ states ------------------ //
    const [pieChartData, setPieChartData] = useState<PieChartItem[]>([])
    const [barChartData, setBarChartData] = useState<number[]>([])
    const [contributionData, setContributionData] = useState<ContributionData>({
        month: "",
        endDate: "",
        values: []
    })


    // ------------------ effects ------------------ //
    useEffect(() => {

        const {
            barChartData,
            pieChartData,
            contributionData,
        } = calculateDistribution(expenses)

        setBarChartData(barChartData)
        setPieChartData(pieChartData)
        setContributionData(contributionData)

    }, [expenses, incomes])


    // ------------------ methods ------------------ //
    const calculateDistribution = (expenses: Expense[]) => {

        const totalIncomes = calculateTotalIncomes(incomes)
        const totalExpenses = calculateTotalExpenses(expenses)

        const pieChartData = calculateExpenseDistribution(expenses, totalIncomes)

        const extraMoney = isThereExtraMoney(totalIncomes, totalExpenses)

        const contributionData = calculateContributions(expenses)

        if (extraMoney) {
            pieChartData.push(extraMoney)
        }

        return {
            pieChartData,
            barChartData: [totalIncomes, totalExpenses],
            contributionData
        }



    }

    const calculateExpenseDistribution = (expenses: Expense[], totalIncomes: number): PieChartItem[] => {

        const userData: PieChartItem[] = []

        expenses.forEach(expense => {

            const category = findCategoryName(expense.categoryId)
            const existingData = validateIfDataExists(category.name, userData)

            if (existingData) {
                existingData.amount += expense.amount

            } else {
                const item: PieChartItem = {
                    name: category.name,
                    color: category.color,
                    amount: expense.amount,
                    percentage: calculatePercentage(expense.amount, totalIncomes)
                }
                userData.push(item)
            }

        })

        return userData
    }

    const calculatePercentage = (amount: number, total: number): string => {
        const partial = (amount * 100) / total
        const totalRounded = partial.toFixed(2)
        return totalRounded
    }

    const calculateTotalExpenses = (expenses: Expense[]): number => {
        return expenses.reduce((acc, income) => acc + income.amount, 0)
    }

    const calculateTotalIncomes = (incomes: Income[]): number => {
        return incomes.reduce((acc, income) => acc + income.amount, 0)
    }

    const isThereExtraMoney = (totalIncomes: number, totalExpenses: number): PieChartItem | null => {

        if (totalIncomes > totalExpenses) {
            const item: PieChartItem = {
                name: "Restante ",
                color: Colors.LIGHT_GRAY,
                amount: totalIncomes - totalExpenses,
                percentage: calculatePercentage(totalIncomes - totalExpenses, totalIncomes)
            }
            return item

        } else return null
    }

    const findCategoryName = (categoryId: number): Category => {

        const categoryFinded = categories.find(category => category.id === categoryId)

        const defaultCategory: Category = {
            id: 0,
            name: "Sin categoria",
            color: Colors.DARK_GRAY
        }

        if (categoryFinded) return categoryFinded
        else return defaultCategory

    }

    const validateIfDataExists = (name: string, data: PieChartItem[]) => {
        return data.find(data => data.name === name);
    }

    /*
        1- Get the firt day of the month throw the first expense
        2- Get the last day of the month throw the last expense
        3- Get the name of the month 
        4- Genenerate the data for the contribution graph
            4.1- Map every day of the month and check if there is an expense
            4.2- If there is an expense, add the amount to the day
            4.3- If there is not an expense, add 0 to the day
            4.4- Return the data
     */

    const isSameDay = (date: string, currentDate: string): boolean => {
        const expenseDate = dateTime.convertToAmericanDate(date)
        return expenseDate === currentDate
    }

    const calculateContributions = (expenses: Expense[]): ContributionData => {

        const contributions: ContributionChartValue[] = []
        const currentYear = dateTime.getYear(initialDate)
        const currentMonth = getMonth(initialDate) // "2024-01-01T00:00:00"

        const days = dateTime.getMonthsDay(Number(currentYear), Number(currentMonth))


        for (let i = 1; i <= days; i++) {

            const day = String(i).padStart(2, '0')
            const month = String(currentMonth + 1).padStart(2, '0')
            const currentDate = `${currentYear}-${month}-${day}`

            const expensesOfSameDay = expenses.filter(expense => isSameDay(expense.date, currentDate))
            const totalExpenses = calculateTotalExpenses(expensesOfSameDay)
            

            contributions.push({
                count: totalExpenses,
                date: currentDate,
                expenseList: expensesOfSameDay
            })

        }

        return {
            month: getMonthName(initialDate),
            endDate: `${currentYear}-${currentMonth}-${days}`,
            values: contributions,
        }

    }


    const getMonthName = (date: string): string => {
        const monthNumber = dateTime.getMonth(date)
        const monthName = dateTime.getMonthName(Number(monthNumber))
        const capitalizeMonth = capitalizeFirstLetter(monthName)

        return capitalizeMonth
    }


    return {
        pieChartData,
        barChartData,
        contributionData
    }

}

export default useStatisticsViewModel;