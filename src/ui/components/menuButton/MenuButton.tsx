import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Styles } from '../../styles/Styles'
import { Colors } from '../../constants/Colors'
import Label from '../label/Label'
import { FontFamily, FontSize } from '../../constants/Fonts'

interface IMenuButtonProps {
    title: string,
    subTitle?: string,
    onPress?: () => void,
    backgroundColor?: string,
    titleColor?: string,
}

const MenuButton = ({
    title = "",
    subTitle = "",
    onPress = () => { },
    backgroundColor = Colors.GRAY,
    titleColor = Colors.WHITE
}: IMenuButtonProps) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                ...MenuButtonStyle.menuButton,
                backgroundColor: backgroundColor
            }}
        >
            <Label
                value={title}
                fontFamily={FontFamily.BOLD}
                fontSize={FontSize.SMALL}
                color={titleColor}
            />

            {
                subTitle &&
                <Label
                    value={subTitle}
                    fontFamily={FontFamily.BOLD}
                    fontSize={FontSize.SMALL}
                    color={titleColor}
                />
            }


        </TouchableOpacity>
    )
}

export default MenuButton

const MenuButtonStyle = StyleSheet.create({

    menuButton: {
        padding: 10,
        backgroundColor: Colors.GRAY,
        borderRadius: Styles.BORDER_RADIUS,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    }

})