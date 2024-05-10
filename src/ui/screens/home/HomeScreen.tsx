import React from 'react'
import { FlatList, SafeAreaView, View } from 'react-native'
import MenuButton from '../../components/menuButton/MenuButton'
import Spacer from '../../components/spacer/Spacer'
import { DefaultStyles } from '../../constants/Index'
import { ButtonHomeProps } from './HomeViewModel'
import { HomeScreenProps } from '../../../navigation/NavigationParamList'
import useHomeViewModel from './HomeViewModel'
import BottomSheet from '../../components/bottomSheet/BottomSheet'
import CurrentDate from '../../components/currentDate/CurrentDate'
import Loading from '../../components/loading/Loading'
import BudgetRepository from '../../../data/repository/budgetRepository/BudgetRepository'
import HomeHeader from '../../components/homeHeader/homeHeader'
import Toast from '../../components/toast/Toast'
import HomeStyles from './HomeStyles'
import Modal from '../../components/modal/Modal'
import IncomeRepository from '../../../data/repository/incomeRepository/IncomeRepository'
import CategoryRespository from '../../../data/repository/categoryRepository/CategoryRepository'
import ExpenseRepository from '../../../data/repository/expenseRepository/ExpenseRepository'
import CopyMonthUseCase from '../../../domain/useCases/CopyMonthUseCase'
import PasteMonthUseCase from '../../../domain/useCases/PasteMonthUseCase'
import DeleteMothUseCase from '../../../domain/useCases/DeleteMonthUseCase'
import BudgetExpenseUnitOfWork from '../../../data/unitOfWork/BudgetExpenseUnitOfWork'


// ------------------- google sign in ------------------- //


// ------------------- google sign in ------------------- //


// ------------------- repositories ------------------- //
const incomeRepository = new IncomeRepository()
const expenseRepository = new ExpenseRepository()
const budgetRepository = new BudgetRepository()
const categoryRepository = new CategoryRespository()
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
    expenseRepository
)

const deleteMonthUseCase = new DeleteMothUseCase(
    incomeRepository,
    budgetRepository,
    expenseRepository
)



// ------------------- Home Screen ------------------- //
const HomeScreen = ({ navigation, route }: HomeScreenProps) => {


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
        deleteMonthUseCase
    })


    const {
        bottomSheetState,
        showBottomSheet,
        totalremaining,
        hideToast,
        modalState,
        toastState
    } = homeViewModel


    return (

        <SafeAreaView>
            <View style={DefaultStyles.screen}>

                <HomeHeader
                    name='Hola Casita'
                    total={totalremaining}
                />

                <Spacer marginVertical={"4%"} />

                <CurrentDate
                    date={bottomSheetState.date}
                    showDate={showBottomSheet}
                />

                <Spacer marginVertical={"4%"} />

                <MenuListButton
                    buttonArray={homeViewModel.buttonsHome}
                />

            </View>

            <BottomSheet
                visible={bottomSheetState.visible}
                date={bottomSheetState.date}
                onHide={homeViewModel.hideBottomSheet}
                onChange={homeViewModel.onChangeOperationDate}
                onConfirm={homeViewModel.confirmDate}
                onCopy={homeViewModel.onCopyMonth}
                onPaste={homeViewModel.onPasteMonth}
                onDelete={homeViewModel.onDeleteMonth}
            />

            <Toast
                message={toastState.message}
                visible={toastState.visible}
                type={toastState.type}
                hideToast={hideToast}
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

// lista de botones u opciones
const MenuListButton = ({ buttonArray }: { buttonArray: ButtonHomeProps[] }) => {
    return (
        <View>
            <FlatList
                data={buttonArray}
                renderItem={({ item }) => (
                    <View style={HomeStyles.buttonContainer}>
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
