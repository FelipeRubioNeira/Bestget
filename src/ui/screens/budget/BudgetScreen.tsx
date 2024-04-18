import { FlatList, View } from 'react-native'
import React from 'react'
import DefaultStyles from '../../styles/DefaultStyles'
import ChipItem from '../../components/chipItem/ChipItem'
import ButtonAdd from '../../components/buttonAdd/ButtonAdd'
import { Colors } from '../../constants/Colors'
import { BudgetsScreenProps } from '../../../navigation/NavigationParamList'
import useBudgetViewModel from './BudgetViewModel'
import Label from '../../components/label/Label'
import { FontFamily } from '../../constants/Fonts'
import ExpenseRepository from '../../../data/repository/expenseRepository/ExpenseRepository'
import ExpenseItem from '../../components/expenseItem/ExpenseItem'
import Modal from '../../components/modal/Modal'
import DeleteExpenseUseCase from '../../../domain/useCases/DeleteExpenseUseCase'


const expensesRepository = new ExpenseRepository()
const deleteExpenseUseCase = new DeleteExpenseUseCase(expensesRepository)


const Budgets = ({ navigation, route }: BudgetsScreenProps) => {


    const budgetViewModel = useBudgetViewModel({
        navigation,
        route,
        expensesRepository,
        deleteExpenseUseCase
    })

    // ----------- atributes ----------- //
    const {
        title,
        category,
        expenseList,
        editMode,
        modalState
    } = budgetViewModel

    // ----------- events ----------- //
    const {
        onPressNewExpense,
        onPressEdit,
        onPressDelete
    } = budgetViewModel


    return (

        <>

            <View style={DefaultStyles.screen}>

                <Label
                    value={title.main}
                    fontFamily={FontFamily.BLACK}
                />

                <Label value={title.used} />
                <Label value={title.available} />


                <ChipItem
                    category={category}
                    disabled={true}
                    style={{ backgroundColor: category?.color, marginVertical: 20 }}
                />

                <FlatList
                    data={expenseList}
                    renderItem={({ item }) => <ExpenseItem
                        {...item}
                        editMode={editMode}
                        category={category}
                        onEdit={() => onPressEdit(item.id)}
                        onDelete={() => onPressDelete(item.id)}
                    />}
                    showsVerticalScrollIndicator={false}
                />

                <ButtonAdd
                    visible={true}
                    backgroundColor={Colors.YELLOW}
                    onPress={onPressNewExpense}
                />

            </View>

            <Modal 
                visible = {modalState.visible}
                message={modalState.message}
                title={modalState.title}
                buttonList={modalState.buttonList}
            />

        </>
    )
}

export default Budgets
