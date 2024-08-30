import { ImageSourcePropType, ImageStyle, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Styles } from '../../styles/Styles'
import { Colors } from '../../constants/Colors'
import Label from '../label/Label'
import { FontFamily, FontSize } from '../../constants/Fonts'
import TouchableIcon from '../touchableIcon/TouchableIcon'


interface IMenuButtonProps {
    title: string,
    titleColor?: string,
    subTitle?: string,
    subtitleColor?: string,
    subtitleFontSize?: number,
    onPress?: () => void,
    backgroundColor?: string,
    comingSoon?: boolean,
    icon?: ImageSourcePropType | null,
    iconColor?: string
}

const MenuButton = ({
    title = "",
    titleColor = Colors.BLACK,
    subTitle = "",
    subtitleColor = Colors.BLACK,
    subtitleFontSize = FontSize.SMALL,
    onPress = () => { },
    backgroundColor = Colors.GRAY,
    comingSoon = false,
    icon = null,
    iconColor = Colors.BLACK
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
                    style={{
                        ...MenuButtonStyle.subtitle,
                        color: subtitleColor,
                        fontSize: subtitleFontSize
                    }}
                />
            }

            {
                icon &&
                <TouchableIcon
                    image={icon}
                    color={iconColor}
                    disabled={true}
                    style={{ marginVertical: "4%" }}
                />

            }


            {
                comingSoon &&
                <SoonLabel value='Pronto' />
            }


        </TouchableOpacity>
    )
}

const SoonLabel = ({ value }: { value: string }) => {
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
        padding: 16,
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