import { SafeAreaView, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
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
import { IncomesScreenProps } from '../../navigation/NavigationParamList'
import useIncomeViewModel, { IncomeFormatted } from './IncomesViewModel'
import { IncomeRepository } from '../../../data/repository/incomeRepository/IncomeRepository'
import { GetAllIncomesUseCase } from '../../../domain/useCases/GetAllIncomesUseCase'

const incomeRepository = new IncomeRepository()
const getAllIncomesUseCase = new GetAllIncomesUseCase(incomeRepository)


const IncomesScreen = ({ navigation, route }: IncomesScreenProps) => {


  const incomeViewModel = useIncomeViewModel({
    navigation,
    route,
    getAllIncomesUseCase
  })


  return (
    <View style={DefaultStyles.SCREEN}>

      <HelpText
        value={Strings.incomes}
        fontSize={FontSize.XSMALL}
        color={Colors.DARK_GRAY}
      />

      <TotalAmount
        label="Ingreso"
        amount={incomeViewModel?.totalAmount}
        color={Colors.GREEN}
      />

      <Spacer marginVertical={"4%"} />

      <FlatList
        data={incomeViewModel?.incomesList}
        renderItem={({ item }) => <IncomeItem {...item} />}
      />

      <Spacer marginVertical={"4%"} />

      <ButtonAdd
        onPress={incomeViewModel?.navigateIncomeCreate}
        backgroundColor={Colors.GREEN}
      />

    </View>
  )
}

const IncomeItem = ({ name, amount }: IncomeFormatted) => {

  return (
    <TouchableOpacity style={incomesScreenStyle.incomeItem}>

      <Label
        value={name}
        fontSize={FontSize.SMALL}
        fontFamily={FontFamily.REGULAR}
      />

      <Label
        value={amount.toString()}
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
