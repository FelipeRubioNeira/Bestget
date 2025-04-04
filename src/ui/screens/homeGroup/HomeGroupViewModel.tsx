import { useEffect, useState } from "react"
import { Share } from "react-native"
import { useAppDispatch, useAppSelector } from "../../../data/globalContext/StoreHooks"
import { updateDateInterval } from "../../../data/globalContext/redux/slices/DateIntervalAppSlice"
import { selectFinancesApp, updateBudgets, updateCategories, updateExpenses, updateIncomes } from "../../../data/globalContext/redux/slices/FinancesAppSlice"
import { selectUserApp } from "../../../data/globalContext/redux/slices/UserAppSlice"
import IBudgetRepository from "../../../data/repository/budgetRepository/IBudgetRepository"
import ICategoryRepository from "../../../data/repository/categoryRepository/ICategoryRespository"
import IExpenseRespository from "../../../data/repository/expenseRepository/IExpenseRepository"
import { DateInterval } from "../../../data/types/DateInterval"
import { Expense } from "../../../data/types/Expense"
import { Income } from "../../../data/types/Income"
import { QueryGroupParams, QueryParams } from "../../../data/types/QueryParams"
import BudgetExpenseUnitOfWork from "../../../data/unitOfWork/BudgetExpenseUnitOfWork"
import CopyMonthUseCase from "../../../domain/useCases/CopyMonthUseCase"
import DeleteMothUseCase from "../../../domain/useCases/DeleteMonthUseCase"
import PasteMonthUseCase, { PasteType } from "../../../domain/useCases/pasteMonthUseCase"
import ReadSavedDateUseCase from "../../../domain/useCases/ReadSavedDateUseCase"
import UpdateSavedDateUseCase from "../../../domain/useCases/UpdateSavedDateUseCase"
import { HomeGroupScreenProps } from "../../../navigation/NavigationParamList"
import { ScreenRoutes } from "../../../navigation/Routes"
import DateTime from "../../../utils/DateTime"
import { currencyFormat } from "../../../utils/NumberFormat"
import useModalViewModel from "../../components/modal/ModalViewModel"
import useToastViewModel from "../../components/toast/ToastViewModel"
import { IIncomeRepository } from "../../../data/repository/incomeRepository/IIncomeRepository"

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
    incomeRepository: IIncomeRepository,
    expenseRepository: IExpenseRespository,
    budgetRepository: IBudgetRepository,
    categoryRepository: ICategoryRepository,

    // unitOfWork
    budgetExpenseUnitOfWork: BudgetExpenseUnitOfWork,


    // use cases
    // copyMonthUseCase: CopyMonthUseCase,
    // pasteMonthUseCase: PasteMonthUseCase,
    // deleteMonthUseCase: DeleteMothUseCase,

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
    incomeRepository,
    expenseRepository,
    budgetRepository,

    categoryRepository,

    // unitOfWork
    budgetExpenseUnitOfWork,

    // use cases
    // copyMonthUseCase,
    // pasteMonthUseCase,
    // deleteMonthUseCase,

    readSavedDateUseCase,
    updateSavedDateUseCase

}: HomeViewModelProps) => {




    // ------------------ context ------------------ //
    const userApp = useAppSelector(selectUserApp)

    const {
        groupId,
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
            getIncomes({ groupId, ...dateInterval }),
            getExpenses({ groupId, ...dateInterval }),
            getBudgets({ groupId, ...dateInterval }),
            getCategories()
        ])

        const totalIncomes = calculateTotalAmount(incomes)
        const totalExpenses = calculateTotalExpenses(expenses)

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
        const incomes = await incomeRepository.getAllByGroup(queryGroupParams)
        appDispatch(updateIncomes(incomes))
        return incomes
    }

    const getExpenses = async (queryGroupParams: QueryGroupParams) => {
        const expenses = await expenseRepository.getAllByGroup(queryGroupParams)
        appDispatch(updateExpenses(expenses))
        return expenses
    }

    const getBudgets = async (queryGroupParams: QueryGroupParams) => {
        const budgestWithRemaining = await budgetExpenseUnitOfWork.getBudgetsWithRemaingByGroup(queryGroupParams)
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
    const navigateToIncomes = () => {
        navigation.navigate(ScreenRoutes.INCOMES, {})
    }

    const navigateToExpenses = () => {
        navigation.navigate(ScreenRoutes.BUDGET_EXPENSES, {})
    }

    const navigateToStatistics = () => {
        navigation.navigate(ScreenRoutes.STATISTICS)
    }

    const navigateToProfile = () => {
        navigation.navigate(ScreenRoutes.PROFILE)
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
    // const onCopyMonth = async () => {

    //     showLoading()

    //     const { isValid, message } = await copyMonthUseCase.execute({
    //         userId: userApp.userId,
    //         ...operationDate
    //     })


    //     hideLoading()

    //     if (!isValid) {
    //         clearCopiedMonth()
    //         showModal("Error", message, [
    //             {
    //                 text: "Aceptar",
    //                 onPress: hideModal
    //             }
    //         ])

    //     } else {
    //         setCopiedMonth(operationDate)
    //         showToast("Se ha copiado el mes", "success")
    //     }

    // }

    // const clearCopiedMonth = () => {
    //     setCopiedMonth({
    //         initialDate: "",
    //         finalDate: "",
    //     })
    // }

    // /** shows a modal to confirm the paste month */
    // const onPasteMonth = () => {

    //     showModal(
    //         "Pegar mes",
    //         "Está a punto de pegar toda la información de un mes a otro. ¿Está seguro que desea continuar?",
    //         [
    //             {
    //                 text: "Aceptar",
    //                 onPress: () => {
    //                     validatePasteAction()
    //                     hideModal()
    //                 }
    //             },
    //             {
    //                 text: "Cancelar",
    //                 onPress: hideModal,
    //                 style: { ...DefaultStyles.highlightedText }
    //             },
    //         ]
    //     )

    // }

    // /**
    //  * Usually we validate all the data in use case, but in this case we need to show a modal
    //  * and options to the user, so we need to validate here
    //  **/
    // const validatePasteAction = async () => {

    //     let message = ""
    //     let buttonList: ModalButtonList[] = []

    //     showLoading()

    //     const [
    //         dateValidation, // a negative outcome may render the operation invalid,
    //         isThereDataValidation, // validate if there is data where we want to paste
    //     ] = await Promise.all([
    //         pasteMonthUseCase.applyValidations(operationDate, copiedMonth),
    //         pasteMonthUseCase.isThereData({
    //             userId: userApp.userId,
    //             ...operationDate
    //         }),
    //     ])

    //     hideLoading()


    //     if (!dateValidation.isValid) {

    //         message = dateValidation.message

    //         buttonList = [
    //             {
    //                 text: "Aceptar",
    //                 onPress: hideModal
    //             }
    //         ]

    //         showModal("Error", message, buttonList)

    //     } else if (!isThereDataValidation.isValid) {

    //         message = isThereDataValidation.message
    //         buttonList = [
    //             {
    //                 text: "Reemplazar",
    //                 onPress: () => pasteMonth("overwrite"),
    //                 style: { fontSize: FontSize.XSMALL }
    //             },
    //             {
    //                 text: "Combinar",
    //                 onPress: () => pasteMonth("combine"),
    //                 style: { fontSize: FontSize.XSMALL }
    //             },
    //             {
    //                 text: "Cancelar",
    //                 onPress: hideModal,
    //                 style: {
    //                     fontSize: FontSize.XSMALL,
    //                     ...DefaultStyles.highlightedText
    //                 }
    //             },
    //         ]

    //         showModal("Error", message, buttonList)

    //     } else pasteMonth("overwrite")

    // }

    // const pasteMonth = async (pasteType: PasteType) => {

    //     hideModal()
    //     showLoading()

    //     const { isValid, message } = await pasteMonthUseCase.execute(
    //         userApp.userId,
    //         operationDate,
    //         copiedMonth,
    //         pasteType
    //     )

    //     hideLoading()

    //     if (isValid) {
    //         showToast("Se ha pegado el mes", "success")

    //     } else {
    //         showModal("Error", message, [
    //             {
    //                 text: "Aceptar",
    //                 onPress: hideModal
    //             }
    //         ])
    //     }


    //     clearCopiedMonth()

    // }

    // /* Each time we delete a month, we ask the user to confirm the action */
    // const onDeleteMonth = () => {

    //     showModal(
    //         "Eliminar mes",
    //         "Está a punto de eliminar toda la información de un mes. ¿Está seguro que desea continuar?",
    //         [
    //             {
    //                 text: "Aceptar",
    //                 onPress: deleteMonth
    //             },
    //             {
    //                 text: "Cancelar",
    //                 onPress: hideModal,
    //                 style: { ...DefaultStyles.highlightedText }
    //             },
    //         ]
    //     )

    // }

    // const deleteMonth = async () => {

    //     hideModal()
    //     showLoading()

    //     // 1- delete all data from the month
    //     const { isValid, message } = await deleteMonthUseCase.execute({
    //         userId: userApp.userId,
    //         ...operationDate
    //     })

    //     // 2- fetch data again
    //     await getData(operationDate)

    //     hideLoading()

    //     if (isValid) {
    //         showToast("Se ha eliminado el mes", "success")

    //     } else {
    //         showModal("Error", message, [
    //             {
    //                 text: "Aceptar",
    //                 onPress: hideModal
    //             }
    //         ])
    //     }

    // }






    // ------------------ loading ------------------ //
    const showLoading = () => setLoading(true)

    const hideLoading = () => setLoading(false)



    // ------------------ share group ------------------ //
    const shareGroup = () => {

        try {

            Share.share({
                title: "Únete a mi grupo de finanzas",
                message: groupId,
                url: groupId
            });

        } catch (error) {
            console.log("error", error);

        }


    }





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
        // onCopyMonth,
        // onPasteMonth,
        // onDeleteMonth,

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

        // share group
        shareGroup
    }

}

export default useHomeGroupViewModel