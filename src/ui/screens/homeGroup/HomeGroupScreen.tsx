import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import MenuButton from '../../components/menuButton/MenuButton'
import Spacer from '../../components/spacer/Spacer'
import { Colors, DefaultStyles, Styles } from '../../constants/Index'
import { HomeGroupScreenProps } from '../../../navigation/NavigationParamList'
import BottomSheet from '../../components/bottomSheet/BottomSheet'
import CurrentDate from '../../components/currentDate/CurrentDate'
import Loading from '../../components/loading/Loading'
import BudgetRepository from '../../../data/repository/budgetRepository/BudgetRepository'
import HomeHeader from '../../components/homeHeader/homeHeader'
import Toast from '../../components/toast/Toast'
import Modal from '../../components/modal/Modal'
import CategoryRespository from '../../../data/repository/categoryRepository/CategoryRepository'
import ExpenseRepository from '../../../data/repository/expenseRepository/ExpenseRepository'
import SavedDateRepository from '../../../data/repository/savedDateRpository/SavedDateRepository'
import UpdateSavedDateUseCase from '../../../domain/useCases/UpdateSavedDateUseCase'
import ReadSavedDateUseCase from '../../../domain/useCases/ReadSavedDateUseCase'
import { currencyFormat } from '../../../utils/NumberFormat'
import Icons from '../../../assets/icons'
import useHomeGroupViewModel from './HomeGroupViewModel'
import ButtonApp from '../../components/buttonApp/ButtonApp'
import BudgetExpenseGroupUnitOfWork from '../../../data/unitOfWork/BudgetExpenseGroupUnitOfWork'
import IncomeRepository from '../../../data/repository/incomeRepository/IncomeRepository'
import BudgetExpenseUnitOfWork from '../../../data/unitOfWork/BudgetExpenseUnitOfWork'



// ------------------- repositories ------------------- //

const incomeRepository = new IncomeRepository()
const expenseRepository = new ExpenseRepository()
const budgetRepository = new BudgetRepository()

const budgetExpenseUnitOfWork = new BudgetExpenseUnitOfWork(
    budgetRepository,
    expenseRepository
)


const categoryRepository = new CategoryRespository()

const savedDateRepository = new SavedDateRepository()




// ------------------- use cases ------------------- //
// const copyMonthUseCase = new CopyMonthUseCase(
//     budgetRepository,
//     expenseRepository
// )

// const pasteMonthUseCase = new PasteMonthUseCase(
//     budgetRepository,
//     expenseRepository,
//     budgetExpenseUnitOfWork
// )

// const deleteMonthUseCase = new DeleteMothUseCase(
//     budgetRepository,
//     expenseRepository
// )

const updateSavedDateUseCase = new UpdateSavedDateUseCase(savedDateRepository)
const readSavedDateUseCase = new ReadSavedDateUseCase(savedDateRepository)



// ------------------- Home Screen ------------------- //
const HomeGroupScreen = ({ navigation, route }: HomeGroupScreenProps) => {


    // ------------------- view model ------------------- //
    const homeGroupViewModel = useHomeGroupViewModel({
        navigation,
        route,

        // repositories
        incomeRepository,
        expenseRepository,
        budgetRepository,
        categoryRepository,

        // unitOfWork
        budgetExpenseUnitOfWork,

        //use cases
        // copyMonthUseCase,
        // pasteMonthUseCase,
        // deleteMonthUseCase,

        updateSavedDateUseCase,
        readSavedDateUseCase,
    })


    const {
        bottomSheetState,
        showBottomSheet,
        totalremaining,
        modalState,
        toastState
    } = homeGroupViewModel


    return (

        <SafeAreaView>
            <View style={DefaultStyles.screen}>

                <HomeHeader
                    name={`Bienvenido al grupo: ${homeGroupViewModel.userName}`}
                    total={totalremaining}
                />

                <Spacer marginVertical={"4%"} />

                <CurrentDate
                    date={bottomSheetState.date}
                    showDate={showBottomSheet}
                />

                <Spacer marginVertical={"2%"} />

                <ButtonApp
                    title='Compartir grupo'
                    onPress={homeGroupViewModel.shareGroup}
                />

                <Spacer marginVertical={"4%"} />


                <View style={homeGroupStyles.rowButtons}>

                    <MenuButton
                        title={"Ingresos"}
                        subTitle={`$${currencyFormat(homeGroupViewModel.totalIncomes)}`}
                        backgroundColor={Colors.GREEN}
                        titleColor={Colors.BLACK}
                        onPress={homeGroupViewModel.navigateToIncomes}
                        icon={Icons.piggyBankBW}
                    />

                    <Spacer marginHorizontal={"2%"} />

                    <MenuButton
                        title={"Gastos"}
                        subTitle={`$${currencyFormat(homeGroupViewModel.totalExpenses)}`}
                        backgroundColor={Colors.RED}
                        titleColor={Colors.BLACK}
                        onPress={homeGroupViewModel.navigateToExpenses}
                        icon={Icons.creditCard}
                    />

                </View>

                <Spacer marginVertical={"2%"} />


                <View style={homeGroupStyles.rowButtons}>

                    <MenuButton
                        title={"Estadísticas"}
                        backgroundColor={Colors.LIGHT_BLUE}
                        titleColor={Colors.BLACK}
                        onPress={homeGroupViewModel.navigateToStatistics}
                        icon={Icons.chartLine}
                    />

                    <Spacer marginHorizontal={"2%"} />

                    <MenuButton
                        title={"Mi cuenta"}
                        backgroundColor={Colors.PURPLE}
                        titleColor={Colors.BLACK}
                        onPress={homeGroupViewModel.navigateToProfile}
                        icon={Icons.user}
                    />

                </View>



            </View>

            <BottomSheet
                visible={bottomSheetState.visible}
                date={bottomSheetState.date}
                onHide={homeGroupViewModel.hideBottomSheet}
                onConfirm={homeGroupViewModel.confirmDate}
                onChange={homeGroupViewModel.onChangeOperationDate}
                // onCopy={homeGroupViewModel.onCopyMonth}
                // onPaste={homeGroupViewModel.onPasteMonth}
                // onDelete={homeGroupViewModel.onDeleteMonth}

                updateSavedDateUseCase={updateSavedDateUseCase}
            />

            <Toast
                visible={toastState.visible}
                message={toastState.message}
                type={toastState.type}
            />

            <Loading visible={homeGroupViewModel.loading} />

            <Modal
                visible={modalState.visible}
                title={modalState.title}
                message={modalState.message}
                buttonList={modalState.buttonList}
            />

        </SafeAreaView>
    )
}

export default HomeGroupScreen

const homeGroupStyles = StyleSheet.create({

    rowButtons: {
        flexDirection: "row",
        height: Styles.HEIGHT * 0.225
    }

})
