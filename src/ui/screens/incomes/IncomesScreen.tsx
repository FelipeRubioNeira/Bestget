import { SafeAreaView, View, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { DefaultStyles, Styles } from '../../constants/Styles'
import Label from '../../components/Label'
import { Colors } from '../../constants/Colors'
import { Strings } from './Strings'
import { FontFamily, FontSize } from '../../constants/Fonts'
import Spacer from '../../components/Spacer'
import TotalAmount from '../../components/totalAmount/TotalAmount'
import ButtonAdd from '../../components/buttonAdd/ButtonAdd'
import HelpText from '../../components/helpText/Help'
import { IncomesScreenProps } from '../../navigation/NavigationTypes'
import useIncomeViewModel from './IncomeViewModel'



const IncomesScreen = ({ navigation, route }: IncomesScreenProps,
) => {

  const incomeViewModel = useIncomeViewModel({ navigation, route })


  return (

    <SafeAreaView>

      <View style={DefaultStyles.SCREEN}>

        <HelpText
          value={Strings.incomes}
          fontSize={FontSize.XSMALL}
          color={Colors.DARK_GRAY}
        />

        <TotalAmount
          label="Ingreso"
          amount="1.500.000"
        />

        <Spacer marginVertical={"4%"} />

        <IncomeItem />

        <Spacer marginVertical={"4%"} />


        <ButtonAdd
          onPress={incomeViewModel?.navigateIncomeCreate}
          backgroundColor={Colors.GREEN}
        />

      </View>
    </SafeAreaView>

  )
}

const IncomeItem = () => {

  return (
    <TouchableOpacity style={incomesScreenStyle.incomeItem}>

      <Label
        value="Sueldo Felipe"
        fontSize={FontSize.SMALL}
        fontFamily={FontFamily.REGULAR}
      />

      <Label
        value="$1.500.000"
        fontSize={FontSize.SMALL}
        fontFamily={FontFamily.REGULAR}
      />

    </TouchableOpacity>
  )
}

export default IncomesScreen

const incomesScreenStyle = StyleSheet.create({

  incomeItem: {
    width: "100%",
    height: 60,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    borderColor: Colors.GRAY,
    borderRadius: Styles.BORDER_RADIUS,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }

})
