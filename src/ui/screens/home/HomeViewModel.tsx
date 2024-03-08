import { useEffect, useState } from "react"
import { HomeScreenProps } from "../../navigation/NavigationParamList"
import { ScreenRoutes } from "../../navigation/Routes"
import { GetTotalIncomesUseCase } from "../../../domain/useCases/GetTotalIncomesUseCase"
import { currencyFormat } from "../../../utils/Convert"



// ------------------ interfaces ------------------ //
export interface IMenuArrayButtonsProps {
    movementsOnPress: () => void
    incomesOnPress: () => void
}

type HomeViewModelProps = {
    getTotalIncomesUseCase: GetTotalIncomesUseCase
} & HomeScreenProps



const useHomeViewModel = ({ navigation, getTotalIncomesUseCase }: HomeViewModelProps) => {


    // ------------------ states ------------------ //
    const [totalIncomes, setTotalIncomes] = useState("0")


    // ------------------ effects ------------------ //
    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            getTotalIncomes()
        })

        return unsubscribe;

    }, [navigation])


    // ------------------ methods ------------------ //
    const getTotalIncomes = async () => {

        const totalIncomes = await getTotalIncomesUseCase.getTotal()
        const totalIncomesFormatted = currencyFormat(totalIncomes)
        setTotalIncomes(totalIncomesFormatted)
    }

    const movementsOnPress = () => {
        navigation.navigate(ScreenRoutes.MOVEMENTS)
    }

    const incomesOnPress = () => {
        navigation.navigate(ScreenRoutes.INCOMES, {})
    }


    // ------------------ return ------------------ //
    return {
        totalIncomes,
        movementsOnPress,
        incomesOnPress
    }

}

export default useHomeViewModel