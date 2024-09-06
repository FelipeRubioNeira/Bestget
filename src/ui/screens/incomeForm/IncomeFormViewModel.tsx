import { useEffect, useState } from "react";
import { IncomesCreateScreenProps } from "../../../navigation/NavigationParamList";
import { ScreenRoutes } from "../../../navigation/Routes";
import { currencyFormat, numberFormat } from "../../../utils/NumberFormat";
import { Message } from "../../../data/types/Message";
import { Income, IncomeCreate } from "../../../data/types/Income";
import CreateIncomeUseCase from "../../../domain/useCases/CreateIncomeUseCase";
import editIncomeUseCase from "../../../domain/useCases/editIncomeUseCase";
import { ValidationResult } from "../../../data/types/Validation";
import DateTime from "../../../utils/DateTime";
import { useAppSelector } from "../../../data/globalContext/StoreHooks";
import { selectUserApp } from "../../../data/globalContext/redux/slices/UserAppSlice";
import { selectDateIntervalApp } from "../../../data/globalContext/redux/slices/DateIntervalAppSlice";
import { selectFinancesApp } from "../../../data/globalContext/slices/FinancesAppSlice";


const dateTime = new DateTime()


type IIncomesCreateViewModel = {
    createIncomeUseCase: CreateIncomeUseCase,
    editIncomeUseCase: editIncomeUseCase
} & IncomesCreateScreenProps


const useIncomeFormViewModel = ({
    navigation,
    route,
    createIncomeUseCase,
    editIncomeUseCase,
}: IIncomesCreateViewModel) => {



    // ------------------- context------------------- //
    const { userId } = useAppSelector(selectUserApp)
    const { groupId } = useAppSelector(selectFinancesApp)
    const dateInterval = useAppSelector(selectDateIntervalApp)



    // ------------------- route-params ------------------- //
    const { income } = route.params


    // ------------------- states ------------------- //
    const [incomeState, setIncomeState] = useState({
        incomeName: "",
        incomeAmount: "",
        incomeDate: dateTime.mergeDate(dateTime.date, dateInterval.initialDate)
    })

    const [modalState, setModalState] = useState({
        visible: false,
        title: "",
        message: "",
    })


    // ------------------- effects ------------------- //
    // 1. if we have an income, we set the values
    useEffect(() => {
        if (income) updateForm(income)
    }, [income])


    // ------------------- state update methods ------------------- //
    const updateForm = ({ name, amount, date }: Income) => {
        setIncomeState({
            ...incomeState,
            incomeName: name,
            incomeAmount: currencyFormat(amount),
            incomeDate: dateTime.convertToNormalDate(date)
        })
    }

    const updateIncomeName = (newIncomeName: string) => {
        setIncomeState({
            ...incomeState,
            incomeName: newIncomeName
        })
    }

    const updateIncomeAmount = (newIncomeAmount: string) => {
        setIncomeState({
            ...incomeState,
            incomeAmount: newIncomeAmount
        })
    }

    const updateIncomeDate = (newIncomeDate: string) => {
        setIncomeState({
            ...incomeState,
            incomeDate: newIncomeDate
        })
    }

    const generatetDateTime = () => {
        const currentTime = dateTime.getTime()
        const currentDate = dateTime.convertToAmericanDate(incomeState.incomeDate)
        const isoDateTime = `${currentDate}T${currentTime}`

        return isoDateTime
    }

    // ------------------- save income ------------------- //
    const saveIncome = async () => {

        // get the current date
        const generatedDate = generatetDateTime()


        let response: ValidationResult<Income> = {
            isValid: false,
            message: "",
            result: null
        }

        // ------------------- create new income ------------------- //
        const newIncome: IncomeCreate = {
            userId: userId,
            name: incomeState.incomeName,
            amount: numberFormat(incomeState.incomeAmount),
            date: generatedDate
        }


        try {


            // 1. If is an edition
            if (income?.incomeId) {
                response = await editIncomeUseCase.execute({ ...newIncome, incomeId: income.incomeId })

                // 2. if is a new income
            } else {
                response = await createIncomeUseCase.execute(newIncome)
            }


            if (response?.isValid) {
                navigation.navigate(ScreenRoutes.INCOMES, {
                    incomeId: response?.result?.incomeId || ""
                })

            } else showModalAlert({
                title: "Error al guardar el ingreso",
                message: response.message
            })


        } catch (error) {
            console.error("error al guardar el nuevo ingreso", error)
        }

    }


    // ------------------- modal alert ------------------- //
    const showModalAlert = (message: Message = { message: "", title: "" }) => {
        setModalState({
            visible: true,
            title: message.title,
            message: message.message
        })
    }

    const hideModalAlert = () => {
        setModalState({
            ...modalState,
            visible: false,
        })

    }



    // ------------------- return ------------------- //
    return {
        modalState,

        incomeName: incomeState.incomeName,
        incomeAmount: incomeState.incomeAmount,
        incomeDate: incomeState.incomeDate,
        updateIncomeAmount,
        updateIncomeName,
        updateIncomeDate,

        saveIncome,
        hideModalAlert,
    }


}

export default useIncomeFormViewModel;