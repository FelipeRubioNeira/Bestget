import { StyleSheet, Text, TextStyle, ViewStyle } from 'react-native'
import React from 'react'
import { FontFamily, FontSize } from '../../constants/Fonts'
import { Colors } from '../../constants/Colors'

export interface ILabel {
    value: string | undefined
    fontSize?: number
    fontFamily?: string
    color?: string,
    style?: TextStyle
}


const Label = ({
    value = "",
    fontSize = FontSize.MEDIUM,
    fontFamily = FontFamily.REGULAR,
    color = Colors.BLACK,
    style,
}: ILabel) => {

    return (

        <Text
            style={{
                ...titleStyles.titleDefault,
                fontSize: fontSize,
                fontFamily: fontFamily,
                color: color,
                ...style
            }} >
            {value}
        </Text>
    )
}

export default Label

const titleStyles = StyleSheet.create({

    titleDefault: {
        fontSize: FontSize.SMALL,
        color: Colors.BLACK,
        fontFamily: FontFamily.BLACK,
    }
})