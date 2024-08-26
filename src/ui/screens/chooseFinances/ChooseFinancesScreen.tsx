import { View } from 'react-native'
import React from 'react'
import Label from '../../components/label/Label'
import MenuButton from '../../components/menuButton/MenuButton'
import { Colors } from '../../constants/Colors'
import DefaultStyles from '../../styles/DefaultStyles'
import Spacer from '../../components/spacer/Spacer'
import { FontFamily, FontSize } from '../../constants/Fonts'
import { ChooseFinancesScreenProps } from '../../../navigation/NavigationParamList'
import useChooseFinancesViewModel from './ChooseFinancesViewModel'


const ChooseFinancesScreen = ({
    navigation,
    route
}: ChooseFinancesScreenProps) => {

    const {
        navigateToPersonalFinances,
        navigateToGroups
    } = useChooseFinancesViewModel({ navigation, route })

    return (
        <View style={DefaultStyles.screen}>

            <Label
                value='Elige una opción:'
                fontFamily={FontFamily.BOLD}
            />

            <Spacer marginVertical={"4%"} />

            <Label
                value='Puedes escoger entre tus finanzas personas y los grupos que has creado.'
                fontSize={FontSize.SMALL}
                color={Colors.BLACK}
                fontFamily={FontFamily.BOLD}
            />

            <Spacer marginVertical={"4%"} />

            <MenuButton
                title={"Mis finanzas"}
                subTitle='Revisar tus finanzas personales.'
                backgroundColor={Colors.BLUE}
                titleColor={Colors.WHITE}
                subtitleFontSize={FontSize.XSMALL}
                comingSoon={false}
                onPress={navigateToPersonalFinances}
            />

            <Spacer marginVertical={"4%"} />

            <MenuButton
                title={"Grupos"}
                titleColor={Colors.BLACK}
                subTitle='Crea grupos de finanza con tu familia o amigos.'
                subtitleFontSize={FontSize.XSMALL}
                subtitleColor={Colors.DARK_GRAY}
                backgroundColor={Colors.CHIP_LUXURIES}
                comingSoon={false}
                onPress={navigateToGroups}
            />

            <Spacer marginVertical={"4%"} />


            <Label
                value='Siempre puedes volver a esta pantalla para cambiar de opción...'
                fontSize={FontSize.SMALL}
                color={Colors.BLACK}
                fontFamily={FontFamily.BOLD}
            />

            <Spacer marginVertical={"4%"} />


        </View>
    )
}

export default ChooseFinancesScreen

