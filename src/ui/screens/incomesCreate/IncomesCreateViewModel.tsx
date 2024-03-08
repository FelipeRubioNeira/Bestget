import { useState } from "react";
import { IncomesCreateScreenProps } from "../../navigation/NavigationParamList";
import { ScreenRoutes } from "../../navigation/Routes";
import { CreateIncomeUseCase } from "../../../domain/useCases/CreateIncomeUseCase";
import { Income } from "../../../data/models/Income";
import { plainFormat } from "../../../utils/Convert";

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
            const newIncomeId = await createIncomeUseCase.create(
                incomeName,
                incomeAmount,
            )

            // 2. finally we navigate to the incomes screen
            navigation.navigate(ScreenRoutes.INCOMES, {
                newIncomeId: newIncomeId
            })

        } catch (error) {
            console.error("error al guardar el nuevo ingreso", error)
        }

    }



    // ------------------- return ------------------- //
    return {

        incomeName, updateIncomeName,
        incomeAmount, updateIncomeAmount,

        createIncome
    }


}

export default useIncomeCreateViewModel;