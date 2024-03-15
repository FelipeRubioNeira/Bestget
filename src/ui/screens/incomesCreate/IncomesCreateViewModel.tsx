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

            if(response.isValid){
                navigation.navigate(ScreenRoutes.INCOMES, {
                    newIncomeId: response.result,
                })

            }else{
                showUserAlert(response.message)
            }
    

        } catch (error) {
            console.error("error al guardar el nuevo ingreso", error)
        }

    }

    const showUserAlert = (message: Message) => {

    }



    // ------------------- return ------------------- //
    return {

        incomeName, updateIncomeName,
        incomeAmount, updateIncomeAmount,

        createIncome
    }


}

export default useIncomeCreateViewModel;