import { Image, ImageSourcePropType, ImageStyle, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'


export type TouchableIconProps = {
    image: ImageSourcePropType,
    color?: string,
    onPress?: () => void,
    disabled?: boolean,
    style?: ImageStyle
}

const TouchableIcon = ({
    image,
    color = Colors.BLACK,
    onPress,
    disabled = false,
    style,
}: TouchableIconProps) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
        >
            <Image
                source={image}
                style={{
                    ...touchableStyles.image,
                    ...style
                }}
                resizeMode="center"
                tintColor={color}
            />
        </TouchableOpacity>
    )
}

const touchableStyles = StyleSheet.create({

    image: {
        height: 30,
        width: 30,
    }

})

export default TouchableIcon
