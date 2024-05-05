import React from "react"
import { useEffect, useState } from "react"
import { BudgetsScreenProps } from "../../../navigation/NavigationParamList"
import { currencyFormat, numberFormat } from "../../../utils/NumberFormat"
import { Category } from "../../../data/types/Categoty"
import { ScreenRoutes } from "../../../navigation/Routes"
import IExpenseRespository from "../../../data/repository/expenseRepository/IExpenseRepository"
import { Expense, ExpenseUI } from "../../../data/types/Expense"
import TouchableIcon from "../../components/touchableIcon/TouchableIcon"
import { ModalButtonList, ModalProps } from "../../components/modal/Modal"
import DefaultStyles from "../../styles/DefaultStyles"
import DeleteExpenseUseCase from "../../../domain/useCases/DeleteExpenseUseCase"
import Icons from "../../../assets/icons"
import DateTime from "../../../utils/DateTime"
import { useGlobalContext } from "../../../data/globalContext/GlobalContext"
import { useEventBus } from "../../../data/globalContext/events/EventBus"



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

    // ----------- context ----------- //
    const { categoriesContext } = useGlobalContext()


    // ----------- event bud ----------- //
    const { emmitEvent } = useEventBus()


    // ----------- params ----------- //
    const {
        budget,
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

    const [modalState, setModalState] = useState<ModalProps>({
        visible: false,
        title: "",
        message: "",
        buttonList: []
    })




    // ----------- effects ----------- //
    // we add the delete button to the header if there are budget or expenses
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                if (expenseList.length === 0) return null
                return (
                    <TouchableIcon
                        image={Icons.edit}
                        onPress={editMode ? turnOffEditMode : turnOnEditMode}
                    />
                )
            }
        })

    }, [expenseList, editMode])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getData()
        })

        return unsubscribe

    }, [navigation])





    // ########### methods ########### //

    // ----------- data ----------- //

    const getData = async () => {

        // category and color
        const categoryFound = findCategory(budget?.categoryId, categoriesContext)

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

        const dateTime = new DateTime()

        return expenseList.map(expense => {


            const newExpenseFormatted = {
                id: expense.id,
                name: expense.name,
                amount: currencyFormat(expense.amount),
                date: dateTime.convertToNormalDate(expense.date),
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
    const showModal = (title: string, message: string, buttonList: ModalButtonList[]) => {
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
        })
    }

    const onPressEdit = (expenseId: string) => {

        turnOffEditMode()

        const expense = findExpense(expenseId)

        navigation.navigate(ScreenRoutes.EXPENSES_FORM, {
            expense,
            budget,
        })

    }

    const onPressDelete = (expenseId: string) => {

        showModal(
            "Eliminar gasto",
            "¿Está seguro que desea eliminar este gasto?",
            [
                {
                    text: "Aceptar",
                    onPress: () => deleteExpense(expenseId)
                },
                {
                    text: "Cancelar",
                    onPress: hideModal,
                    style: { ...DefaultStyles.mainButton }
                }
            ]
        )

    }

    const deleteExpense = async (expenseId: string) => {

        hideModal()

        const response = await deleteExpenseUseCase.delete(expenseId, emmitEvent)

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