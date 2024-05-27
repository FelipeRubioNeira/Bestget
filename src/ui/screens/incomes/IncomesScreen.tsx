import { View, FlatList } from 'react-native'
import React from 'react'
import DefaultStyles from '../../styles/DefaultStyles'
import Label from '../../components/label/Label'
import { Colors } from '../../constants/Colors'
import { Strings } from '../../constants/Strings'
import { FontFamily, FontSize } from '../../constants/Fonts'
import Spacer from '../../components/spacer/Spacer'
import TotalAmount from '../../components/totalAmount/TotalAmount'
import ButtonAdd from '../../components/buttonAdd/ButtonAdd'
import HelpText from '../../components/helpText/Help'
import { IncomesScreenProps } from '../../../navigation/NavigationParamList'
import useIncomeViewModel from './IncomesViewModel'
import IncomeRepository from '../../../data/repository/incomeRepository/IncomeRepository'
import { IncomeUI } from '../../../data/types/Income'
import Modal from '../../components/modal/Modal'
import EditionIcons from '../../components/editionIcons/EditionIcons'
import DeleteIncomeUseCase from '../../../domain/useCases/DeleteIncomeUseCase'



const incomesRepository = new IncomeRepository()
const deleteIncomeUseCase = new DeleteIncomeUseCase(incomesRepository)


const IncomesScreen = ({ navigation, route }: IncomesScreenProps) => {


  // ------------------- view model ------------------- //
  const incomeViewModel = useIncomeViewModel({
    navigation,
    route,
    // repositories
    incomesRepository,

    // useCases
    deleteIncomeUseCase,
  })

  // view Model //
  const {
    totalAmount = "0",
    allIncomes = [],
    editMode,

    onPressEdit,
    onPressDelete,
    navigateIncomeCreate,

    modalState,

  } = incomeViewModel




  // ------------------- UI ------------------- //
  return (
    <View style={DefaultStyles.screen}>

      <HelpText
        value={Strings.incomes}
        fontSize={FontSize.XSMALL}
        color={Colors.DARK_GRAY}
      />

      <TotalAmount
        label="Ingreso"
        amount={totalAmount}
        color={Colors.GREEN}
      />

      <Spacer marginVertical={"4%"} />

      <FlatList
        data={allIncomes}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <IncomeItem
          {...item}
          editMode={editMode}
          onEdit={() => onPressEdit(item.id)}
          onDelete={() => onPressDelete(item.id)}
        />}
      />

      <Spacer marginVertical={"4%"} />

      <ButtonAdd
        onPress={navigateIncomeCreate}
        backgroundColor={Colors.GREEN}
      />

      <Modal
        visible={modalState.visible}
        title={modalState.title}
        message={modalState.message}
        buttonList={modalState.buttonList}
      />

    </View>
  )
}

const IncomeItem = ({ name, amount, editMode, onEdit, onDelete }: IncomeUI) => {

  return (

    <View
      style={DefaultStyles.listItemContainer}
    >

      <Label
        value={name}
        fontSize={FontSize.SMALL}
        fontFamily={FontFamily.REGULAR}
      />

      {
        editMode ?
          <EditionIcons
            onEdit={onEdit}
            onDelete={onDelete}
          />
          :
          <Label
            value={amount}
            fontSize={FontSize.SMALL}
            fontFamily={FontFamily.REGULAR}
          />
      }

    </View>
  )
}

export default IncomesScreen

