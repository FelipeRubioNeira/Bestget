import { useEffect, useState } from "react"
import { BudgetsScreenProps } from "../../../navigation/NavigationParamList"
import { currencyFormat } from "../../../utils/Convert"
import { Category } from "../../../data/types/Categoty"
import { ScreenRoutes } from "../../../navigation/Routes"
import IExpenseRespository from "../../../data/repository/expenseRepository/IExpenseRepository"
import { Expense, ExpenseUI } from "../../../data/types/Expense"


type budgetViewModelProps = {
    expensesRepository: IExpenseRespository
} & BudgetsScreenProps


const useBudgetsViewModel = ({ navigation, route, expensesRepository }: budgetViewModelProps) => {


    // ----------- params ----------- //
    const {
        budget,
        categoryList = [],
        newExpenseId
    } = route.params


    // ----------- states ----------- //
    const [category, setCategory] = useState<Category | undefined>()
    const [title, setTitle] = useState<string>("")

    const [expenseList, setExpenseList] = useState<ExpenseUI[]>([])
    const [available, setAvailable] = useState<string>("")
    const [used, setUsed] = useState<string>("")




    // ----------- effects ----------- //
    useEffect(() => {

        generateTitle(
            currencyFormat(budget.amount),
            budget.name
        )

        findCategory(budget?.categoryId, categoryList)

    }, [budget])


    useEffect(() => {
        getExpensesById(budget.id)
    }, [newExpenseId])




    // ########### methods ########### //

    // ----------- data ----------- //
    const getExpensesById = async (id: string) => {

        const expenses = await expensesRepository.getById(id)
        const expenseListFormatted = applyFormat(expenses)

        setExpenseList(expenseListFormatted)
    }

    const applyFormat = (expenseList: Expense[]) => {

        return expenseList.map(expense => {

            const newExpenseFormatted = {
                id: expense.id,
                name: expense.name,
                amount: currencyFormat(expense.amount),
                date: expense.date,
                category: category,
            } as ExpenseUI

            return newExpenseFormatted
        })
    }


    // ----------- ui ----------- //
    const generateTitle = (budgetAmount: string, budgetName: string) => {

        const title = `Ha destinado $${budgetAmount} a "${budgetName}"`
        const used = `Ocupado: $${0}`
        const available = `Disponible: $${0}`

        setTitle(title)
        setAvailable(available)
        setUsed(used)

    }

    const findCategory = (categoryId: number = 0, categoryList: Category[]) => {
        const category = categoryList.find(category => category.id === categoryId)
        setCategory(category)
    }


    // ----------- events ----------- //
    const onPress = () => {
        navigation.navigate(ScreenRoutes.EXPENSES_CREATE, {
            budget,
            categoryList
        })
    }



    // ----------- return ----------- //
    return {
        title,
        available,
        used,
        category,
        expenseList,

        onPress
    }

}

export default useBudgetsViewModel