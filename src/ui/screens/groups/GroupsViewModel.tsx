import React from "react"
import { useEffect, useRef, useState } from "react"
import { updateGroupId } from "../../../data/globalContext/redux/slices/FinancesAppSlice"
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
import HeaderRight from "../../components/headerRight/HeaderRight"
import useModalViewModel from "../../components/modal/ModalViewModel"
import DefaultStyles from "../../styles/DefaultStyles"
import DeleteGroupUseCase from "../../../domain/useCases/DeleteGroupUseCase"


type GroupsViewModelProps = {
    getGroupsService: GetGroupsService,
    joinToGroupUseCase: JoinToGroupUseCase,
    deleteGroupUseCase: DeleteGroupUseCase
} & GroupsScreenProps


// ------------------- viewModel ------------------- //
const useGroupsViewModel = ({
    navigation,
    getGroupsService,
    joinToGroupUseCase,
    deleteGroupUseCase
}: GroupsViewModelProps) => {


    // ------------------- context ------------------- //
    const userApp = useAppSelector(selectUserApp)
    const appDispatch = useAppDispatch()




    // ------------------- hooks ------------------- //

    // modal input
    const {
        modalInputState,
        showInputModal,
        hideInputModal,
        onChangeTextModal,
    } = useInputModalViewModel()


    // modal
    const {
        modalState,
        hideModal,
        showModal
    } = useModalViewModel()



    // ------------------- states ------------------- //
    const [groups, setGroups] = useState<Group[]>([])
    const groupCode = useRef("")
    const [editMode, setEditMode] = useState(false)


    // ------------------- effect------------------- //
    useEffect(() => {
        appDispatch(updateGroupId(""))
        getAllGroups()
    }, [])

    // when the modal is open, we update the group code
    useEffect(() => {
        groupCode.current = modalInputState.value || ""
    }, [modalInputState.value])

    // we add the delete button to the header if there are incomes
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <HeaderRight
                        onPressEdit={onPressEditHeaderIcon}
                        onPressQuestion={onPressQuestionHeaderIcon}
                        editIconVisible={groups.length > 0}
                    />
                )
            }
        })

    }, [groups, editMode])


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

        showInputModal(
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
                    onPress: hideInputModal,
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
        hideInputModal()

        // TODO: loading

        const validationResult = await joinToGroupUseCase.execute(userApp.userId, groupCode.current)

        // end loading

        if (validationResult.isValid) {
            navigateToFinancesOfGroup(groupCode.current)

        } else {

            showInputModal(
                "Error",
                validationResult.message,
                "",
                [
                    {
                        text: "Unirse",
                        onPress: joinToGroupByCode
                    },
                    {
                        text: "Cancelar",
                        onPress: hideInputModal,
                        style: {
                            fontFamily: FontFamily.BOLD,
                            color: Colors.BLUE
                        }
                    },
                ]
            )

        }

    }


    // ------------------- header buttons ------------------- //
    const onPressQuestionHeaderIcon = () => {
        showModal(
            "Ayuda",
            "Un grupo es un equipo de personas que gestionan sus finanzas de manera colaborativa.",
            [{ text: 'Aceptar', onPress: hideModal }]
        )
    }

    const onPressEditGroupConfirmation = (groupId: string) => {

        turnOffDeleteMode()

        //const income = incomes.find(income => income.incomeId === incomeId)

        // navigation.navigate(ScreenRoutes.INCOME_FORM, {
        //     income,
        // })
    }

    const onPressDeleteGroupConfirmation = (groupId: string) => {

        showModal(
            "Eliminar grupo",
            "¿Estás seguro que deseas eliminar este grupo?" +
            "Se eliminarán todos los datos asociados al grupo, incluyendo los miembros y las finanzas.",
            [
                {
                    text: 'Aceptar',
                    onPress: () => deleteGroup(groupId),
                },
                {
                    text: 'Cancelar',
                    onPress: hideModal,
                    style: DefaultStyles.highlightedText
                }
            ]
        )
    }

    const deleteGroup = async (groupId: string) => {

        const { isValid, message } = await deleteGroupUseCase.execute(groupId)

        if (isValid) {
            clearGroup(groupId)
            hideModal()

        } else {
            showModal(
                "Error al eliminar grupo",
                message,
                [{ text: 'Aceptar', onPress: hideModal }]
            )
        }
    }

    const clearGroup = (groupId: string) => {
        const newGroups = groups.filter(group => group.groupId !== groupId)
        setGroups(newGroups)
    }

    const onPressEditHeaderIcon = () => {
        !editMode ? turnOnDeleteMode() : turnOffDeleteMode();
    }

    const turnOnDeleteMode = () => {
        setEditMode(true)
    }

    const turnOffDeleteMode = () => {
        setEditMode(false)
    }






    // ------------------- return ------------------- //
    return {

        // navigation
        navigateToCreateGroup,
        navigateToFinancesOfGroup,
        onPressJoinToGroup,
        groups,

        // modal input
        onChangeTextModal,
        modalInputState,

        // modal
        modalState,

        editMode,
        onPressDeleteGroupConfirmation,
        onPressEditGroupConfirmation,
    }
}

export default useGroupsViewModel