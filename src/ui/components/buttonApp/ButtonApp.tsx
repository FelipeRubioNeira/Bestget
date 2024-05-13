import { Image, ImageSourcePropType, ImageStyle, StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react'
import { Styles } from '../../styles/Styles'
import { Colors } from '../../constants/Colors'
import Label from '../label/Label'
import { FontFamily } from '../../constants/Fonts'
import Spacer from '../spacer/Spacer'


type ButtonProps = {
    title: string,
    onPress?: () => void,
    labelStyle?: TextStyle,
    buttonStyle?: ViewStyle,
    disabled?: boolean,
    image?: ImageSourcePropType
}

type ImageButtonAppProps = {
    image: ImageSourcePropType,
    style?: ImageStyle
}

const ButtonApp = ({
    title,
    onPress,
    labelStyle,
    buttonStyle,
    disabled = false,
    image,
}: ButtonProps) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={{ ...buttonAppStyle.button, ...buttonStyle }}
        >
            {image && <>
                <ImageButtonApp image={image}/>
                <Spacer marginHorizontal={"4%"} />
            </>
            }

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

const ImageButtonApp = ({ image, style }: ImageButtonAppProps) => {

    return (
        <Image
            source={image}
            resizeMode='contain'
            style={{
                width: "10%",
                ...style
            }}
        />
    )

}

const buttonAppStyle = StyleSheet.create({
    button: {
        flexDirection: 'row',
        width: "100%",
        backgroundColor: Colors.GRAY,
        height: Styles.BUTTON_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Styles.BORDER_RADIUS
    }
})