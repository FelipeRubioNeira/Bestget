import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Styles } from '../../styles/Styles'
import { Colors } from '../../constants/Colors'
import Label from '../label/Label'
import { FontFamily, FontSize } from '../../constants/Fonts'


interface IMenuButtonProps {
    title: string,
    titleColor?: string,
    subTitle?: string,
    onPress?: () => void,
    backgroundColor?: string,
    comingSoon?: boolean
}

const MenuButton = ({
    title = "",
    titleColor = Colors.BLACK,
    subTitle = "",
    onPress = () => { },
    backgroundColor = Colors.GRAY,
    comingSoon = false
}: IMenuButtonProps) => {

    return (
        <TouchableOpacity
            disabled={comingSoon}
            onPress={onPress}
            style={{
                ...MenuButtonStyle.menuButton,
                backgroundColor: backgroundColor
            }}
        >
            <Label
                value={title}
                style={{
                    ...MenuButtonStyle.title,
                    color: titleColor
                }}
            />

            {
                subTitle &&
                <Label
                    value={subTitle}
                    style={MenuButtonStyle.subtitle}
                />
            }

            {
                comingSoon &&
                <SoonLabel value='Pronto' />
            }


        </TouchableOpacity>
    )
}

const SoonLabel = ({value}:{value:string}) => {
    return (
        <View style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: Colors.CHIP_LUXURIES,
            padding: 5,
            borderRadius: 5,
        }}>
            <Label
                value={value}
                fontSize={FontSize.XXSMALL}
                fontFamily={FontFamily.BOLD}
            />
        </View>
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
    },

    title: {
        fontFamily: FontFamily.BOLD,
        fontSize: FontSize.SMALL,
        color: Colors.BLACK,
        textAlign: "center"
    },
    subtitle: {
        fontFamily: FontFamily.BOLD,
        fontSize: FontSize.SMALL,
        color: Colors.BLACK,
        textAlign: "center"
    }

})