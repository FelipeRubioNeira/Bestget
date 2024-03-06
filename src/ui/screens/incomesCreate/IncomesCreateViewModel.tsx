import { useState } from "react";
import { IncomesCreateScreenProps } from "../../navigation/NavigationTypes";
import { ScreensRoutes } from "../../navigation/Routes";
import { CreateIncomeUseCase } from "../../../domain/useCases/CreateIncomeUseCase";
import { Income } from "../../../data/models/Income";

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

            const newIncome = new Income(
                null,
                incomeName,
                parseInt(incomeAmount)
            )

            const newIncomeId = await createIncomeUseCase.create(newIncome)

            navigation.navigate(ScreensRoutes.INCOMES,{
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