import { FlatList, View } from 'react-native'
import React from 'react'
import { DefaultStyles } from '../../constants/Styles'
import ChipItem from '../../components/chipItem/ChipItem'
import ButtonAdd from '../../components/buttonAdd/ButtonAdd'
import { Colors } from '../../constants/Colors'
import { BudgetsScreenProps } from '../../../navigation/NavigationParamList'
import useBudgetViewModel from './BudgetViewModel'
import Label from '../../components/label/Label'
import { FontFamily } from '../../constants/Fonts'
import ExpenseRepository from '../../../data/repository/expenseRepository/ExpenseRepository'
import ExpenseItem from '../../components/expenseItem/ExpenseItem'

const expensesRepository = new ExpenseRepository()


const Budgets = ({ navigation, route }: BudgetsScreenProps) => {


    const budgetViewModel = useBudgetViewModel({
        navigation,
        route,
        expensesRepository
    })

    // ----------- atributes ----------- //
    const {
        title,
        category,
        expenseList,
        editMode,
    } = budgetViewModel

    // ----------- events ----------- //
    const {
        onPressNewExpense
    } = budgetViewModel


    return (

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
                    onDelete={() => { }}
                    onEdit={() => { }}
                />}
                showsVerticalScrollIndicator={false}
            />

            <ButtonAdd
                visible={true}
                backgroundColor={Colors.YELLOW}
                onPress={onPressNewExpense}
            />

        </View>
    )
}

export default Budgets
