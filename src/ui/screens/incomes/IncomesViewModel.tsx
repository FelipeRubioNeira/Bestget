import { useEffect, useState } from "react"
import { IncomesScreenProps } from "../../navigation/NavigationParamList"
import { ScreenRoutes } from "../../navigation/Routes"
import { GetAllIncomesUseCase } from "../../../domain/useCases/GetAllIncomesUseCase"
import { Income } from "../../../data/types/Income"
import { currencyFormat } from "../../../utils/Convert"

type IIncomesViewModel = {
    getAllIncomesUseCase: GetAllIncomesUseCase
} & IncomesScreenProps

export type IncomeFormatted = {
    id: string | null,
    name: string,
    amount: string
}



const useIncomesViewModel = ({
    navigation,
    route,
    getAllIncomesUseCase
}: IIncomesViewModel) => {


    // ------------------- states ------------------- //
    const [incomesList, setIncomesList] = useState<IncomeFormatted[]>([])
    const [totalAmount, setTotalAmount] = useState<string>("0")


    // ------------------- effects ------------------- //
    useEffect(() => {
        getAllIncomes()
    }, [])


    useEffect(() => {
        if (route.params?.newIncomeId) getAllIncomes()
    }, [route.params?.newIncomeId])



    // ------------------- methods ------------------- //
    const getAllIncomes = async () => {

        try {

            const allIncomes = await getAllIncomesUseCase.getAll()
            const allIncomesFormatted = applyFormat(allIncomes)

            const totalAmount = getTotalAmount(allIncomes)
            const totalAmountFormatted = currencyFormat(totalAmount)

            setTotalAmount(totalAmountFormatted)
            setIncomesList(allIncomesFormatted)

        } catch (error) {
            console.error("error al obtener todos los ingresos", error)
        }

    }

    const getTotalAmount = (incomes: Income[]): number => {

        let total = 0

        incomes.forEach(income => {
            total += income.amount
        })


        return total

    }

    const applyFormat = (incomes: Income[]): IncomeFormatted[] => {

        const incomesFormatted = incomes.map(income => {

            const incomeFormatted: IncomeFormatted = {
                id: income.id + "",
                name: income.name,
                amount: currencyFormat(income.amount)
            }

            return incomeFormatted
        })

        return incomesFormatted

    }

    const navigateIncomeCreate = () => {
        navigation.navigate(ScreenRoutes.INCOMES_CREATE)
    }



    return {
        totalAmount,
        incomesList,
        navigateIncomeCreate
    }
}

export default useIncomesViewModel