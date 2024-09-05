import { useEffect, useRef, useState } from "react"
import { GroupsScreenProps } from "../../../navigation/NavigationParamList"
import { ScreenRoutes } from "../../../navigation/Routes"
import GetGroupsService from "../../../domain/services/GetGroupsService"
import { useAppSelector } from "../../../data/globalContext/StoreHooks"
import { selectUserApp } from "../../../data/globalContext/redux/slices/UserAppSlice"
import { Group } from "../../../data/types/Group"
import useInputModalViewModel from "../../components/modalInput/ModalInputViewModel"
import { FontFamily } from "../../constants/Fonts"
import { Colors } from "../../constants/Colors"
import { set } from "date-fns"
import JoinToGroupUseCase from "../../../domain/useCases/JoinToGroupUseCase"

type GroupsViewModelProps = {
    getGroupsService: GetGroupsService,
    joinToGroupUseCase: JoinToGroupUseCase
} & GroupsScreenProps

const useGroupsViewModel = ({
    navigation,
    route,
    getGroupsService,
    joinToGroupUseCase
}: GroupsViewModelProps) => {


    // ------------------- context ------------------- //
    const userApp = useAppSelector(selectUserApp)


    // ------------------- hooks ------------------- //
    const {
        modalState,
        hideModal,
        showModal,
        onChangeTextModal,
        modalValue
    } = useInputModalViewModel()


    // ------------------- routes params ------------------- //
    const groupId = route?.params?.groupId



    // ------------------- states ------------------- //
    const [groups, setGroups] = useState<Group[]>([])
    const groupCode = useRef<string>("")


    // ------------------- effect------------------- //
    useEffect(() => {
        getAllGroups()
    }, [])

    useEffect(() => {
        groupCode.current = modalState.value || ""
    }, [modalState.value])


    // ---------------- methods ---------------- //
    const navigateToCreateGroup = () => {
        navigation.navigate(ScreenRoutes.GROUP_FORM, {})
    }

    const navigateToFinancesOfGroup = (groupId: string) => {
        navigation.navigate(ScreenRoutes.HOME_GROUP, { groupId })
    }

    const getAllGroups = async () => {
        const groups = await getGroupsService.execute(userApp.userId)
        setGroups(groups)
    }

    const onPressJoinToGroup = () => {

        showModal(
            "Unirse a un grupo",
            "Código:",
            "Ingresa el código de WhatsApp",
            [
                {
                    text: "Unirse",
                    onPress: joinToGroupByCode
                },
                {
                    text: "Cancelar",
                    onPress: hideModal,
                    style: {
                        fontFamily: FontFamily.BOLD,
                        color: Colors.BLUE
                    }
                },
            ]
        )
    }

    const joinToGroupByCode = async () => {

        if (groupCode.current === "") return
        hideModal()

        // loading

        const validationResult = await joinToGroupUseCase.execute(userApp.userId, groupCode.current)

        // end loading

        if (validationResult.isValid) {
            navigation.navigate(ScreenRoutes.HOME_GROUP, { groupId: groupCode.current })

        } else {
            
            showModal(
                "Error",
                validationResult.message,
                "",
                [
                    {
                        text: "Ok",
                        onPress: hideModal
                    },
                ]
            )

        }

    }


    return {
        navigateToCreateGroup,
        navigateToFinancesOfGroup,
        onPressJoinToGroup,
        groups,
        modalState,
        onChangeTextModal,
    }
}

export default useGroupsViewModel