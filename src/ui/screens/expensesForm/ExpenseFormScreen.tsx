import { View } from 'react-native'
import React from 'react'
import Spacer from '../../components/spacer/Spacer'
import SubmitButton from '../../components/submitButton/SubmitButton'
import TextInputWithLabel from '../../components/textInputWithLabel/TextInputWithLabel'
import { InputType } from '../../components/textInput/TextInputViewModel'
import { Colors } from '../../constants/Colors'
import ChipList from '../../components/chipList/ChipList'
import useExpenseFormViewModel from './ExpenseFormViewModel'
import { ExpensesCreateScreenProps } from '../../../navigation/NavigationParamList'
import CreateExpenseUseCase from '../../../domain/useCases/CreateExpenseUseCase'
import ExpenseRepository from '../../../data/repository/expenseRepository/ExpenseRepository'
import ChipItem from '../../components/chipItem/ChipItem'
import Screen from '../../components/screen/Screen'


const expenseRepository = new ExpenseRepository()

const createExpenseUseCase = new CreateExpenseUseCase(expenseRepository)


const ExpenseForm = ({ navigation, route }: ExpensesCreateScreenProps) => {

  const expensesCreateViewModel = useExpenseFormViewModel({
    navigation,
    route,
    createExpenseUseCase
  })


  const {
    expenseName,
    expenseAmount,
    categoryId
  } = expensesCreateViewModel.expenseState

  return (

    <Screen>

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

        {
          expensesCreateViewModel.showChipItem ?
            <ChipItem
              disabled={true}
              category={expensesCreateViewModel.chipItemProps?.category}
              style={expensesCreateViewModel.chipItemProps?.style}
            />

            :

            <ChipList
              idSelected={categoryId}
              onPress={expensesCreateViewModel.updateCategory}
              categories={expensesCreateViewModel.categories}
            />
        }


      </View>

      <Spacer marginVertical={"8%"} />


      <SubmitButton
        backgroundColor={Colors.YELLOW}
        onPress={expensesCreateViewModel.saveExpense}
      />

    </Screen>

  )
}

export default ExpenseForm
