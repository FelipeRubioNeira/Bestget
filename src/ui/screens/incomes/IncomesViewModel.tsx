import { useEffect, useState } from "react"
import { IncomesScreenProps } from "../../../navigation/NavigationParamList"
import { ScreenRoutes } from "../../../navigation/Routes"
import { GetAllIncomesUseCase } from "../../../domain/useCases/GetAllIncomesUseCase"
import { Income } from "../../../data/types/Income"
import { currencyFormat } from "../../../utils/Convert"
import { IIncomeRepository } from "../../../data/repository/incomeRepository/IIncomeRepository"
import IBudgetExpenseRepository from "../../../data/repository/budgetExpenseRepository/IBugetExpenseRepository"

type IIncomesViewModel = {
    incomesRepository: IIncomeRepository,
} & IncomesScreenProps

export type IncomeFormatted = {
    id: string | null,
    name: string,
    amount: string
}



const useIncomesViewModel = ({ navigation, route, incomesRepository }: IIncomesViewModel) => {


    // ------------------- states ------------------- //
    const [allIncomes, setAllIncomes] = useState<IncomeFormatted[]>([])
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
        allIncomes,
        navigateIncomeCreate
    }
}

export default useIncomesViewModel