import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Label from '../../components/label/Label'
import MenuButton from '../../components/menuButton/MenuButton'
import { Colors } from '../../constants/Colors'
import DefaultStyles from '../../styles/DefaultStyles'
import Spacer from '../../components/spacer/Spacer'
import { FontSize } from '../../constants/Fonts'

const ChooseFinances = () => {
    return (
        <View style={DefaultStyles.screen}>

            <Label
                value='Elige una opción :'
                style={DefaultStyles.highlightedText}
            />

            <Spacer marginVertical={"4%"} />

            <MenuButton
                title={"Mis finanzas"}
                subTitle='Revisar mis finanzas personales'
                backgroundColor={Colors.BLUE}
                titleColor={Colors.WHITE}
                subtitleFontSize={FontSize.XSMALL}
                comingSoon={false}
                onPress={() => { }}
            />

            <Spacer marginVertical={"2%"} />

            <MenuButton
                title={"Grupos"}
                subTitle='Crea grupos de finanzas con tus amigos'
                subtitleFontSize={FontSize.XSMALL}
                backgroundColor={Colors.BLUE}
                titleColor={Colors.WHITE}
                comingSoon={false}
                onPress={() => { }}
            />
        </View>
    )
}

export default ChooseFinances

const styles = StyleSheet.create({})