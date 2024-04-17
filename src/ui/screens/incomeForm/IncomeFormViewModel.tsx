import { useEffect, useState } from "react";
import { IncomesCreateScreenProps } from "../../../navigation/NavigationParamList";
import { ScreenRoutes } from "../../../navigation/Routes";
import { currencyFormat, numberFormat } from "../../../utils/NumberFormat";
import { Message } from "../../../data/types/Message";
import { Income } from "../../../data/types/Income";
import CreateIncomeUseCase from "../../../domain/useCases/CreateIncomeUseCase";
import editIncomeUseCase from "../../../domain/useCases/editIncomeUseCase";
import { getCurrentDate } from "../../../utils/DateTime";
import { ValidationResult } from "../../../data/types/Validation";


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


    // ------------------- route-params ------------------- //
    const { income } = route.params


    // ------------------- states ------------------- //
    const [incomeName, setIncomeName] = useState<string>("")
    const [incomeAmount, setIncomeAmount] = useState<string>("")
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
    const updateForm = ({ name = "", amount = 0 }: Income) => {
        setIncomeName(name)
        setIncomeAmount(currencyFormat(amount))
    }

    const updateIncomeName = (newIncomeName: string) => {
        setIncomeName(newIncomeName)
    }

    const updateIncomeAmount = (newIncomeAmount: string) => {
        setIncomeAmount(newIncomeAmount)
    }

    const saveIncome = async () => {

        try {


            let response: ValidationResult<string> = {
                isValid: false, result: "", message: {
                    message: "",
                    title: ""
                }
            }


            // 1. If is an edition
            if (income?.id) {

                response = await editIncomeUseCase.edit({
                    id: income.id,
                    name: incomeName,
                    amount: numberFormat(incomeAmount),
                    date: getCurrentDate()
                })

                // 2. if is a new income
            } else {

                response = await createIncomeUseCase.create({
                    name: incomeName,
                    amount: numberFormat(incomeAmount),
                    date: getCurrentDate()
                })

            }


            if (response?.isValid) {
                navigation.navigate(ScreenRoutes.INCOMES, {
                    newIncomeId: response.result,
                })

            } else showModalAlert(response?.message)


        } catch (error) {
            console.error("error al guardar el nuevo ingreso", error)
        }

    }

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
        incomeName, updateIncomeName,
        incomeAmount, updateIncomeAmount,

        saveIncome,
        hideModalAlert
    }


}

export default useIncomeFormViewModel;