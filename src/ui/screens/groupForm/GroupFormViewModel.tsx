import { useState } from "react";
import { GroupFormScreenProps } from "../../../navigation/NavigationParamList";
import useModalViewModel, { ModalProps } from "../../components/modal/ModalViewModel";
import { Group } from "../../../data/types/Group";
import CreateGroupUseCase from "../../../domain/useCases/CreateGroupUseCase";
import { useAppSelector } from "../../../data/globalContext/StoreHooks";
import { selectUserApp } from "../../../data/globalContext/slices/UserAppSlice";



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

    const modalViewModel = useModalViewModel()



    // ---------------- methods ---------------- //
    const changeNameGroup = (name: string) => {
        setGroupState({
            ...groupState,
            groupName: name
        })
    }

    // ---------------- save or update ---------------- //
    const onPressCreateGroup = () => saveOrUpdateGroup()


    const saveOrUpdateGroup = async () => {
        if (group) editGroup(group)
        else createGroup()
    }

    const createGroup = async () => {

        const newGroup: Group = {
            groupId: "",
            name: groupState.groupName,
        }

        const response = await createGroupUseCase.execute(
            newGroup,
            userApp.userId
        )

        if (response.isValid) {
            navigation.goBack()

        } else {
            modalViewModel.showModal(
                "Error",
                response.message,
                [
                    {
                        text: "Aceptar",
                        onPress: () => modalViewModel.hideModal()
                    }
                ])
        }
    }

    const editGroup = async (group: Group) => { }


    // ------------------- return ------------------- //
    return {
        groupState,
        changeNameGroup,
        modalState,
        onPressCreateGroup
    }
}

export default useGroupFormViewModel