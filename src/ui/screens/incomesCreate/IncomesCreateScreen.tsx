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



const IncomesCreateScreen = ({ navigation, route }: IncomesCreateScreenProps) => {

  const incomesCreateViewModel = useIncomeCreateViewModel({ navigation, route })

  return (

    <SafeAreaView >

      <View style={{
        ...DefaultStyles.SCREEN,
        justifyContent: 'space-between'
      }}>

        <View>
          <TextInputWithLabel
            title="Nombre nuevo ingreso:"
            placeholder="Sueldo"
          />

          <Spacer marginVertical={"4%"} />

          <TextInputWithLabel
            title="Monto:"
            placeholder="100.000"
          />
        </View>

        <Spacer marginVertical={"8%"} />


        <SubmitButton
          onPress={incomesCreateViewModel.saveNewIncome}
        />

      </View>
    </SafeAreaView>

  )

}




export default IncomesCreateScreen
