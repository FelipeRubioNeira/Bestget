import { SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { DefaultStyles } from '../../constants/Styles'
import Label from '../../components/Label'
import { FontFamily, FontSize } from '../../constants/Fonts'
import Spacer from '../../components/Spacer'
import { IncomesCreateScreenProps } from '../../navigation/NavigationTypes'
import { Colors } from '../../constants/Colors'
import TextInputApp from '../../components/textInput/TextInputApp'
import SubmitButton from '../../components/submitButton/SubmitButton'
import useIncomeCreateViewModel from './IncomesCreateViewModel'
import TextInputWithLabel from '../../components/textInputWithLabel/TextInputWithLabel'
import { IncomeDataSource } from '../../../data/repository/incomeRepository/IncomeDataSource'
import { IncomeRepository } from '../../../data/repository/incomeRepository/IncomeRepository'
import { CreateIncomeUseCase } from '../../../domain/useCases/CreateIncomeUseCase'


// dependency injection 
const incomeDataSource = new IncomeDataSource()
const incomeRepository = new IncomeRepository(incomeDataSource)
const createIncomeUseCase = new CreateIncomeUseCase(incomeRepository)


const IncomesCreateScreen = ({ navigation, route }: IncomesCreateScreenProps) => {


  const incomesCreateViewModel = useIncomeCreateViewModel({
    navigation,
    route,
    createIncomeUseCase
  })

  return (

    <SafeAreaView >

      <View style={{
        ...DefaultStyles.SCREEN,
        justifyContent: 'space-between'
      }}>

        <View>
          <TextInputWithLabel
            value={incomesCreateViewModel.incomeName}
            onChangeText={incomesCreateViewModel.updateIncomeName}
            title="Nombre nuevo ingreso:"
            placeholder="Sueldo"
          />

          <Spacer marginVertical={"4%"} />

          <TextInputWithLabel
            value={incomesCreateViewModel.incomeAmount}
            onChangeText={incomesCreateViewModel.updateIncomeAmount}
            title="Monto:"
            placeholder="100.000"
          />
        </View>

        <Spacer marginVertical={"8%"} />


        <SubmitButton
          onPress={incomesCreateViewModel.createIncome}
        />

      </View>
    </SafeAreaView>

  )

}




export default IncomesCreateScreen
