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
import BottomSheet from '../../components/bottomSheet/BottomSheet'
import CurrentDate from '../../components/currentDate/CurrentDate'
import Loading from '../../components/loading/Loading'

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

    const { 
        bottomSheetState,
        showBottomSheet
     } = homeViewModel
     

    return (

        <SafeAreaView>
            <View style={DefaultStyles.screen}>

                <Header total={homeViewModel.totalremaining} />

                <Spacer marginVertical={"4%"} />

                <CurrentDate
                    date={bottomSheetState.date}
                    showDate={showBottomSheet}
                />

                <Spacer marginVertical={"4%"} />

                <MenuArrayButton
                    buttonArray={homeViewModel.buttonsHome}
                />

            </View>

            <BottomSheet
                visible={bottomSheetState.visible}
                date={bottomSheetState.date}
                onHide={homeViewModel.hideBottomSheet}
                onConfirm={homeViewModel.confirmDate}
            />
            <Loading visible={homeViewModel.loading} />

        </SafeAreaView>
    )
}


const Header = ({ total = "" }: { total: string }) => {

    return (

        <View>
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
                value={"$" + total}
                fontSize={FontSize.LARGE}
                fontFamily={FontFamily.BLACK}
            />

        </View>
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