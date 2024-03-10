import { StyleSheet, View } from 'react-native'
import React from 'react'
import { DefaultStyles } from '../../constants/Styles'
import Spacer from '../../components/Spacer'
import SubmitButton from '../../components/submitButton/SubmitButton'
import TextInputWithLabel from '../../components/textInputWithLabel/TextInputWithLabel'
import { InputType } from '../../components/textInput/TextInputViewModel'
import { Colors } from '../../constants/Colors'
import Chips from '../../components/chipList/ChipList'
import useExpensesCreateViewModel from './ExpensesCreateViewModel'
import { ExpensesCreateScreenProps } from '../../navigation/NavigationParamList'


const ExpensesCreate = ({ navigation, route}: ExpensesCreateScreenProps) => {

  const expensesCreateViewModel = useExpensesCreateViewModel({
    navigation,
    route,
  })


  const {
    expenseName,
    expenseAmount,
    expenseLabel,
  } = expensesCreateViewModel.expenseCreateState

  return (

    <View style={{
      ...DefaultStyles.SCREEN,
      justifyContent: 'space-between'
    }}>

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

        <Chips
          categories = {expensesCreateViewModel.categories}
        />

      </View>

      <Spacer marginVertical={"8%"} />


      <SubmitButton
        backgroundColor={Colors.YELLOW}
        onPress={() => { }}
      />

    </View>

  )
}

export default ExpensesCreate

const styles = StyleSheet.create({})