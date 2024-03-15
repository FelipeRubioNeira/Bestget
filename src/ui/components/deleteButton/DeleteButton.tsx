import { Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'


export type DeleteButtonProps = {
    status?: boolean,
    color?: string,
    onPress?: () => void
}

const DeleteButton = ({
    color = Colors.BLACK,
    onPress,
}: DeleteButtonProps) => {


    return (
        <TouchableOpacity onPress={onPress}>
            <Image
                source={require("../../../assets/icons/ic_trash.png")}
                style={{ height: 30, width: 30, }}
                resizeMode="center"
                tintColor={color}
            />
        </TouchableOpacity>
    )
}

export default DeleteButton
