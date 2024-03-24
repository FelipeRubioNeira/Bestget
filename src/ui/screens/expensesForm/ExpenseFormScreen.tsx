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
import EditExpenseUseCase from '../../../domain/useCases/EditExpenseUseCase'
import Modal from '../../components/modal/Modal'
import CalendarButton from '../../components/calendarButton/CalendarButton'
import Label from '../../components/label/Label'
import { FontFamily, FontSize } from '../../constants/Fonts'


const expenseRepository = new ExpenseRepository()

const createExpenseUseCase = new CreateExpenseUseCase(expenseRepository)
const editExpenseUseCase = new EditExpenseUseCase(expenseRepository)

const ExpenseForm = ({ navigation, route }: ExpensesCreateScreenProps) => {

  const expenseFormViewModel = useExpenseFormViewModel({
    navigation,
    route,
    createExpenseUseCase,
    editExpenseUseCase
  })


  const {
    modalState,
    expenseState,
    hasBudget,
    categories,
    updateExpenseName,
    updateExpenseAmount,
    updateCategory,
    updateExpenseDate,
    saveExpense,
    chipItemProps
  } = expenseFormViewModel

  return (

    <Screen>

      <View>

        <TextInputWithLabel
          value={expenseState.expenseName}
          onChangeText={updateExpenseName}
          title="Nombre gasto:"
          placeholder="Salida con amigos"
        />

        <Spacer marginVertical={"4%"} />

        <TextInputWithLabel
          value={expenseState.expenseAmount}
          onChangeText={updateExpenseAmount}
          title="Monto:"
          placeholder="$45.000"
          inputMode={InputType.NUMERIC}
        />

        <Spacer marginVertical={"4%"} />


        <Label value='Fecha:' fontSize={FontSize.SMALL}/>
        <CalendarButton
          value={expenseState.expenseDate}
          onDayPress={updateExpenseDate}
        />

        {
          hasBudget ?
            <ChipItem
              disabled={true}
              category={chipItemProps?.category}
              style={chipItemProps?.style}
            />

            :

            <ChipList
              idSelected={expenseState.categoryId}
              onPress={updateCategory}
              categories={categories}
            />
        }

      </View>

      <Spacer marginVertical={"8%"} />


      <SubmitButton
        backgroundColor={Colors.YELLOW}
        onPress={saveExpense}
      />

      <Modal
        visible={modalState.visible}
        title={modalState.title}
        message={modalState.message}
        buttonList={modalState.buttonList}
      />

    </Screen>

  )
}

export default ExpenseForm
