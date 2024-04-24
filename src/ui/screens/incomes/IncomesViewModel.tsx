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

import React from "react"
import { useEffect, useState } from "react"
import { IncomesScreenProps } from "../../../navigation/NavigationParamList"
import { ScreenRoutes } from "../../../navigation/Routes"
import { Income, IncomeUI } from "../../../data/types/Income"
import { currencyFormat } from "../../../utils/NumberFormat"
import { IIncomeRepository } from "../../../data/repository/incomeRepository/IIncomeRepository"
import { ButtonModal, ModalProps } from "../../components/modal/Modal"
import TouchableIcon from "../../components/touchableIcon/TouchableIcon"
import DeleteIncomeUseCase from "../../../domain/useCases/DeleteIncomeUseCase"
import { Colors } from "../../constants/Colors"
import { FontFamily } from "../../constants/Fonts"
import { DateInterval } from "../../../data/types/DateInterval"
import Icons from "../../../assets/icons"
import { useGlobalContext } from "../../../data/globalContext/GlobalContext"



type IIncomesViewModel = {
    incomesRepository: IIncomeRepository,
    deleteIncomeUseCase: DeleteIncomeUseCase
} & IncomesScreenProps



const useIncomesViewModel = ({
    navigation,
    route,
    incomesRepository,
    deleteIncomeUseCase
}: IIncomesViewModel) => {


    // ------------------- context ------------------- //
    const {
        dateInterval,
        incomesContext,
        updateIncomesContext,
    } = useGlobalContext()


    // ------------------- route ------------------- //
    const { incomeId } = route.params




    // ------------------- states ------------------- //
    const [allIncomes, setAllIncomes] = useState<IncomeUI[]>()

    const [totalAmount, setTotalAmount] = useState<string>("0")
    const [editMode, setEditMode] = useState<boolean>(false)

    const [modalState, setModalState] = useState<ModalProps>({
        visible: false,
        title: "",
        message: "",
        buttonList: []
    })



    // ------------------- effects ------------------- //
    // we add the delete button to the header if there are incomes
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                if (incomesContext.length === 0) return null
                return (
                    <TouchableIcon
                        image={Icons.edit}
                        onPress={onPressDeleteHeaderIcon}
                    />
                )
            }
        })

    }, [editMode, incomesContext])


    // if we have a new income or changes in one, we regenerate the list
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (!incomeId) return
            getIncomesFromRepository(dateInterval)
                .then(initializeIncomeData)
        })

        return unsubscribe

    }, [navigation, incomeId])



    // generate the list of incomes if we sence a change in the incomes context length
    useEffect(() => {
        initializeIncomeData(incomesContext)
    }, [incomesContext.length])





    // ------------------- methods ------------------- //
    const getIncomesFromRepository = async (dateInterval: DateInterval): Promise<Income[]> => {
        return incomesRepository.getAll(dateInterval)
    }

    const initializeIncomeData = (incomes: Income[]) => {
        updateIncomesContext(incomes)
        generateIncomeList(incomes)
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
        navigation.navigate(ScreenRoutes.INCOME_FORM, {})
    }


    // ------------------- delete events------------------- //
    const onPressDeleteHeaderIcon = () => {

        if (!editMode) {
            turnOnDeleteMode()

        } else {
            turnOffDeleteMode()
        }

    }

    const turnOnDeleteMode = () => {
        setEditMode(true)
    }

    const turnOffDeleteMode = () => {
        setEditMode(false)
    }



    // ------------------- edit event ------------------- //
    const onPressEdit = (incomeId: string) => {

        turnOffDeleteMode()

        const income = incomesContext.find(income => income.id === incomeId)

        navigation.navigate(ScreenRoutes.INCOME_FORM, {
            income,
        })

    }

    // onPress on flatlist item
    const onPressDelete = (incomeId: string) => {

        showAlert(
            "Eliminar ingreso",
            "¿Estás seguro que deseas eliminar este ingreso?",
            [
                {
                    text: 'Aceptar',
                    onPress: () => deleteIncome(incomeId),
                },
                {
                    text: 'Cancelar',
                    onPress: hideAlert,
                    style: { color: Colors.BLUE, fontFamily: FontFamily.BOLD }
                }
            ]
        )
    }

    const showAlert = (title: string, message: string, buttonList: ButtonModal[]) => {

        setModalState({
            visible: true,
            title: title,
            message: message,
            buttonList: buttonList
        })
    }

    const hideAlert = () => {
        setModalState({
            ...modalState,
            visible: false,
        })
    }


    // ------------------- use Case ------------------- //
    const deleteIncome = async (incomeId: string) => {

        hideAlert()

        const response = await deleteIncomeUseCase.delete(incomeId)

        if (response.isValid) {

            const newIncomesList = await getIncomesFromRepository(dateInterval)

            updateIncomesContext(newIncomesList)
            generateIncomeList(newIncomesList)

        } else {
            showAlert(
                response.message.title,
                response.message.message, [{ text: 'Aceptar', onPress: hideAlert }]
            )
        }



    }



    return {
        editMode,
        modalState,
        totalAmount,
        allIncomes,

        navigateIncomeCreate,
        deleteIncome,
        onPressDelete,
        onPressEdit,
        hideAlert
    }
}

export default useIncomesViewModel