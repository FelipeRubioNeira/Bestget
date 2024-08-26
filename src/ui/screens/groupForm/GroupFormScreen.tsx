import { View } from 'react-native'
import React from 'react'
import Label from '../../components/label/Label'
import { GroupFormScreenProps } from '../../../navigation/NavigationParamList'
import DefaultStyles from '../../styles/DefaultStyles'
import TextInputWithLabel from '../../components/textInputWithLabel/TextInputWithLabel'
import { FontFamily } from '../../constants/Fonts'
import Spacer from '../../components/spacer/Spacer'
import SubmitButton from '../../components/submitButton/SubmitButton'
import { Colors } from '../../constants/Colors'
import Screen from '../../components/screen/Screen'
import useGroupFormViewModel from './GroupFormViewModel'
import Modal from '../../components/modal/Modal'


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
  })


  // ------------------- render ------------------- //
  return (

    <Screen>

      <View>

        <Label
          value='Crear grupo'
          style={{
            fontFamily: FontFamily.BLACK,
          }}
        />

        <Spacer marginVertical={"4%"} />

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
            onPress: ()=>{}
          }
        ]}
      />

    </Screen>
  )
}

export default GroupFormScreen
