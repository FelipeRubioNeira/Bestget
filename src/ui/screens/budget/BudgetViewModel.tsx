import { useEffect, useState } from "react"
import { BudgetsScreenProps } from "../../../navigation/NavigationParamList"
import { currencyFormat, numberFormat } from "../../../utils/Convert"
import { Category } from "../../../data/types/Categoty"
import { ScreenRoutes } from "../../../navigation/Routes"
import IExpenseRespository from "../../../data/repository/expenseRepository/IExpenseRepository"
import { Expense, ExpenseUI } from "../../../data/types/Expense"
import TouchableIcon from "../../components/touchableIcon/TouchableIcon"
import { ButtonModal, ModalProps } from "../../components/modal/Modal"
import DefaultStyles from "../../styles/DefaultStyles"
import DeleteExpenseUseCase from "../../../domain/useCases/DeleteExpenseUseCase"

const editIcon = require("../../../assets/icons/ic_edit.png")


type Title = {
    main: string,
    available: string,
    used: string
}

type budgetViewModelProps = {
    expensesRepository: IExpenseRespository,
    deleteExpenseUseCase: DeleteExpenseUseCase
} & BudgetsScreenProps


const useBudgetsViewModel = ({ navigation, route, expensesRepository, deleteExpenseUseCase }: budgetViewModelProps) => {


    // ----------- params ----------- //
    const {
        budget,
        categoryList = [],
        newExpenseId,
    } = route.params


    // ----------- states ----------- //
    const [category, setCategory] = useState<Category | undefined>()
    const [expenseList, setExpenseList] = useState<ExpenseUI[]>([])

    // used to delete an expense
    const [expenseId, setExpenseId] = useState<string>("")

    const [title, setTitle] = useState<Title>({
        main: "",
        available: "",
        used: ""
    })

    const [editMode, setEditMode] = useState(false)

    const [modalState, setModalState] = useState<ModalProps>({
        visible: false,
        title: "",
        message: "",
        buttonList: []
    })




    // ----------- effects ----------- //

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            getData()
        })

        return unsubscribe

    }, [navigation])


    // we add the delete button to the header if there are budget or expenses
    useEffect(() => {

        navigation.setOptions({
            headerRight: () => {
                if (expenseList.length === 0) return null
                return (
                    <TouchableIcon
                        image={editIcon}
                        onPress={editMode ? turnOffEditMode : turnOnEditMode}
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

    const applyFormat = (expenseList: Expense[]): ExpenseUI[] => {

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

    const turnOnEditMode = () => {
        setEditMode(true)
    }

    const turnOffEditMode = () => {
        setEditMode(false)
    }

    // ----------- modal ----------- //
    const showModal = (title: string, message: string, buttonList: ButtonModal[]) => {
        setModalState({
            visible: true,
            title,
            message,
            buttonList: buttonList
        })
    }

    const hideModal = () => {
        setModalState({
            ...modalState,
            visible: false,
        })
    }



    // ----------- events ----------- //
    const onPressNewExpense = () => {
        navigation.navigate(ScreenRoutes.EXPENSES_FORM, {
            budget,
            categoryList
        })
    }

    const onPressEdit = (expenseId: string) => {

        turnOffEditMode()

        const expense = findExpense(expenseId)

        navigation.navigate(ScreenRoutes.EXPENSES_FORM, {
            expense,
            categoryList,
            budget
        })

    }

    const onPressDelete = (expenseId: string) => {

        setExpenseId(expenseId)

        showModal(
            "Eliminar gasto",
            "¿Está seguro que desea eliminar este gasto?",
            [
                {
                    text: "Aceptar",
                    onPress: deleteExpense
                },
                {
                    text: "Cancelar",
                    onPress: hideModal,
                    style: { ...DefaultStyles.mainButton }
                }
            ]
        )

    }

    const deleteExpense = async () => {

        hideModal()

        const response = await deleteExpenseUseCase.delete(expenseId)

        if (response.isValid) {
            getData()

        } else {

            showModal(
                response.message.title,
                response.message.message,
                [
                    {
                        text: "Aceptar",
                        onPress: hideModal,
                    }
                ]
            )
        }
    }


    // ----------- utils ----------- //

    const findExpense = (expenseId: string): Expense => {

        const item = expenseList.find(expense => expense.id === expenseId)

        if (item) {

            const expense: Expense = {
                id: item.id,
                name: item.name,
                amount: numberFormat(item.amount),
                date: item.date,
                categoryId: category?.id || 0,
                budgetId: budget?.id
            }

            return expense

        } else {
            return {} as Expense
        }

    }



    // ----------- return ----------- //
    return {
        modalState,
        title,
        category,
        expenseList,
        editMode,
        onPressEdit,
        onPressDelete,

        onPressNewExpense
    }

}

export default useBudgetsViewModel