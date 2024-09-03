import { useEffect, useState } from "react"
import { HomeGroupScreenProps } from "../../../navigation/NavigationParamList"
import { ScreenRoutes } from "../../../navigation/Routes"
import { currencyFormat } from "../../../utils/NumberFormat"
import { Income } from "../../../data/types/Income"
import ICategoryRepository from "../../../data/repository/categoryRepository/ICategoryRespository"
import IExpenseRespository from "../../../data/repository/expenseRepository/IExpenseRepository"
import DateTime from "../../../utils/DateTime"
import { DateInterval } from "../../../data/types/DateInterval"
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
import { QueryGroupParams, QueryParams } from "../../../data/types/QueryParams"
import { useAppSelector } from "../../../data/globalContext/StoreHooks"
import { selectUserApp } from "../../../data/globalContext/redux/slices/UserAppSlice"
import { useAppDispatch } from "../../../data/globalContext/StoreHooks";
import { selectFinancesApp, updateBudgets, updateCategories, updateExpenses, updateIncomes } from "../../../data/globalContext/redux/slices/FinancesAppSlice"
import { updateDateInterval } from "../../../data/globalContext/redux/slices/DateIntervalAppSlice"
import UpdateSavedDateUseCase from "../../../domain/useCases/UpdateSavedDateUseCase"
import ReadSavedDateUseCase from "../../../domain/useCases/ReadSavedDateUseCase"
import { IIncomeGroupRepository } from "../../../data/repository/incomeRepository/IIncomeGroupRepository"
import IncomeGroupRepository from "../../../data/repository/incomeRepository/IncomeGroupRepository"


const dateTime = new DateTime()


// ------------------ types ------------------ //
export type MenuType = "gastos" | "ingresos" | "estadisticas" | "perfil" | "grupos"

export type ButtonHomeProps = {
    title: string,
    subTitle?: string,
    onPress: () => void,
    backgroundColor: string,
    titleColor: string
    type: MenuType,
    comingSoon?: boolean,
}

type HomeViewModelProps = {
    // repositories
    incomeGroupRepository: IncomeGroupRepository,
    expenseRepository: IExpenseRespository,
    budgetRepository: IBudgetRepository,
    categoryRepository: ICategoryRepository,

    // unitOfWork
    budgetExpenseUnitOfWork: BudgetExpenseUnitOfWork,

    // use cases
    copyMonthUseCase: CopyMonthUseCase,
    pasteMonthUseCase: PasteMonthUseCase,
    deleteMonthUseCase: DeleteMothUseCase,

    updateSavedDateUseCase: UpdateSavedDateUseCase,
    readSavedDateUseCase: ReadSavedDateUseCase,

} & HomeGroupScreenProps

type BottomSheetState = {
    visible: boolean,
    date: string
}


const useHomeGroupViewModel = ({
    navigation,
    route,

    // repositories
    incomeGroupRepository,
    expenseRepository,
    categoryRepository,

    // unitOfWork
    budgetExpenseUnitOfWork,

    // use cases
    copyMonthUseCase,
    pasteMonthUseCase,
    deleteMonthUseCase,

    readSavedDateUseCase,
    updateSavedDateUseCase

}: HomeViewModelProps) => {

    // ------------------ route ------------------ //
    const { groupId } = route.params



    // ------------------ context ------------------ //
    const userApp = useAppSelector(selectUserApp)

    const {
        incomes,
        categories,
        expenses
    } = useAppSelector(selectFinancesApp)

    const appDispatch = useAppDispatch()


    // ------------------ hooks ------------------ //
    const { modalState, showModal, hideModal } = useModalViewModel()
    const { toastState, showToast } = useToastViewModel()



    // ------------------ states ------------------ //
    const [totalremaining, setTotalremaining] = useState("0")
    const [totalIncomes, setTotalIncomes] = useState(0)
    const [totalExpenses, setTotalExpenses] = useState(0)


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

        const getSavedDate = async () => {

            const dateInterval = await getCurrentDate()

            // local state
            setBottomSheetState({
                ...bottomSheetState,
                date: dateInterval.initialDate,
            })

            // global state
            appDispatch(updateDateInterval({
                initialDate: dateInterval.initialDate,
                finalDate: dateInterval.finalDate
            }))

            getData(dateInterval)
        }

        getSavedDate()


    }, [groupId])


    // ------------------ refresh ------------------ //
    // refresh data when incomes change
    useEffect(() => {
        refreshIncomesData(incomes)
    }, [incomes])


    useEffect(() => {
        refreshExpensesData(expenses)
    }, [expenses])







    // ------------------ methods ------------------ //
    const getData = async (dateInterval: DateInterval) => {

        showLoading()

        const [
            incomes,
            expenses,
        ] = await Promise.all([
            getIncomes({ groupId: groupId, ...dateInterval }),
            //getExpenses({ userId: userApp.userId, ...dateInterval }),
            //getBudgets({ userId: userApp.userId, ...dateInterval }),
            getCategories()
        ])


        //const totalIncomes = calculateTotalAmount(incomes)
        //const totalExpenses = calculateTotalExpenses(expenses)

        setTotalIncomes(totalIncomes)
        setTotalExpenses(totalExpenses)


        updateTotalRemaining(totalIncomes, totalExpenses)

        hideLoading()

    }

    const refreshIncomesData = async (incomes: Income[]) => {

        const totalIncomesAmount = calculateTotalAmount(incomes)
        setTotalIncomes(totalIncomesAmount)
        updateTotalRemaining(totalIncomesAmount, totalExpenses)

    }

    const refreshExpensesData = async (expenses: Expense[]) => {
        const totalExpensesAmount = calculateTotalExpenses(expenses)

        setTotalExpenses(totalExpensesAmount)
        updateTotalRemaining(totalIncomes, totalExpensesAmount)

    }

    const updateTotalRemaining = (totalIncomes: number, totalExpenses: number) => {
        setTotalremaining(currencyFormat(totalIncomes - totalExpenses))
    }


    // ------------------ repository methods ------------------ //
    const getIncomes = async (queryGroupParams: QueryGroupParams) => {
        const incomes = await incomeGroupRepository.getAll(queryGroupParams)
        appDispatch(updateIncomes(incomes))
        return incomes
    }

    const getExpenses = async (queryParams: QueryParams) => {
        const expenses = await expenseRepository.getAll(queryParams)
        appDispatch(updateExpenses(expenses))
        return expenses
    }

    const getBudgets = async (queryParams: QueryParams) => {
        const budgestWithRemaining = await budgetExpenseUnitOfWork.getBudgetsWithRemaining(queryParams)
        appDispatch(updateBudgets(budgestWithRemaining))
        return budgestWithRemaining
    }

    const getCategories = async () => {
        const categories = await categoryRepository.getAll()
        appDispatch(updateCategories(categories))
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

    // ------------------ navigation methods ------------------ //
    const navigateTo = (screen: ScreenRoutes, params: any) => {
        navigation.navigate(screen, params)
    }

    const navigateToIncomes = () => {
        navigateTo(ScreenRoutes.INCOMES, {})
    }

    const navigateToExpenses = () => {
        navigateTo(ScreenRoutes.BUDGET_EXPENSES, {})
    }

    const navigateToStatistics = () => {
        navigateTo(ScreenRoutes.STATISTICS, {})
    }

    const navigateToProfile = () => {
        navigateTo(ScreenRoutes.PROFILE, {})
    }




    // ------------------ botom sheet ------------------ //
    const onChangeOperationDate = (newDate: string) => {

        const nextMonth = dateTime.getNextMonth(newDate)

        setOperacionDate({
            initialDate: newDate,
            finalDate: nextMonth
        })
    }

    const getCurrentDate = async (): Promise<DateInterval> => {

        const curretDateInterval = await readSavedDateUseCase.execute()

        if (curretDateInterval) {
            return curretDateInterval
        }

        const dateInterval = dateTime.getMonthRange(dateTime.date)

        await updateSavedDateUseCase.execute(dateInterval)

        return dateInterval

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

        appDispatch(updateDateInterval(newDateInterval))
        getData(newDateInterval)

    }

    const getNextMonth = (date: string): string => {
        return dateTime.getNextMonth(date)
    }



    // ------------------ copy paste and delete ------------------ //
    const onCopyMonth = async () => {

        showLoading()

        const { isValid, message } = await copyMonthUseCase.execute({
            userId: userApp.userId,
            ...operationDate
        })


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
            pasteMonthUseCase.isThereData({
                userId: userApp.userId,
                ...operationDate
            }),
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
            userApp.userId,
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
        const { isValid, message } = await deleteMonthUseCase.execute({
            userId: userApp.userId,
            ...operationDate
        })

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

        userName: userApp.name,

        bottomSheetState,
        totalremaining,
        allIncomes: incomes,
        allCategories: categories,
        totalExpenses,
        totalIncomes,

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

        navigateToExpenses,
        navigateToIncomes,
        navigateToStatistics,
        navigateToProfile,
    }

}

export default useHomeGroupViewModel