import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import MenuButton from '../../components/menuButton/MenuButton'
import Spacer from '../../components/spacer/Spacer'
import { Colors, DefaultStyles, Styles } from '../../constants/Index'
import { HomeScreenProps } from '../../../navigation/NavigationParamList'
import useHomeViewModel from './HomeViewModel'
import BottomSheet from '../../components/bottomSheet/BottomSheet'
import CurrentDate from '../../components/currentDate/CurrentDate'
import Loading from '../../components/loading/Loading'
import BudgetRepository from '../../../data/repository/budgetRepository/BudgetRepository'
import HomeHeader from '../../components/homeHeader/homeHeader'
import Toast from '../../components/toast/Toast'
import Modal from '../../components/modal/Modal'
import IncomeRepository from '../../../data/repository/incomeRepository/IncomeRepository'
import CategoryRespository from '../../../data/repository/categoryRepository/CategoryRepository'
import ExpenseRepository from '../../../data/repository/expenseRepository/ExpenseRepository'
import CopyMonthUseCase from '../../../domain/useCases/CopyMonthUseCase'
import PasteMonthUseCase from '../../../domain/useCases/PasteMonthUseCase'
import DeleteMothUseCase from '../../../domain/useCases/DeleteMonthUseCase'
import BudgetExpenseUnitOfWork from '../../../data/unitOfWork/BudgetExpenseUnitOfWork'
import SavedDateRepository from '../../../data/repository/savedDateRpository/SavedDateRepository'
import UpdateSavedDateUseCase from '../../../domain/useCases/UpdateSavedDateUseCase'
import ReadSavedDateUseCase from '../../../domain/useCases/ReadSavedDateUseCase'
import { currencyFormat } from '../../../utils/NumberFormat'
import Icons from '../../../assets/icons'


// ------------------- google sign in ------------------- //


// ------------------- google sign in ------------------- //


// ------------------- repositories ------------------- //

const incomeRepository = new IncomeRepository()

const expenseRepository = new ExpenseRepository()
const budgetRepository = new BudgetRepository()
const categoryRepository = new CategoryRespository()

const savedDateRepository = new SavedDateRepository()


const budgetExpenseUnitOfWork = new BudgetExpenseUnitOfWork(
    budgetRepository,
    expenseRepository
)


// ------------------- use cases ------------------- //
const copyMonthUseCase = new CopyMonthUseCase(
    incomeRepository,
    budgetRepository,
    expenseRepository
)

const pasteMonthUseCase = new PasteMonthUseCase(
    incomeRepository,
    budgetRepository,
    expenseRepository,
    budgetExpenseUnitOfWork
)

const deleteMonthUseCase = new DeleteMothUseCase(
    incomeRepository,
    budgetRepository,
    expenseRepository
)

const updateSavedDateUseCase = new UpdateSavedDateUseCase(savedDateRepository)
const readSavedDateUseCase = new ReadSavedDateUseCase(savedDateRepository)



// ------------------- Home Screen ------------------- //
const HomeScreen = ({ navigation, route }: HomeScreenProps) => {


    // ------------------- view model ------------------- //
    const homeViewModel = useHomeViewModel({
        navigation,
        route,
        // repositories
        categoryRepository,
        expenseRepository,
        budgetRepository,
        incomeRepository,

        // unitOfWork
        budgetExpenseUnitOfWork,


        // use cases
        copyMonthUseCase,
        pasteMonthUseCase,
        deleteMonthUseCase,

        updateSavedDateUseCase,
        readSavedDateUseCase,
    })


    const {
        bottomSheetState,
        showBottomSheet,
        totalremaining,
        modalState,
        toastState
    } = homeViewModel


    return (

        <SafeAreaView>
            <View style={DefaultStyles.screen}>

                <HomeHeader
                    name={`Bienvenido ${homeViewModel.userName}`}
                    total={totalremaining}
                />

                <Spacer marginVertical={"4%"} />

                <CurrentDate
                    date={bottomSheetState.date}
                    showDate={showBottomSheet}
                />

                <Spacer marginVertical={"4%"} />


                <View style={homeStyles.rowButtons}>

                    <MenuButton
                        title={"Ingresos"}
                        subTitle={`$${currencyFormat(homeViewModel.totalIncomes)}`}
                        backgroundColor={Colors.GREEN}
                        titleColor={Colors.BLACK}
                        onPress={homeViewModel.navigateToIncomes}
                        icon={Icons.piggyBankBW}
                    />

                    <Spacer marginHorizontal={"2%"} />

                    <MenuButton
                        title={"Gastos"}
                        subTitle={`$${currencyFormat(homeViewModel.totalExpenses)}`}
                        backgroundColor={Colors.RED}
                        titleColor={Colors.BLACK}
                        onPress={homeViewModel.navigateToExpenses}
                        icon={Icons.creditCard}
                    />

                </View>

                <Spacer marginVertical={"2%"} />


                <View style={homeStyles.rowButtons}>

                    <MenuButton
                        title={"Estadísticas"}
                        backgroundColor={Colors.LIGHT_BLUE}
                        titleColor={Colors.BLACK}
                        onPress={homeViewModel.navigateToStatistics}
                        icon={Icons.chartLine}
                    />

                    <Spacer marginHorizontal={"2%"} />

                    <MenuButton
                        title={"Mi cuenta"}
                        backgroundColor={Colors.PURPLE}
                        titleColor={Colors.BLACK}
                        onPress={homeViewModel.navigateToProfile}
                        icon={Icons.user}
                    />

                </View>



            </View>

            <BottomSheet
                visible={bottomSheetState.visible}
                date={bottomSheetState.date}
                onHide={homeViewModel.hideBottomSheet}
                onConfirm={homeViewModel.confirmDate}
                onChange={homeViewModel.onChangeOperationDate}
                onCopy={homeViewModel.onCopyMonth}
                onPaste={homeViewModel.onPasteMonth}
                onDelete={homeViewModel.onDeleteMonth}

                updateSavedDateUseCase={updateSavedDateUseCase}
            />

            <Toast
                visible={toastState.visible}
                message={toastState.message}
                type={toastState.type}
            />

            <Loading visible={homeViewModel.loading} />

            <Modal
                visible={modalState.visible}
                title={modalState.title}
                message={modalState.message}
                buttonList={modalState.buttonList}
            />

        </SafeAreaView>
    )
}

export default HomeScreen

const homeStyles = StyleSheet.create({

    rowButtons: {
        flexDirection: "row",
        height: Styles.HEIGHT * 0.225
    }

})
