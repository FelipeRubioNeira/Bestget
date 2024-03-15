import { useState } from "react";
import { IncomesCreateScreenProps } from "../../../navigation/NavigationParamList";
import { ScreenRoutes } from "../../../navigation/Routes";
import { CreateIncomeUseCase } from "../../../domain/useCases/CreateIncomeUseCase";
import { numberFormat } from "../../../utils/Convert";
import { Message } from "../../../data/types/Message";


type IIncomesCreateViewModel = {
    createIncomeUseCase: CreateIncomeUseCase,
} & IncomesCreateScreenProps


const useIncomeCreateViewModel = ({
    navigation,
    createIncomeUseCase
}: IIncomesCreateViewModel) => {


    // ------------------- states ------------------- //
    const [incomeName, setIncomeName] = useState<string>("")
    const [incomeAmount, setIncomeAmount] = useState<string>("")
    const [modalState, setModalState] = useState({
        visible: false,
        title: "",
        message: "",
    })


    // ------------------- methods ------------------- //

    const updateIncomeName = (newIncomeName: string) => {
        setIncomeName(newIncomeName)
    }

    const updateIncomeAmount = (newIncomeAmount: string) => {
        setIncomeAmount(newIncomeAmount)
    }

    const createIncome = async () => {

        try {


            // 1. we pass the values and the use case will take care of the rest
            const response = await createIncomeUseCase.create({
                name: incomeName,
                amount: numberFormat(incomeAmount)
            })


            if (response.isValid) {
                navigation.navigate(ScreenRoutes.INCOMES, {
                    newIncomeId: response.result,
                })

            } else showModalAlert(response.message)


        } catch (error) {
            console.error("error al guardar el nuevo ingreso", error)
        }

    }

    const showModalAlert = (message: Message) => {
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