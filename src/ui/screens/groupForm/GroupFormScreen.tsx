import { View } from 'react-native'
import React from 'react'
import Label from '../../components/label/Label'
import { GroupFormScreenProps } from '../../../navigation/NavigationParamList'
import TextInputWithLabel from '../../components/textInputWithLabel/TextInputWithLabel'
import { FontFamily, FontSize } from '../../constants/Fonts'
import Spacer from '../../components/spacer/Spacer'
import SubmitButton from '../../components/submitButton/SubmitButton'
import { Colors } from '../../constants/Colors'
import Screen from '../../components/screen/Screen'
import useGroupFormViewModel from './GroupFormViewModel'
import Modal from '../../components/modal/Modal'
import GroupRepository from '../../../data/repository/groupRepository/GroupRepository'
import CreateGroupUseCase from '../../../domain/useCases/CreateGroupUseCase'


const groupRepository = new GroupRepository()
const createGroupUseCase = new CreateGroupUseCase(groupRepository)


const GroupFormScreen = ({
  navigation,
  route,
}: GroupFormScreenProps) => {

  // ------------------- viewModel ------------------- //
  const {
    groupState,
    changeNameGroup,
    modalState,
    onPressCreateGroup
  } = useGroupFormViewModel({
    navigation,
    route,
    createGroupUseCase
  })


  // ------------------- render ------------------- //
  return (

    <Screen>

      <View>

        <Label
          value='Escribe un nombre de grupo que sea descriptivo.'
          style={{
            fontFamily: FontFamily.REGULAR,
            fontSize: FontSize.XSMALL,
            color: Colors.DARK_GRAY
          }}
        />

        <Spacer marginVertical={"2%"} />

        <TextInputWithLabel
          value={groupState.groupName}
          onChangeText={changeNameGroup}
          title="Nombre del grupo:"
          placeholder="Grupo familiar"
        />

        <Spacer marginVertical={"4%"} />

      </View>

      <SubmitButton
        onPress={onPressCreateGroup}
        backgroundColor={Colors.CHIP_LUXURIES}
      />

      <Modal
        visible={modalState.visible}
        title={modalState.title}
        message={modalState.message}
        buttonList={[
          {
            text: "Cerrar",
            onPress: () => { }
          }
        ]}
      />

    </Screen>
  )
}

export default GroupFormScreen
