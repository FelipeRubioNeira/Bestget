import { ScreensRoutes } from "../../navigation/Index"
import { HomeScreenProps } from "../../navigation/Index"



// ------------------ interfaces ------------------ //
export interface IMenuArrayButtonsProps {
    movementsOnPress: () => void
    incomesOnPress: () => void
}



const useHomeViewModel = ({ navigation }: HomeScreenProps) => {

    const movementsOnPress = () => {
        navigation.navigate(ScreensRoutes.MOVEMENTS)
    }

    const incomesOnPress = () => {
        navigation.navigate(ScreensRoutes.INCOMES)
    }

    return {
        movementsOnPress,
        incomesOnPress
    }

}

export default useHomeViewModel