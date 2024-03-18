import { FlatList, View } from 'react-native'
import React from 'react'
import { DefaultStyles } from '../../constants/Styles'
import HelpText from '../../components/helpText/Help'
import { Strings } from '../../constants/Strings'
import { FontFamily, FontSize } from '../../constants/Fonts'
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
import DeleteBudgetUseCase from '../../../domain/useCases/budgets/DeleteBudgetUseCase'



const budgetRepository = new BudgetRepository()
const expenseRepository = new ExpenseRepository()

const deleteBudgetUseCase = new DeleteBudgetUseCase(
    budgetRepository,
    expenseRepository
)



const BudgetsExpensesScreen = ({ navigation, route }: BudgetsExpensesScreenProps) => {


    const budgetsExpensesViewModel = useBudgetExpensesViewModel({
        navigation,
        route,
        expenseRepository,
        budgetRepository,
        deleteBudgetUseCase,
    })

    const renderBugdetOrExpense = (item: BudgetUI | ExpenseUI) => {

        // render budget 
        if (item.type === "Budget") {
            return (
                <BudgetItem
                    {...item}
                    editMode={budgetsExpensesViewModel.editMode}
                    onPress={() => budgetsExpensesViewModel.onPressItem(item.id, "Budget")}
                    onEdit={()=>budgetsExpensesViewModel.onPressEdit(item.id, "Budget")}
                    onDelete={() => budgetsExpensesViewModel.onPressDelete(item.id, "Budget")}
                />
            )

        }
        // render expense
        else return <ExpenseItem
            {...item}
            editMode={budgetsExpensesViewModel.editMode}
            onEdit={()=>budgetsExpensesViewModel.onPressEdit(item.id, "Expense")}
            onDelete={() => budgetsExpensesViewModel.onPressDelete(item.id, "Expense")}
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
                    label="Gasto"
                    amount={budgetsExpensesViewModel?.totalAmount}
                    color={Colors.YELLOW}
                />

                <FlatList
                    data={budgetsExpensesViewModel.budgetsExpenses}
                    renderItem={({ item }) => renderBugdetOrExpense(item)}
                    showsVerticalScrollIndicator={false}
                />

                <ButtonAdd
                    visible={budgetsExpensesViewModel.buttonAddVisible}
                    backgroundColor={Colors.YELLOW}
                    onPress={budgetsExpensesViewModel.onShowExpenseOptions}
                />

            </View>


            <ExpenseOptions
                visible={budgetsExpensesViewModel.ExpenseOptionsVisible}
                onPressOutcome={budgetsExpensesViewModel.onAddExpense}
                onPressBudget={budgetsExpensesViewModel.onAddBudget}
                onHideOptions={budgetsExpensesViewModel.onHideExpenseOptions}
            />


            <Loading visible={budgetsExpensesViewModel.loading} />

            <Modal
                visible={budgetsExpensesViewModel.modalState.visible}
                title={budgetsExpensesViewModel.modalState.title}
                message={budgetsExpensesViewModel.modalState.message}
                buttonList={[
                    {
                        text: 'Aceptar',
                        onPress: budgetsExpensesViewModel.deleteItem,
                    },
                    {
                        text: 'Cancelar',
                        onPress: budgetsExpensesViewModel.hideAlert,
                        style: { color: Colors.BLUE, fontFamily: FontFamily.BOLD }
                    }
                ]}
            />

        </>

    )
}


export default BudgetsExpensesScreen
