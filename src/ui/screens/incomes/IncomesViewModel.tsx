import { useEffect, useState } from "react"
import { IncomesScreenProps } from "../../../navigation/NavigationParamList"
import { ScreenRoutes } from "../../../navigation/Routes"
import { Income, IncomeUI } from "../../../data/types/Income"
import { currencyFormat } from "../../../utils/Convert"
import { IIncomeRepository } from "../../../data/repository/incomeRepository/IIncomeRepository"


type IIncomesViewModel = {
    incomesRepository: IIncomeRepository,
} & IncomesScreenProps



const useIncomesViewModel = ({ navigation, route, incomesRepository }: IIncomesViewModel) => {


    // ------------------- states ------------------- //
    const [allIncomes, setAllIncomes] = useState<IncomeUI[]>([])
    const [totalAmount, setTotalAmount] = useState<string>("0")


    // ------------------- effects ------------------- //
    useEffect(() => {

        const allIncomes = route?.params?.incomes || []
        const allIncomesFormatted = applyFormat(allIncomes)
        const totalAmount = getTotalAmount(allIncomes)

        setAllIncomes(allIncomesFormatted)
        setTotalAmount(totalAmount)

    }, [])


    useEffect(() => {
        if (route.params?.newIncomeId) refreshNewIncome()
    }, [route.params?.newIncomeId])



    // ------------------- methods ------------------- //
    const refreshNewIncome = async () => {

        try {

            const allIncomes = await incomesRepository.getAll()
            const allIncomesFormatted = applyFormat(allIncomes)
            const totalAmount = getTotalAmount(allIncomes)

            setAllIncomes(allIncomesFormatted)
            setTotalAmount(totalAmount)

        } catch (error) {
            console.error("error al obtener todos los ingresos", error)
        }

    }

    const getTotalAmount = (incomes: Income[]): string => {

        let total = 0

        incomes.forEach(income => {
            total += income.amount
        })

        const totalCurrency = currencyFormat(total)


        return totalCurrency

    }

    const applyFormat = (incomes: Income[])=> {

        const incomesFormatted = incomes.map(income => {

            const incomeFormatted: IncomeUI = {
                id: income.id,
                name: income.name,
                amount: currencyFormat(income.amount),
                onPress: () => { },
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
        allIncomes,
        navigateIncomeCreate
    }
}

export default useIncomesViewModel