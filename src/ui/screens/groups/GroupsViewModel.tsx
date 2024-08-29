import { useEffect } from "react"
import { GroupsScreenProps } from "../../../navigation/NavigationParamList"
import { ScreenRoutes } from "../../../navigation/Routes"
import { ro } from "date-fns/locale"

type GroupsViewModelProps = {

} & GroupsScreenProps

const useGroupsViewModel = ({
    navigation,
    route
}: GroupsViewModelProps) => {

    const groupId = route?.params?.groupId

    // ------------------- effect------------------- //
    useEffect(() => {
        if (groupId) {
            console.log('nos ha llegado un nuevo groupId', groupId);
        }

    }, [groupId])

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