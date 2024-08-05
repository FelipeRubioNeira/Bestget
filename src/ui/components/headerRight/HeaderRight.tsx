import { Keyboard, View } from 'react-native'
import React from 'react'
import TouchableIcon from '../touchableIcon/TouchableIcon'
import Icons from '../../../assets/icons'
import Spacer from '../spacer/Spacer'

type HeaderRightProps = {
    onPressQuestion: () => void,
    onPressEdit: () => void,
    editIconVisible?: boolean
}

const HeaderRight = ({ onPressQuestion, onPressEdit, editIconVisible }: HeaderRightProps) => {

    const hideKeyboard = () => {
        Keyboard.dismiss()
    }

    return (
        <View style={{ flexDirection: "row" }}>

            <TouchableIcon
                image={Icons.question}
                onPress={() => {
                    onPressQuestion()
                    hideKeyboard()
                }}
            />

            {editIconVisible &&
                <>
                    <Spacer marginHorizontal={4} />
                    <TouchableIcon
                        image={Icons.edit}
                        onPress={() => {
                            onPressEdit()
                            hideKeyboard()
                        }}
                    />
                </>
            }
        </View>
    )
}

export default HeaderRight

