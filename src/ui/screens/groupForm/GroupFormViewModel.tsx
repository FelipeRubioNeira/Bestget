import { useState } from "react";
import { GroupFormScreenProps } from "../../../navigation/NavigationParamList";
import useModalViewModel, { ModalProps } from "../../components/modal/ModalViewModel";
import { Group } from "../../../data/types/Group";
import CreateGroupUseCase from "../../../domain/useCases/CreateGroupUseCase";
import { useAppSelector } from "../../../data/globalContext/StoreHooks";
import { selectUserApp } from "../../../data/globalContext/slices/UserAppSlice";
import useLoadingViewModel from "../../components/loading/LoadingViewModel";
import { ScreenRoutes } from "../../../navigation/Routes";



// ------------------- types ------------------- //
type GroupFormViewModelProps = {
    createGroupUseCase: CreateGroupUseCase
} & GroupFormScreenProps


// ------------------- view model ------------------- //
const useGroupFormViewModel = ({
    navigation,
    route,
    createGroupUseCase
}: GroupFormViewModelProps) => {

    // ------------------- context------------------- //
    const userApp = useAppSelector(selectUserApp)


    // ------------------- viewModel ------------------- //
    const {
        isLoading,
        showLoading,
        hideLoading
    } = useLoadingViewModel()



    // ------------------- params ------------------- //
    const { group } = route.params

    // ------------------- states ------------------- //
    const [groupState, setGroupState] = useState({
        groupName: "",
    })

    const [modalState, setModalState] = useState<ModalProps>({
        visible: false,
        title: "",
        message: "",
        buttonList: []
    })

    const {
        showModal,
        hideModal
    } = useModalViewModel()



    // ---------------- methods ---------------- //
    const changeNameGroup = (name: string) => {
        setGroupState({
            ...groupState,
            groupName: name
        })
    }


    // ---------------- save or update ---------------- //
    const onPressCreateGroup = () => saveOrUpdateGroup()


    // ---------------- create or edit ---------------- //
    const saveOrUpdateGroup = () => {
        if (group) editGroup(group)
        else createGroup()
    }

    const createGroup = async () => {

        showLoading()

        const newGroup: Group = {
            groupId: "",
            name: groupState.groupName,
            createdBy: userApp.userId,
            createdDate: new Date(),
            updatedDate: null
        }

        const response = await createGroupUseCase.execute(
            newGroup,
            userApp.userId
        )

        hideLoading()

        if (response.isValid) {
            returnToGroups(response.result?.groupId || "")

        } else {
            showModal(
                "Error",
                response.message,
                [
                    {
                        text: "Aceptar",
                        onPress: () => hideModal()
                    }
                ])
        }
    }

    const editGroup = async (group: Group) => {}


    // ---------------- return to groups ---------------- //
    const returnToGroups = (groupId: string) => {
        navigation.pop()
        navigation.replace(ScreenRoutes.GROUPS, { groupId: groupId })
    }



    // ------------------- return ------------------- //
    return {
        groupState,
        changeNameGroup,
        modalState,
        onPressCreateGroup,
        isLoading
    }
}

export default useGroupFormViewModel