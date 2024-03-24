import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native'
import React from 'react'
import Label from '../../components/label/Label'
import { FontFamily, FontSize } from '../../constants/Fonts'
import MenuButton from '../../components/menuButton/MenuButton'
import Spacer from '../../components/spacer/Spacer'
import { Colors, DefaultStyles } from '../../constants/Index'
import { ButtonHomeProps } from './HomeViewModel'
import useHomeViewModel from './HomeViewModel'
import { HomeScreenProps } from '../../../navigation/NavigationParamList'
import IncomeRepository from '../../../data/repository/incomeRepository/IncomeRepository'
import CategoryRespository from '../../../data/repository/categoryRepository/CategoryRepository'
import ExpenseRepository from '../../../data/repository/expenseRepository/ExpenseRepository'

const incomeRepository = new IncomeRepository()
const expenseRepository = new ExpenseRepository()
const categoryRepository = new CategoryRespository()


const HomeScreen = ({ navigation, route }: HomeScreenProps) => {

    const homeViewModel = useHomeViewModel({
        navigation,
        route,
        categoryRepository,
        expenseRepository,
        incomeRepository,
    })

    return (

        <SafeAreaView>

            <View style={DefaultStyles.screen}>

                <Label
                    value={"Hola Casita"}
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
                    value={"$" + homeViewModel.totalremaining}
                    fontSize={FontSize.LARGE}
                    fontFamily={FontFamily.BLACK}
                />

                <Spacer marginVertical={"8%"} />


                <MenuArrayButton
                    buttonArray={homeViewModel.buttonsHome}
                />


            </View>

        </SafeAreaView>
    )
}

const MenuArrayButton = ({ buttonArray }: { buttonArray: ButtonHomeProps[] }) => {
    return (
        <View>

            <FlatList
                data={buttonArray}
                renderItem={({ item }) => (
                    <View style={homeStyle.buttonContainer}>
                        <MenuButton
                            title={item.title}
                            subTitle={item.subTitle}
                            onPress={item.onPress}
                            backgroundColor={item.backgroundColor}
                            titleColor={item.titleColor}
                        />
                    </View>
                )}
                keyExtractor={item => item.title}
                numColumns={2}
            />

        </View>
    )
}

export default HomeScreen

const homeStyle = StyleSheet.create({

    buttonContainer: {
        flex: 1,
        margin: '2%',
        height: 150,
    },

})