import { GroupsScreenProps } from "../../../navigation/NavigationParamList"
import { ScreenRoutes } from "../../../navigation/Routes"

type GroupsViewModelProps = {

} & GroupsScreenProps

const useGroupsViewModel = ({
    navigation,
    route
}: GroupsViewModelProps) => {


    // ---------------- methods ---------------- //
    const navigateToCreateGroup = () => { 
        navigation.navigate(ScreenRoutes.GROUP_FORM, {})
    }

    const navigateToFinancesOfGroup = () => { }


    return {
        navigateToCreateGroup,
        navigateToFinancesOfGroup
    }
}

export default useGroupsViewModel