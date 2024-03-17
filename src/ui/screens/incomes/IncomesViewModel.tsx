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
import { ModalProps } from "../../components/modal/Modal"
import TouchableIcon from "../../components/touchableIcon/TouchableIcon"

const editIcon = require("../../../assets/icons/ic_edit.png")


type IIncomesViewModel = {
    incomesRepository: IIncomeRepository,
} & IncomesScreenProps



const useIncomesViewModel = ({
    navigation,
    route,
    incomesRepository,
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
    const [deleteMode, setDeleteMode] = useState<boolean>(false)

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
        generateIncomeList(incomes)
    }, [])


    // 2. if a new income is created, we update the list
    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {

            getIncomes().then(incomes => {
                setIncomeParams(incomes)
                generateIncomeList(incomes)
            })
            
        });

        return unsubscribe;

    }, [newIncomeId])


    // we add the delete button to the header if there are incomes
    useEffect(() => {

        navigation.setOptions({
            headerRight: () => {
                if (incomeParams.length === 0) return null
                return (
                    <TouchableIcon
                        image={editIcon}
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

    const generateIncomeList = async (incomes: Income[] = []) => {

        try {

            if (incomes.length == 0) {
                setTotalAmount("0")
                setAllIncomes([])
                return
            }

            const allIncomesFormatted = applyFormat(incomes)
            const totalAmount = getTotalAmount(incomes)

            setAllIncomes(allIncomesFormatted)
            setTotalAmount(totalAmount)

        } catch (error) {
            console.error("error al obtener todos los ingresos", error)
        }
    }

    const applyFormat = (incomes: Income[]): IncomeUI[] => {

        const incomesFormatted = incomes.map(income => {

            const incomeFormatted: IncomeUI = {
                id: income.id,
                name: income.name,
                amount: "$" + currencyFormat(income.amount),
            }

            return incomeFormatted
        })

        return incomesFormatted

    }

    const getTotalAmount = (incomes: Income[]): string => {

        let total = 0

        incomes.forEach(income => {
            total += income.amount
        })

        const totalCurrency = currencyFormat(total)


        return totalCurrency

    }

    const navigateIncomeCreate = () => {
        turnOffDeleteMode()
        navigation.navigate(ScreenRoutes.INCOMES_CREATE, { income: undefined })
    }


    // ------------------- delete events------------------- //
    const onPressDeleteHeaderIcon = () => {

        if (!deleteMode) {
            turnOnDeleteMode()

        } else {
            turnOffDeleteMode()
        }

    }

    const turnOnDeleteMode = () => {
        setDeleteMode(true)
    }

    const turnOffDeleteMode = () => {
        setDeleteMode(false)
    }

    const deleteIncome = async () => {

        hideAlert()

        await incomesRepository.delete(deleteIncomeId)

        const newIncomesList = await getIncomes()

        setIncomeParams(newIncomesList)
        generateIncomeList(newIncomesList)

    }

    // ------------------- edit event ------------------- //
    const onPressEditIncomeItem = (id: string) => {
        turnOffDeleteMode()
        const income = incomeParams.find(income => income.id === id)
        navigation.navigate(ScreenRoutes.INCOMES_CREATE, { income })
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




    return {
        deleteMode,
        modalState,
        totalAmount,
        allIncomes,

        navigateIncomeCreate,
        deleteIncome,
        onPressDeleteIncomeItem,
        onPressEditIncomeItem,
        hideAlert
    }
}

export default useIncomesViewModel