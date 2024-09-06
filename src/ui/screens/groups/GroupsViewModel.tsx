import { useEffect, useRef, useState } from "react"
import { updateGroupId, selectFinancesApp } from "../../../data/globalContext/redux/slices/FinancesAppSlice"
import { selectUserApp } from "../../../data/globalContext/redux/slices/UserAppSlice"
import { useAppDispatch, useAppSelector } from "../../../data/globalContext/StoreHooks"
import { Group } from "../../../data/types/Group"
import GetGroupsService from "../../../domain/services/GetGroupsService"
import JoinToGroupUseCase from "../../../domain/useCases/JoinToGroupUseCase"
import { GroupsScreenProps } from "../../../navigation/NavigationParamList"
import { ScreenRoutes } from "../../../navigation/Routes"
import useInputModalViewModel from "../../components/modalInput/ModalInputViewModel"
import { Colors } from "../../constants/Colors"
import { FontFamily } from "../../constants/Fonts"

type GroupsViewModelProps = {
    getGroupsService: GetGroupsService,
    joinToGroupUseCase: JoinToGroupUseCase
} & GroupsScreenProps

const useGroupsViewModel = ({
    navigation,
    getGroupsService,
    joinToGroupUseCase
}: GroupsViewModelProps) => {


    // ------------------- context ------------------- //
    const userApp = useAppSelector(selectUserApp)
    const financesApp =  useAppSelector(selectFinancesApp)
    const appDispatch = useAppDispatch()




    // ------------------- hooks ------------------- //
    const {
        modalState,
        hideModal,
        showModal,
        onChangeTextModal,
        modalValue
    } = useInputModalViewModel()



    // ------------------- states ------------------- //
    const [groups, setGroups] = useState<Group[]>([])
    const groupCode = useRef<string>("")


    // ------------------- effect------------------- //
    useEffect(() => {
        appDispatch(updateGroupId(""))
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
        navigation.navigate(ScreenRoutes.HOME_GROUP)
        appDispatch(updateGroupId(groupId))
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

        // TODO: loading

        const validationResult = await joinToGroupUseCase.execute(userApp.userId, groupCode.current)

        // end loading

        if (validationResult.isValid) {
            navigateToFinancesOfGroup(groupCode.current)

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