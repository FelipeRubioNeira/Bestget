import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { FontFamily, FontSize } from '../constants/Fonts'
import { Colors } from '../constants/Colors'
import { ILabel } from './IProps'




const Label = ({
    value,
    fontSize = FontSize.MEDIUM,
    fontFamily = FontFamily.REGULAR,
    color = Colors.BLACK
}: ILabel) => {

    return (

        <Text style={{
            ...titleStyles.titleDefault,
            fontSize: fontSize,
            fontFamily: fontFamily,
            color: color
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