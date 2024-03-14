import { View } from 'react-native'
import React from 'react'
import { DefaultStyles } from '../../constants/Styles'
import Spacer from '../../components/spacer/Spacer'
import SubmitButton from '../../components/submitButton/SubmitButton'
import TextInputWithLabel from '../../components/textInputWithLabel/TextInputWithLabel'
import { InputType } from '../../components/textInput/TextInputViewModel'
import { Colors } from '../../constants/Colors'
import ChipList from '../../components/chipList/ChipList'
import useExpensesCreateViewModel from './ExpensesCreateViewModel'
import { ExpensesCreateScreenProps } from '../../../navigation/NavigationParamList'
import CreateExpenseUseCase from '../../../domain/useCases/CreateExpenseUseCase'
import ExpenseRepository from '../../../data/repository/expenseRepository/ExpenseRepository'
import BudgetExpenseRepository from '../../../data/repository/budgetExpenseRepository/BudgetExpenseRepository'

const budgetExpenseRepository = new BudgetExpenseRepository()
const expenseRepository = new ExpenseRepository()

const createExpenseUseCase = new CreateExpenseUseCase(
  expenseRepository,
  budgetExpenseRepository
)


const ExpensesCreate = ({ navigation, route }: ExpensesCreateScreenProps) => {

  const expensesCreateViewModel = useExpensesCreateViewModel({
    navigation,
    route,
    createExpenseUseCase
  })


  const {
    expenseName,
    expenseAmount,
  } = expensesCreateViewModel.expenseCreateState

  return (

    <View style={{ ...DefaultStyles.SCREEN, justifyContent: 'space-between' }}>

      <View>

        <TextInputWithLabel
          value={expenseName}
          onChangeText={expensesCreateViewModel.updateExpenseName}
          title="Nombre gasto:"
          placeholder="Salida con amigos"
        />

        <Spacer marginVertical={"4%"} />

        <TextInputWithLabel
          value={expenseAmount}
          onChangeText={expensesCreateViewModel.updateExpenseAmount}
          title="Monto:"
          placeholder="$45.000"
          inputMode={InputType.NUMERIC}
        />

        <ChipList
          onPress={expensesCreateViewModel.updateCategory}
          categories={expensesCreateViewModel.categories}
        />

      </View>

      <Spacer marginVertical={"8%"} />


      <SubmitButton
        backgroundColor={Colors.YELLOW}
        onPress={expensesCreateViewModel.saveExpense}
      />

    </View>

  )
}

export default ExpensesCreate
