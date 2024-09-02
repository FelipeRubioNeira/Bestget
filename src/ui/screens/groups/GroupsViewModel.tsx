import { useEffect, useState } from "react"
import { GroupsScreenProps } from "../../../navigation/NavigationParamList"
import { ScreenRoutes } from "../../../navigation/Routes"
import GetGroupsService from "../../../domain/services/GetGroupsService"
import { useAppSelector } from "../../../data/globalContext/StoreHooks"
import { selectUserApp } from "../../../data/globalContext/redux/slices/UserAppSlice"
import { selectDateIntervalApp } from "../../../data/globalContext/redux/slices/DateIntervalAppSlice"
import { Group } from "../../../data/types/Group"

type GroupsViewModelProps = {
    getGroupsService: GetGroupsService
} & GroupsScreenProps

const useGroupsViewModel = ({
    navigation,
    route,
    getGroupsService
}: GroupsViewModelProps) => {


    // ------------------- context ------------------- //
    const userApp = useAppSelector(selectUserApp)


    // ------------------- routes params ------------------- //
    const groupId = route?.params?.groupId



    // ------------------- states ------------------- //
    const [groups, setGroups] = useState<Group[]>([])


    // ------------------- effect------------------- //
    useEffect(() => {
        getAllGroups()
    }, [])


    // ---------------- methods ---------------- //
    const navigateToCreateGroup = () => {
        navigation.navigate(ScreenRoutes.GROUP_FORM, {})
    }

    const navigateToFinancesOfGroup = () => { }

    const getAllGroups = async () => {
        const groups = await getGroupsService.execute(userApp.userId)
        setGroups(groups)
    }


    return {
        navigateToCreateGroup,
        navigateToFinancesOfGroup,
        groups
    }
}

export default useGroupsViewModel