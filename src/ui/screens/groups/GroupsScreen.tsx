import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Label from '../../components/label/Label'
import DefaultStyles from '../../styles/DefaultStyles'
import ButtonApp from '../../components/buttonApp/ButtonApp'
import Spacer from '../../components/spacer/Spacer'
import { FontFamily } from '../../constants/Fonts'
import { Colors } from '../../constants/Colors'
import { GroupsScreenProps } from '../../../navigation/NavigationParamList'
import useGroupsViewModel from './GroupsViewModel'
import GroupRepository from '../../../data/repository/groupRepository/GroupRepository'
import GetGroupsService from '../../../domain/services/GetGroupsService'

const groupRepository = new GroupRepository()
const getGroupsService = new GetGroupsService(groupRepository)


const GroupsScreen = ({
    navigation,
    route
}: GroupsScreenProps) => {

    const {
        navigateToCreateGroup,
        navigateToFinancesOfGroup,
        groups
    } = useGroupsViewModel({
        navigation,
        route,
        getGroupsService
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

            <Spacer marginVertical='4%' />

            <FlatList
                data={groups}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigateToFinancesOfGroup(item.groupId)}
                        style={{
                            width: '100%',
                            height: 70,
                            borderWidth: 1,
                            marginBottom: 20
                        }}>
                        <Text style={{
                            color: Colors.BLACK,
                        }}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />


        </View>
    )
}

export default GroupsScreen
