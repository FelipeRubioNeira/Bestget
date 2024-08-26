import { ChooseFinancesScreenProps } from "../../../navigation/NavigationParamList"
import { ScreenRoutes } from "../../../navigation/Routes"


type NavigationFinancesViewModelProps = {

} & ChooseFinancesScreenProps

const useChooseFinancesViewModel = ({ navigation }: NavigationFinancesViewModelProps) => {


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