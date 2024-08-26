import { View } from 'react-native'
import React from 'react'
import Label from '../../components/label/Label'
import DefaultStyles from '../../styles/DefaultStyles'
import ButtonApp from '../../components/buttonApp/ButtonApp'
import Spacer from '../../components/spacer/Spacer'
import { FontFamily } from '../../constants/Fonts'
import { Colors } from '../../constants/Colors'
import { GroupsScreenProps } from '../../../navigation/NavigationParamList'
import useGroupsViewModel from './GroupsViewModel'


const GroupsScreen = ({
    navigation,
    route
}: GroupsScreenProps) => {

    const { 
        navigateToCreateGroup,
        navigateToFinancesOfGroup
    } = useGroupsViewModel({ navigation, route })

    return (
        <View style={DefaultStyles.screen}>

            <Label
                value='Selecciona una opcion'
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

        </View>
    )
}

export default GroupsScreen
