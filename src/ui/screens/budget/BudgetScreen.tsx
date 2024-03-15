import { FlatList, View } from 'react-native'
import React from 'react'
import { DefaultStyles } from '../../constants/Styles'
import TextInputWithLabel from '../../components/textInputWithLabel/TextInputWithLabel'
import Spacer from '../../components/spacer/Spacer'
import { InputType } from '../../components/textInput/TextInputViewModel'
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


    return (

        <View style={DefaultStyles.screen}>

            <Label
                value={budgetViewModel.title.main}
                fontFamily={FontFamily.BLACK}
            />

            <Label value={budgetViewModel.title.used} />
            <Label value={budgetViewModel.title.available} />


            <ChipItem
                category={budgetViewModel.category}
                disabled={true}
                style={{ backgroundColor: budgetViewModel.category?.color, marginVertical: 20 }}
            />

            <FlatList
                data={budgetViewModel.expenseList}
                renderItem={({ item }) => <ExpenseItem {...item} />}
                showsVerticalScrollIndicator={false}
            />

            <ButtonAdd
                visible={true}
                backgroundColor={Colors.YELLOW}
                onPress={budgetViewModel.onPress}
            />

        </View>
    )
}

export default Budgets
