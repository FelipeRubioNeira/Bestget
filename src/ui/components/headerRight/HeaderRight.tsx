import { View } from 'react-native'
import React from 'react'
import TouchableIcon from '../touchableIcon/TouchableIcon'
import Icons from '../../../assets/icons'
import Spacer from '../spacer/Spacer'

type HeaderRightProps = {
    onPressQuestion: () => void,
    onPressEdit: () => void,
}

const HeaderRight = ({ onPressQuestion, onPressEdit }: HeaderRightProps) => {

    return (
        <View style={{ flexDirection: "row" }}>

            <TouchableIcon
                image={Icons.question}
                onPress={onPressQuestion}
            />

            <Spacer marginHorizontal={4} />

            <TouchableIcon
                image={Icons.edit}
                onPress={onPressEdit}
            />
        </View>
    )
}

export default HeaderRight

