import { useEffect, useState } from "react";
import { useAppSelector } from "../../../data/globalContext/StoreHooks";
import { selectFinancesApp } from "../../../data/globalContext/redux/slices/FinancesAppSlice";
import { Expense } from "../../../data/types/Expense";
import { Colors } from "../../constants/Colors";
import { Category } from "../../../data/types/Categoty";
import { Income } from "../../../data/types/Income";

/*
    para calcular el porcentaje necesitamos hacer lo siguiente:

    1- El ingreso es meyor que el gasto?
        1.1 Si el ingreso es mayor que el gasto, entonces usamos el ingreso como total
        1.2 Si el gasto es mayor que el ingreso, entonces usamos el gasto como total

    2- Calculamos el porcentaje de cada item
        2.1 Porcentaje = (item.amount * 100) / total

    3- Si hay dinero extra, lo agregamos al array de items junto con su porcentaje
    
    4- Retornamos el array de items
*/

type PieChartItem = {
    name: string,
    amount: number,
    color: string,
    percentage?: number,
}


const useStatisticsViewModel = () => {

    // ------------------ context ------------------ //
    const {
        incomes,
        categories,
        expenses
    } = useAppSelector(selectFinancesApp)


    // ------------------ states ------------------ //
    const [userData, setUserData] = useState<PieChartItem[]>([])


    // ------------------ effects ------------------ //
    useEffect(() => {
        const newData = calculateDistribution(expenses)
        setUserData(newData)
    }, [expenses])


    // ------------------ methods ------------------ //
    const calculateDistribution = (expenses: Expense[]): PieChartItem[] => {

        const totalIncomes = calculateTotalIncomes(incomes)
        const totalExpenses = calculateTotalExpenses(expenses)

        const userData = calculateExpenseDistribution(expenses)

        const extraMoney = isThereExtraMoney(totalIncomes, totalExpenses)

        if (extraMoney) {
            userData.push(extraMoney)
        }

        return userData

    }

    const calculateExpenseDistribution = (expenses: Expense[]): PieChartItem[] => {

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
                }
                userData.push(item)
            }

        })

        return userData
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

    return {
        userData
    }

}

export default useStatisticsViewModel;