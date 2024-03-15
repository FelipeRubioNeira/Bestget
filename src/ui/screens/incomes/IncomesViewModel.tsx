/* 
    If we enter for the first time or we go back from the create income screen, 
    we will receive the incomes list, from route params or incomes repository. 

    Home -> Incomes: We receive the incomes list ready. 
    Incomes Create -> Incomes: We receive the incomes list from the repository. 

    Also, we pass the "delete mode" to each income item, to show or hide the delete button. 
    If the user presses the delete button (top right), we will show the delete button in each 
    income item by rendering the list again with the new delete mode state. 

    In IncomeScreen each income item has the "onPress" method to delete the income.
    calling the "onDeleteIncome" method from this view model.
*/


import { useEffect, useState } from "react"
import { IncomesScreenProps } from "../../../navigation/NavigationParamList"
import { ScreenRoutes } from "../../../navigation/Routes"
import { Income, IncomeUI } from "../../../data/types/Income"
import { currencyFormat } from "../../../utils/Convert"
import { IIncomeRepository } from "../../../data/repository/incomeRepository/IIncomeRepository"
import { Colors } from "../../constants/Colors"
import DeleteButton, { DeleteButtonProps } from "../../components/deleteButton/DeleteButton"
import DeleteIncomeUseCase from "../../../domain/useCases/DeleteIncomeUseCase"
import { ModalProps } from "../../components/modal/Modal"


type IIncomesViewModel = {
    incomesRepository: IIncomeRepository,
    deleteIncomeUseCase: DeleteIncomeUseCase,
} & IncomesScreenProps



const useIncomesViewModel = ({
    navigation,
    route,
    incomesRepository,
    deleteIncomeUseCase
}: IIncomesViewModel) => {


    // ------------------- route ------------------- //
    const {
        incomes = [],
        newIncomeId = 0
    } = route.params


    // ------------------- states ------------------- //
    const [incomeParams, setIncomeParams] = useState<Income[]>([])
    const [allIncomes, setAllIncomes] = useState<IncomeUI[]>([])

    const [totalAmount, setTotalAmount] = useState<string>("0")
    const [deleteMode, setDeleteMode] = useState<DeleteButtonProps>({
        status: false,
        color: Colors.BLACK
    })

    const [modalState, setModalState] = useState<ModalProps>({
        visible: false,
        title: "",
        message: "",
    })

    const [deleteIncomeId, setDeleteIncomeId] = useState<string>("")


    // ------------------- effects ------------------- //

    // 1. generate the list of incomes
    useEffect(() => {
        setIncomeParams(incomes)
        generateIncomeList(incomes, deleteMode)
    }, [])


    // 2. if a new income is created, we update the list
    useEffect(() => {
        if (!newIncomeId) return

        getIncomes().then(incomes => {
            setIncomeParams(incomes)
            generateIncomeList(incomes, deleteMode)
        })

    }, [newIncomeId])


    // we add the delete button to the header if there are incomes
    useEffect(() => {

        navigation.setOptions({
            headerRight: () => {
                if (incomeParams.length === 0) return null
                return (
                    <DeleteButton
                        color={deleteMode.color}
                        onPress={onPressDeleteHeaderIcon}
                    />
                )
            }
        })

    }, [deleteMode, incomeParams])



    // ------------------- methods ------------------- //
    const getIncomes = async (): Promise<Income[]> => {
        return incomesRepository.getAll()
    }

    const generateIncomeList = async (incomes: Income[] = [], deleteButtonProps: DeleteButtonProps) => {

        try {

            if (incomes.length == 0) {
                setTotalAmount("0")
                setAllIncomes([])
                return
            }

            const allIncomesFormatted = applyFormat(incomes, deleteButtonProps)
            const totalAmount = getTotalAmount(incomes)

            setAllIncomes(allIncomesFormatted)
            setTotalAmount(totalAmount)

        } catch (error) {
            console.error("error al obtener todos los ingresos", error)
        }
    }

    const getTotalAmount = (incomes: Income[]): string => {

        let total = 0

        incomes.forEach(income => {
            total += income.amount
        })

        const totalCurrency = currencyFormat(total)


        return totalCurrency

    }

    const applyFormat = (incomes: Income[], deleteButtonProps: DeleteButtonProps): IncomeUI[] => {

        const incomesFormatted = incomes.map(income => {

            const incomeFormatted: IncomeUI = {
                id: income.id,
                name: income.name,
                amount: "$" + currencyFormat(income.amount),
                deleteButtonProps: deleteButtonProps
            }

            return incomeFormatted
        })

        return incomesFormatted

    }

    const navigateIncomeCreate = () => {
        turnOffDeleteMode()
        navigation.navigate(ScreenRoutes.INCOMES_CREATE)
    }

    // ------------------- delete events------------------- //
    const onPressDeleteHeaderIcon = () => {

        if (!deleteMode.status) {
            turnOnDeleteMode()

        } else {
            turnOffDeleteMode()
        }

    }

    const turnOnDeleteMode = () => {

        const newDeleteMode: DeleteButtonProps = {
            status: true,
            color: Colors.CHIP_DEBTS
        }

        setDeleteMode(newDeleteMode)
        generateIncomeList(incomeParams, newDeleteMode)

    }

    const turnOffDeleteMode = () => {

        const newDeleteMode: DeleteButtonProps = {
            status: false,
            color: Colors.BLACK
        }

        setDeleteMode(newDeleteMode)
        generateIncomeList(incomeParams, newDeleteMode)
    }

    // onPress on flatlist item
    const onPressDeleteIncomeItem = (id: string) => {
        setDeleteIncomeId(id)
        showAlert()
    }

    const showAlert = () => {
        setModalState({
            visible: true,
            title: "Eliminar ingreso",
            message: "¿Estás seguro que deseas eliminar este ingreso?",
        })
    }

    const hideAlert = () => {
        setModalState({
            ...modalState,
            visible: false,
        })
    }

    const deleteIncome = async () => {

        hideAlert()

        await deleteIncomeUseCase.delete(deleteIncomeId)

        const newIncomesList = await getIncomes()

        setIncomeParams(newIncomesList)
        generateIncomeList(newIncomesList, deleteMode)

    }


    return {
        deleteMode,
        modalState,
        totalAmount,
        allIncomes,

        navigateIncomeCreate,
        deleteIncome,
        onPressDeleteIncomeItem,
        hideAlert
    }
}

export default useIncomesViewModel