import { ChooseFinancesScreenProps } from "../../../navigation/NavigationParamList"
import { ScreenRoutes } from "../../../navigation/Routes"

const useChooseFinancesViewModel = ({ navigation }: ChooseFinancesScreenProps) => {


    // ---------------- methods ---------------- //
    const navigateToPersonalFinances = () => {
        navigation.navigate(ScreenRoutes.HOME)
    }

    const navigateToGroups = () => { 
        navigation.navigate(ScreenRoutes.GROUPS)
    }

    return {
        navigateToPersonalFinances,
        navigateToGroups
    }

}

export default useChooseFinancesViewModel