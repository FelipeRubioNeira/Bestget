import { useState } from "react";
import { GroupFormScreenProps } from "../../../navigation/NavigationParamList";
import { ModalProps } from "../../components/modal/ModalViewModel";
import { Group } from "../../../data/types/Group";

const useGroupFormViewModel = ({
    navigation,
    route
}: GroupFormScreenProps) => {

    // ------------------- params ------------------- //
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
        console.log("createGroup");

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