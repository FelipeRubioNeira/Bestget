import { SafeAreaView, StyleSheet, View } from 'react-native'
import React from 'react'
import Label from '../../components/label/Label'
import { FontFamily, FontSize } from '../../constants/Fonts'
import MenuButton from '../../components/menuButton/MenuButton'
import Spacer from '../../components/spacer/Spacer'
import { Colors, DefaultStyles } from '../../constants/Index'
import { IMenuArrayButtonsProps } from './HomeViewModel'
import useHomeViewModel from './HomeViewModel'
import { HomeScreenProps } from '../../../navigation/NavigationParamList'
import IncomeRepository from '../../../data/repository/incomeRepository/IncomeRepository'
import CategoryRespository from '../../../data/repository/categoryRepository/CategoryRepository'

const incomeRepository = new IncomeRepository()
const categoryRepository = new CategoryRespository()


const HomeScreen = ({ navigation, route }: HomeScreenProps) => {

    const homeViewModel = useHomeViewModel({
        navigation,
        route,
        categoryRepository,
        incomeRepository,
    })

    return (

        <SafeAreaView>

            <View style={DefaultStyles.screen}>

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
                    value={"$" + homeViewModel.totalIncomes}
                    fontSize={FontSize.LARGE}
                    fontFamily={FontFamily.BLACK}
                />

                <Spacer marginVertical={"8%"} />


                <MenuArrayButton
                    onPressBudgetsExpenses={homeViewModel.onPressBudgetsExpenses}
                    onPressIncomes={homeViewModel.onPressIncomes}
                />


            </View>

        </SafeAreaView>
    )
}

const MenuArrayButton = ({
    onPressBudgetsExpenses,
    onPressIncomes
}: IMenuArrayButtonsProps) => {

    return (

        <View style={homeStyle.horizontalArrayButtons}>

            <MenuButton
                title="Gastos y Presupuestos"
                onPress={onPressBudgetsExpenses}
                backgroundColor={Colors.YELLOW}
                titleColor={Colors.BLACK}
            />

            <Spacer marginHorizontal={"4%"} />

            <MenuButton
                title="Ingresos"
                onPress={onPressIncomes}
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