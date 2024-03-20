import { useEffect, useState } from "react"
import { BudgetsScreenProps } from "../../../navigation/NavigationParamList"
import { currencyFormat } from "../../../utils/Convert"
import { Category } from "../../../data/types/Categoty"
import { ScreenRoutes } from "../../../navigation/Routes"
import IExpenseRespository from "../../../data/repository/expenseRepository/IExpenseRepository"
import { Expense, ExpenseUI } from "../../../data/types/Expense"
import TouchableIcon from "../../components/touchableIcon/TouchableIcon"

const editIcon = require("../../../assets/icons/ic_edit.png")


type Title = {
    main: string,
    available: string,
    used: string
}

type budgetViewModelProps = {
    expensesRepository: IExpenseRespository
} & BudgetsScreenProps


const useBudgetsViewModel = ({ navigation, route, expensesRepository }: budgetViewModelProps) => {


    // ----------- params ----------- //
    const {
        budget,
        categoryList = [],
        newExpenseId,
    } = route.params


    // ----------- states ----------- //
    const [category, setCategory] = useState<Category | undefined>()
    const [expenseList, setExpenseList] = useState<ExpenseUI[]>([])

    const [title, setTitle] = useState<Title>({
        main: "",
        available: "",
        used: ""
    })

    const [editMode, setEditMode] = useState(false)




    // ----------- effects ----------- //

    useEffect(() => {
        getData()
    }, [newExpenseId])

    // we add the delete button to the header if there are budget or expenses
    useEffect(() => {

        navigation.setOptions({
            headerRight: () => {
                if (expenseList.length === 0) return null
                return (
                    <TouchableIcon
                        image={editIcon}
                        onPress={() => setEditMode(!editMode)}
                    />
                )
            }
        })

    }, [expenseList, editMode])




    // ########### methods ########### //

    // ----------- data ----------- //

    const getData = async () => {

        const categoryFound = findCategory(budget?.categoryId, categoryList)

        const expenseList = await expensesRepository.getByBudgetId(budget.id)
        const expenseListFormatted = applyFormat(expenseList)
        const totalExpenses = getTotalExpenses(expenseList)


        const title = generateTitle(
            budget.amount,
            budget.name,
            totalExpenses,
        )

        setTitle(title)
        setCategory(categoryFound)
        setExpenseList(expenseListFormatted)
    }



    const getTotalExpenses = (expenseList: Expense[]) => {

        let totalExpenses = 0
        expenseList.forEach(expense => {
            totalExpenses += expense.amount
        })
        return totalExpenses
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
    const generateTitle = (budgetAmount: number, budgetName: string, totalExpenses: number) => {

        const budgetCurrency = currencyFormat(budgetAmount)
        const expensesCurrency = currencyFormat(totalExpenses)
        const availableCurrency = currencyFormat(budgetAmount - totalExpenses)


        const title = `Ha destinado $${budgetCurrency} a "${budgetName}"`
        const used = `Ocupado: $${expensesCurrency}`
        const available = `Disponible: $${availableCurrency}`

        return {
            main: title,
            available,
            used
        }

    }


    const findCategory = (categoryId: number = 0, categoryList: Category[]) => {
        const category = categoryList.find(category => category.id === categoryId)
        return category
    }


    // ----------- events ----------- //
    const onPressNewExpense = () => {
        navigation.navigate(ScreenRoutes.EXPENSES_FORM, {
            budget,
            categoryList
        })
    }

    const onPressEditExpense = (expense: Expense) => {}

    const onPressDeleteExpense = (expense: Expense) => {}



    // ----------- return ----------- //
    return {
        title,
        category,
        expenseList,
        editMode,

        onPressNewExpense
    }

}

export default useBudgetsViewModel