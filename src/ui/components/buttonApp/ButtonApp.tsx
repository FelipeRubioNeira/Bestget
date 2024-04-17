import { StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react'
import { Styles } from '../../styles/Styles'
import { Colors } from '../../constants/Colors'
import Label from '../label/Label'
import { FontFamily } from '../../constants/Fonts'

type ButtonProps = {
    title: string,
    onPress?: () => void,
    labelStyle?: TextStyle,
    buttonStyle?: ViewStyle
}

const ButtonApp = ({ title, onPress, labelStyle, buttonStyle }: ButtonProps) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                ...buttonAppStyle.button,
                ...buttonStyle
            }}
        >
            <Label
                value={title}
                style={{
                    fontFamily: FontFamily.BOLD,
                    ...labelStyle
                }}

            />
        </TouchableOpacity>
    )
}

export default ButtonApp

const buttonAppStyle = StyleSheet.create({
    button: {
        width: "100%",
        backgroundColor: Colors.GRAY,
        height: Styles.BUTTON_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Styles.BORDER_RADIUS
    }
})