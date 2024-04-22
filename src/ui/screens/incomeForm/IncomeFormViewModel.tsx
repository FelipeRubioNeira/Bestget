import { useEffect, useState } from "react";
import { IncomesCreateScreenProps } from "../../../navigation/NavigationParamList";
import { ScreenRoutes } from "../../../navigation/Routes";
import { currencyFormat, numberFormat } from "../../../utils/NumberFormat";
import { Message } from "../../../data/types/Message";
import { Income } from "../../../data/types/Income";
import CreateIncomeUseCase from "../../../domain/useCases/CreateIncomeUseCase";
import editIncomeUseCase from "../../../domain/useCases/editIncomeUseCase";
import { ValidationResult } from "../../../data/types/Validation";
import DateTime from "../../../utils/DateTime";
import { useGlobalContext } from "../../../data/globalContext/GlobalContext";


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
    const { } = useGlobalContext()


    // ------------------- route-params ------------------- //
    const { income } = route.params


    // ------------------- states ------------------- //
    const [incomeState, setIncomeState] = useState({
        incomeName: "",
        incomeAmount: "",
        incomeDate: dateTime.convertToNormalDate(dateTime.date)
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


    // ------------------- methods ------------------- //
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

    const saveIncome = async () => {

        const currentTime = new DateTime().getTime()
        const currentDate = dateTime.convertToAmericanDate(incomeState.incomeDate)
        const isoDateTime = `${currentDate}T${currentTime}`

        try {

            let response: ValidationResult<string> = {
                isValid: false, result: "", message: {
                    message: "",
                    title: ""
                }
            }

            const newIncome = {
                name: incomeState.incomeName,
                amount: numberFormat(incomeState.incomeAmount),
                date: isoDateTime
            }


            // 1. If is an edition
            if (income?.id) {
                response = await editIncomeUseCase.edit({
                    id: income.id,
                    ...newIncome
                })

                // 2. if is a new income
            } else response = await createIncomeUseCase.create(newIncome)


            if (response?.isValid) {
                navigation.navigate(ScreenRoutes.INCOMES, {
                    incomeId: response.result,
                })

            } else showModalAlert(response?.message)


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