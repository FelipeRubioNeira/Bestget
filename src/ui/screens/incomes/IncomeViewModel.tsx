import { useEffect, useState } from "react"
import { IncomesScreenProps } from "../../navigation/NavigationTypes"
import { ScreensRoutes } from "../../navigation/Routes"
import { GetAllIncomesUseCase } from "../../../domain/useCases/GetAllIncomesUseCase"
import { Income } from "../../../data/models/Income"

type IIncomesViewModel = {
    getAllIncomesUseCase: GetAllIncomesUseCase
} & IncomesScreenProps


const useIncomeViewModel = ({
    navigation,
    route,
    getAllIncomesUseCase
}: IIncomesViewModel) => {


    // ------------------- states ------------------- //
    const [incomesList, setIncomesList] = useState<Income[]>([])


    // ------------------- effects ------------------- //
    useEffect(() => {
        getAllIncomes()
    }, [])


    useEffect(() => {

        if (route.params?.newIncomeId) {
            getAllIncomes()
        }

    }, [route.params?.newIncomeId])



    // ------------------- methods ------------------- //
    const getAllIncomes = async () => {

        try {
            const allIncomes = await getAllIncomesUseCase.getAll()
            setIncomesList(allIncomes)

        } catch (error) {
            console.error("error al obtener todos los ingresos", error)
        }

    }

    const navigateIncomeCreate = () => {
        navigation.navigate(ScreensRoutes.INCOMES_CREATE)
    }



    return {
        incomesList,

        navigateIncomeCreate
    }
}

export default useIncomeViewModel