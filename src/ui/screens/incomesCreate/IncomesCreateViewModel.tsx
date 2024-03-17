import { useEffect, useState } from "react";
import { IncomesCreateScreenProps } from "../../../navigation/NavigationParamList";
import { ScreenRoutes } from "../../../navigation/Routes";
import { currencyFormat, numberFormat } from "../../../utils/Convert";
import { Message } from "../../../data/types/Message";
import { Income } from "../../../data/types/Income";
import { IncomeCreateUseCase } from "../../../domain/useCases/incomes/IncomeCreateUseCase";
import IncomeEditUseCase from "../../../domain/useCases/incomes/IncomeEditUsecase";
import { ValidationResult } from "../../../data/types/Validation";


type IIncomesCreateViewModel = {
    incomeCreateUseCase: IncomeCreateUseCase,
    incomeEditUseCase: IncomeEditUseCase
} & IncomesCreateScreenProps


const useIncomeCreateViewModel = ({
    navigation,
    route,
    incomeCreateUseCase,
    incomeEditUseCase,
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

    // TODO: update the name of the method
    const createIncome = async () => {

        try {

            let response;

            // 1. If is an edition
            if (income?.id) {

                response = await incomeEditUseCase.edit({
                    id: income.id,
                    name: incomeName,
                    amount: numberFormat(incomeAmount)
                })

                // 2. if is a new income
            } else {

                response = await incomeCreateUseCase.create({
                    name: incomeName,
                    amount: numberFormat(incomeAmount)
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

        createIncome,
        hideModalAlert
    }


}

export default useIncomeCreateViewModel;