import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Label from '../../components/label/Label'
import DefaultStyles from '../../styles/DefaultStyles'
import ButtonApp from '../../components/buttonApp/ButtonApp'
import Spacer from '../../components/spacer/Spacer'
import { FontFamily, FontSize } from '../../constants/Fonts'
import { Colors } from '../../constants/Colors'
import { GroupsScreenProps } from '../../../navigation/NavigationParamList'
import useGroupsViewModel from './GroupsViewModel'
import GroupRepository from '../../../data/repository/groupRepository/GroupRepository'
import GetGroupsService from '../../../domain/services/GetGroupsService'
import ModalInput from '../../components/modalInput/ModalInput'
import JoinToGroupUseCase from '../../../domain/useCases/JoinToGroupUseCase'
import Modal from '../../components/modal/Modal'
import { Styles } from '../../styles/Styles'
import GroupItem from '../../components/groupItem/GroupItem'
import DeleteGroupUseCase from '../../../domain/useCases/DeleteGroupUseCase'


// dependency injection
const groupRepository = new GroupRepository()
const getGroupsService = new GetGroupsService(groupRepository)
const joinToGroupUseCase = new JoinToGroupUseCase(groupRepository)

const deleteGroupUseCase = new DeleteGroupUseCase(groupRepository)


// ------------------- component ------------------- //
const GroupsScreen = ({
    navigation,
    route,
}: GroupsScreenProps) => {

    const {
        navigateToCreateGroup,
        navigateToFinancesOfGroup,
        groups,
        onPressJoinToGroup,
        modalInputState,
        onChangeTextModal,
        modalState,
        editMode,
        onPressDeleteGroupConfirmation,
        onPressEditGroupConfirmation
    } = useGroupsViewModel({
        navigation,
        route,
        getGroupsService,
        joinToGroupUseCase,
        deleteGroupUseCase
    })

    return (
        <View style={DefaultStyles.screen}>

            <Label
                value='Selecciona una opcion:'
                fontFamily={FontFamily.BOLD}
            />

            <Spacer marginVertical='4%' />

            <ButtonApp
                title='Crear grupo'
                onPress={navigateToCreateGroup}
                buttonStyle={{
                    backgroundColor: Colors.CHIP_LUXURIES,
                }}
            />

            <Spacer marginVertical='2%' />

            <ButtonApp
                title='Unirse a grupo'
                onPress={onPressJoinToGroup}
                labelStyle={{
                    color: Colors.WHITE
                }}
                buttonStyle={{
                    backgroundColor: Colors.BLACK,
                }}
            />

            <Spacer marginVertical='4%' />

            <FlatList
                data={groups}
                renderItem={({ item }) => (
                    <GroupItem
                        groupId={item.groupId}
                        name={item.name}
                        editMode={editMode}
                        navigateToFinancesOfGroup={() => navigateToFinancesOfGroup(item.groupId)}
                        onDelete={() => onPressDeleteGroupConfirmation(item.groupId)}
                        onEdit={() => onPressEditGroupConfirmation(item.groupId)}
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
            />

            <ModalInput
                message={modalInputState.message}
                buttonList={modalInputState.buttonList}
                onChangeTextModal={onChangeTextModal}
                value={modalInputState.value}
                title={modalInputState.title}
                visible={modalInputState.visible}
            />

            <Modal
                title={modalState.title}
                visible={modalState.visible}
                message={modalState.message}
                buttonList={modalState.buttonList}
            />


        </View>
    )
}

export default GroupsScreen
