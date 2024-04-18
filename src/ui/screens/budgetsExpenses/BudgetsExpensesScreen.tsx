import { FlatList, View } from 'react-native'
import React from 'react'
import DefaultStyles from '../../styles/DefaultStyles'
import HelpText from '../../components/helpText/Help'
import { Strings } from '../../constants/Strings'
import { FontSize } from '../../constants/Fonts'
import { Colors } from '../../constants/Colors'
import TotalAmount from '../../components/totalAmount/TotalAmount'
import { BudgetsExpensesScreenProps } from '../../../navigation/NavigationParamList'
import ButtonAdd from '../../components/buttonAdd/ButtonAdd'
import ExpenseRepository from '../../../data/repository/expenseRepository/ExpenseRepository'
import Loading from '../../components/loading/Loading'
import BudgetRepository from '../../../data/repository/budgetRepository/BudgetRepository'
import useBudgetExpensesViewModel from './BudgetsExpensesViewModel'
import ExpenseItem from '../../components/expenseItem/ExpenseItem'
import BudgetItem from '../../components/budgetItem/BudgetItem'
import { BudgetUI } from '../../../data/types/Budget'
import { ExpenseUI } from '../../../data/types/Expense'
import ExpenseOptions from '../../components/expenseOptions/ExpenseOptions'
import Modal from '../../components/modal/Modal'
import DeleteBudgetUseCase from '../../../domain/useCases/DeleteBudgetUseCase'
import DeleteExpenseUseCase from '../../../domain/useCases/DeleteExpenseUseCase'



const budgetRepository = new BudgetRepository()
const expenseRepository = new ExpenseRepository()

const deleteExpenseUseCase = new DeleteExpenseUseCase(expenseRepository)

const deleteBudgetUseCase = new DeleteBudgetUseCase(
    budgetRepository,
    expenseRepository
)



const BudgetsExpensesScreen = ({ navigation, route }: BudgetsExpensesScreenProps) => {


    // ------------------- view model ------------------- //
    const budgetsExpensesViewModel = useBudgetExpensesViewModel({
        navigation,
        route,
        expenseRepository,
        budgetRepository,
        deleteBudgetUseCase,
        deleteExpenseUseCase,
    })

    // state view model //
    const {
        editMode,
        onPressItem,
        onPressEdit,
        onPressDelete,
        totalAmount = "0",
        budgetsExpenses,
        buttonAddVisible,
        onShowExpenseOptions,
        ExpenseOptionsVisible,
        onAddExpense,
        onAddBudget,
        onHideExpenseOptions,
        loading,
        modalState,
    } = budgetsExpensesViewModel


    // ------------------- UI ------------------- //
    const renderBugdetOrExpense = (item: BudgetUI | ExpenseUI) => {

        // render budget 
        if (item.type === "Budget") {
            return (
                <BudgetItem
                    {...item}
                    editMode={editMode}
                    onPress={() => onPressItem(item.id, "Budget")}
                    onEdit={() => onPressEdit(item.id, "Budget")}
                    onDelete={() => onPressDelete(item.id, "Budget")}
                />
            )

        }
        // render expense
        else return <ExpenseItem
            {...item}
            editMode={editMode}
            onEdit={() => onPressEdit(item.id, "Expense")}
            onDelete={() => onPressDelete(item.id, "Expense")}
        />

    }

    return (
        <>
            <View style={DefaultStyles.screen}>


                <HelpText
                    value={Strings.expenses}
                    fontSize={FontSize.XSMALL}
                    color={Colors.DARK_GRAY}
                />

                <TotalAmount
                    label="Gasto total"
                    amount={totalAmount}
                    color={Colors.YELLOW}
                />

                <FlatList
                    data={budgetsExpenses}
                    renderItem={({ item }) => renderBugdetOrExpense(item)}
                    showsVerticalScrollIndicator={false}
                />

                <ButtonAdd
                    visible={buttonAddVisible}
                    backgroundColor={Colors.YELLOW}
                    onPress={onShowExpenseOptions}
                />

            </View>


            <ExpenseOptions
                visible={ExpenseOptionsVisible}
                onPressOutcome={onAddExpense}
                onPressBudget={onAddBudget}
                onHideOptions={onHideExpenseOptions}
            />


            <Loading visible={loading} />

            <Modal
                visible={modalState.visible}
                title={modalState.title}
                message={modalState.message}
                buttonList={modalState.buttonList}
            />

        </>

    )
}


export default BudgetsExpensesScreen
