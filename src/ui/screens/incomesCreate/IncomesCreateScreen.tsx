import { SafeAreaView, View } from 'react-native'
import React from 'react'
import { DefaultStyles } from '../../constants/Styles'
import Spacer from '../../components/Spacer'
import { IncomesCreateScreenProps } from '../../navigation/NavigationParamList'
import SubmitButton from '../../components/submitButton/SubmitButton'
import useIncomeCreateViewModel from './IncomesCreateViewModel'
import TextInputWithLabel from '../../components/textInputWithLabel/TextInputWithLabel'
import { IncomeRepository } from '../../../data/repository/incomeRepository/IncomeRepository'
import { CreateIncomeUseCase } from '../../../domain/useCases/CreateIncomeUseCase'
import { InputType } from '../../components/textInput/TextInputViewModel'


// dependency injection 
const incomeDataSource = new IncomeRepository()
const createIncomeUseCase = new CreateIncomeUseCase(incomeDataSource)


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
            title="Nombre ingreso:"
            placeholder="Ingreso de trabajo"
          />

          <Spacer marginVertical={"4%"} />

          <TextInputWithLabel
            value={incomesCreateViewModel.incomeAmount}
            onChangeText={incomesCreateViewModel.updateIncomeAmount}
            title="Monto:"
            placeholder="$100.000"
            inputMode={InputType.NUMERIC}
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
