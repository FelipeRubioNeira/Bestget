import { useEffect, useState } from "react"
import { HomeScreenProps } from "../../../navigation/NavigationParamList"
import { ScreenRoutes } from "../../../navigation/Routes"
import { currencyFormat } from "../../../utils/NumberFormat"
import { Income } from "../../../data/types/Income"
import IncomeRepository from "../../../data/repository/incomeRepository/IncomeRepository"
import ICategoryRepository from "../../../data/repository/categoryRepository/ICategoryRespository"
import IExpenseRespository from "../../../data/repository/expenseRepository/IExpenseRepository"
import { Colors } from "../../constants/Colors"
import DateTime from "../../../utils/DateTime"
import { DateInterval } from "../../../data/types/DateInterval"
import { useGlobalContext } from "../../../data/globalContext/GlobalContext"
import IBudgetRepository from "../../../data/repository/budgetRepository/IBudgetRepository"
import { Expense } from "../../../data/types/Expense"
import CopyMonthUseCase from "../../../domain/useCases/CopyMonthUseCase"
import PasteMonthUseCase, { PasteType } from "../../../domain/useCases/pasteMonthUseCase"
import { FontSize } from "../../constants/Fonts"
import DefaultStyles from "../../styles/DefaultStyles"
import DeleteMothUseCase from "../../../domain/useCases/DeleteMonthUseCase"
import BudgetExpenseUnitOfWork from "../../../data/unitOfWork/BudgetExpenseUnitOfWork"
import useModalViewModel, { ModalButtonList } from "../../components/modal/ModalViewModel"
import useToastViewModel from "../../components/toast/ToastViewModel"


const dateTime = new DateTime()


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
    // repositories
    incomeRepository: IncomeRepository,
    expenseRepository: IExpenseRespository,
    budgetRepository: IBudgetRepository,
    categoryRepository: ICategoryRepository,

    // unitOfWork
    budgetExpenseUnitOfWork: BudgetExpenseUnitOfWork,

    // use cases
    copyMonthUseCase: CopyMonthUseCase,
    pasteMonthUseCase: PasteMonthUseCase,
    deleteMonthUseCase: DeleteMothUseCase,
} & HomeScreenProps

type BottomSheetState = {
    visible: boolean,
    date: string
}


const useHomeViewModel = ({
    navigation,

    // repositories
    incomeRepository,
    expenseRepository,
    categoryRepository,

    // unitOfWork
    budgetExpenseUnitOfWork,

    // use cases
    copyMonthUseCase,
    pasteMonthUseCase,
    deleteMonthUseCase,
}: HomeViewModelProps) => {


    // ------------------ context ------------------ //
    const {
        updateDateIntervalContext,

        // incomes
        incomesContext,
        updateIncomesContext,

        // expenses
        expensesContext,
        updateExpensesContext,

        // budgets
        updateBudgetsContext,

        // categories
        categoriesContext,
        updateCategoriesContext,

    } = useGlobalContext()

    // ------------------ hooks ------------------ //
    const { modalState, showModal, hideModal } = useModalViewModel()
    const {toastState, showToast} = useToastViewModel()



    // ------------------ states ------------------ //
    const [totalremaining, setTotalremaining] = useState("0")
    const [totalIncomes, setTotalIncomes] = useState(0)
    const [totalExpenses, setTotalExpenses] = useState(0)

    // ------------------ buttons ------------------ //
    const [buttonsHome, setButtonsHome] = useState<ButtonHomeProps[]>([])

    // ------------------ bottom sheet ------------------ //
    const [bottomSheetState, setBottomSheetState] = useState<BottomSheetState>({
        visible: false,
        date: ""
    })

    // ------------------ copy paste and delete ------------------ //

    // this storage all changes of the date interval
    const [operationDate, setOperacionDate] = useState<DateInterval>({
        initialDate: "",
        finalDate: ""
    })

    const [copiedMonth, setCopiedMonth] = useState<DateInterval>({
        initialDate: "",
        finalDate: "",
    })


    // ------------------ loading ------------------ //
    const [loading, setLoading] = useState(false)



    // ------------------ effects ------------------ //

    // get current date and fetch data
    useEffect(() => {
        const dateInterval = getCurrentDate()
        getData(dateInterval)
    }, [])


    // ------------------ refresh ------------------ //
    // refresh data when incomes change
    useEffect(() => {
        refreshIncomesData(incomesContext)
    }, [incomesContext])


    // refresh data when expenses change
    useEffect(() => {
        refreshExpensesData(expensesContext)
    }, [expensesContext])







    // ------------------ methods ------------------ //
    const getData = async (dateInterval: DateInterval) => {

        showLoading()

        const [
            incomes,
            expenses,
        ] = await Promise.all([
            getIncomes(dateInterval),
            getExpenses(dateInterval),
            getBudgets(dateInterval),
            getCategories()
        ])

        const totalIncomes = calculateTotalAmount(incomes)
        const totalExpenses = calculateTotalExpenses(expenses)

        setTotalIncomes(totalIncomes)
        setTotalExpenses(totalExpenses)


        updateTotalRemaining(totalIncomes, totalExpenses)
        generateButtons(totalExpenses, totalIncomes)

        hideLoading()

    }

    const refreshIncomesData = async (incomes: Income[]) => {
        const totalIncomesAmount = calculateTotalAmount(incomes)

        setTotalIncomes(totalIncomesAmount)
        generateButtons(totalExpenses, totalIncomesAmount)
        updateTotalRemaining(totalIncomesAmount, totalExpenses)

    }

    const refreshExpensesData = async (expenses: Expense[]) => {
        const totalExpensesAmount = calculateTotalExpenses(expenses)

        setTotalExpenses(totalExpensesAmount)
        generateButtons(totalExpensesAmount, totalIncomes)
        updateTotalRemaining(totalIncomes, totalExpensesAmount)

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
        const budgestWithRemaining = await budgetExpenseUnitOfWork.getBudgetsWithRemaining(dateInterval)
        updateBudgetsContext(budgestWithRemaining)
        return budgestWithRemaining
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

    const generateButtons = (expenses: number, incomes: number) => {

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




    // ------------------ botom sheet ------------------ //
    const onChangeOperationDate = (newDate: string) => {

        const nextMonth = dateTime.getNextMonth(newDate)

        setOperacionDate({
            initialDate: newDate,
            finalDate: nextMonth
        })
    }

    // TODO: move this to a helper or utils
    const getCurrentDate = (): DateInterval => {

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
        return dateTime.getNextMonth(date)
    }



    // ------------------ copy paste and delete ------------------ //
    const onCopyMonth = async () => {

        showLoading()

        const { isValid, message } = await copyMonthUseCase.execute(operationDate)

        hideLoading()

        if (!isValid) {
            clearCopiedMonth()
            showModal("Error", message, [
                {
                    text: "Aceptar",
                    onPress: hideModal
                }
            ])

        } else {
            setCopiedMonth(operationDate)
            showToast("Se ha copiado el mes", "success")
        }

    }

    const clearCopiedMonth = () => {
        setCopiedMonth({
            initialDate: "",
            finalDate: "",
        })
    }

    /** shows a modal to confirm the paste month */
    const onPasteMonth = () => {

        showModal(
            "Pegar mes",
            "Está a punto de pegar toda la información de un mes a otro. ¿Está seguro que desea continuar?",
            [
                {
                    text: "Aceptar",
                    onPress: () => {
                        validatePasteAction()
                        hideModal()
                    }
                },
                {
                    text: "Cancelar",
                    onPress: hideModal,
                    style: { ...DefaultStyles.highlightedText }
                },
            ]
        )

    }

    /**
     * Usually we validate all the data in use case, but in this case we need to show a modal
     * and options to the user, so we need to validate here
     **/
    const validatePasteAction = async () => {

        let message = ""
        let buttonList: ModalButtonList[] = []

        showLoading()

        const [
            dateValidation, // a negative outcome may render the operation invalid,
            isThereDataValidation, // validate if there is data where we want to paste
        ] = await Promise.all([
            pasteMonthUseCase.applyValidations(operationDate, copiedMonth),
            pasteMonthUseCase.isThereData(operationDate),
        ])

        hideLoading()


        if (!dateValidation.isValid) {

            message = dateValidation.message

            buttonList = [
                {
                    text: "Aceptar",
                    onPress: hideModal
                }
            ]

            showModal("Error", message, buttonList)

        } else if (!isThereDataValidation.isValid) {

            message = isThereDataValidation.message
            buttonList = [
                {
                    text: "Reemplazar",
                    onPress: () => pasteMonth("overwrite"),
                    style: { fontSize: FontSize.XSMALL }
                },
                {
                    text: "Combinar",
                    onPress: () => pasteMonth("combine"),
                    style: { fontSize: FontSize.XSMALL }
                },
                {
                    text: "Cancelar",
                    onPress: hideModal,
                    style: {
                        fontSize: FontSize.XSMALL,
                        ...DefaultStyles.highlightedText
                    }
                },
            ]

            showModal("Error", message, buttonList)

        } else pasteMonth("overwrite")



    }

    const pasteMonth = async (pasteType: PasteType) => {

        hideModal()
        showLoading()

        const { isValid, message } = await pasteMonthUseCase.execute(
            operationDate,
            copiedMonth,
            pasteType
        )

        hideLoading()

        if (isValid) {
            showToast("Se ha pegado el mes", "success")

        } else {
            showModal("Error", message, [
                {
                    text: "Aceptar",
                    onPress: hideModal
                }
            ])
        }


        clearCopiedMonth()

    }

    /* Each time we delete a month, we ask the user to confirm the action */
    const onDeleteMonth = () => {

        showModal(
            "Eliminar mes",
            "Está a punto de eliminar toda la información de un mes. ¿Está seguro que desea continuar?",
            [
                {
                    text: "Aceptar",
                    onPress: deleteMonth
                },
                {
                    text: "Cancelar",
                    onPress: hideModal,
                    style: { ...DefaultStyles.highlightedText }
                },
            ]
        )

    }

    const deleteMonth = async () => {

        hideModal()
        showLoading()

        // 1- delete all data from the month
        const { isValid, message } = await deleteMonthUseCase.execute(operationDate)

        // 2- fetch data again
        await getData(operationDate)

        hideLoading()

        if (isValid) {
            showToast("Se ha eliminado el mes", "success")

        } else {
            showModal("Error", message, [
                {
                    text: "Aceptar",
                    onPress: hideModal
                }
            ])
        }

    }






    // ------------------ loading ------------------ //
    const showLoading = () => setLoading(true)

    const hideLoading = () => setLoading(false)





    // ------------------ return ------------------ //
    return {

        bottomSheetState,
        totalremaining,
        allIncomes: incomesContext,
        allCategories: categoriesContext,
        totalExpenses,
        totalIncomes,
        buttonsHome,

        // botom sheet
        showBottomSheet,
        confirmDate,
        hideBottomSheet,
        onChangeOperationDate,

        // copy paste and delete
        onCopyMonth,
        onPasteMonth,
        onDeleteMonth,

        // modal
        modalState,

        // toast
        toastState,

        // loading
        loading,
    }

}

export default useHomeViewModel