import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Label from '../../components/Label'
import { FontFamily, FontSize } from '../../constants/Fonts'
import MenuButton from '../../components/menuButton/MenuButton'
import Spacer from '../../components/Spacer'
import { Colors, DefaultStyles } from '../../constants/Index'
import { IMenuArrayButtonsProps } from './HomeViewModel'
import useHomeViewModel from './HomeViewModel'
import { HomeScreenProps } from '../../navigation/Index'


const HomeScreen = ({ navigation, route }: HomeScreenProps) => {


    const homeViewModel = useHomeViewModel({navigation, route})

    return (

        <SafeAreaView>

            <View style={DefaultStyles.SCREEN}>

                <Label
                    value={"Hola Felipe"}
                    fontSize={FontSize.LARGE}
                    fontFamily={FontFamily.BLACK}
                />

                <Label
                    value={"Tu saldo es de"}
                    fontSize={FontSize.MEDIUM}
                    fontFamily={FontFamily.BLACK}
                    color={Colors.DARK_GRAY}
                />

                <Spacer marginVertical={"1%"} />

                <Label
                    value="$1.200.000"
                    fontSize={FontSize.LARGE}
                    fontFamily={FontFamily.BLACK}
                />

                <Spacer marginVertical={"8%"} />


                <MenuArrayButton
                    movementsOnPress={homeViewModel.movementsOnPress}
                    incomesOnPress={homeViewModel.incomesOnPress}
                />


            </View>

        </SafeAreaView>
    )
}

const MenuArrayButton = ({
    movementsOnPress,
    incomesOnPress
}: IMenuArrayButtonsProps) => {

    return (

        <View style={homeStyle.horizontalArrayButtons}>

            <MenuButton
                title="Movimientos"
                onPress={movementsOnPress}
                backgroundColor={Colors.YELLOW}
                titleColor={Colors.BLACK}
            />

            <Spacer marginHorizontal={"4%"} />

            <MenuButton
                title="Ingresos"
                onPress={incomesOnPress}
                backgroundColor={Colors.GREEN}
                titleColor={Colors.BLACK}
            />

        </View>
    )

}

export default HomeScreen

const homeStyle = StyleSheet.create({

    horizontalArrayButtons: {
        width: "100%",
        flexDirection: "row",
        height: 150,
    }
})