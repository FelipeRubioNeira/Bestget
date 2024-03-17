import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'


export type TouchableIconProps = {
    image: ImageSourcePropType,
    color?: string,
    onPress?: () => void
}

const TouchableIcon = ({
    image,
    color = Colors.BLACK,
    onPress,
}: TouchableIconProps) => {

    return (
        <TouchableOpacity onPress={onPress}>
            <Image
                source={image}
                style={touchableStyles.image}
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
