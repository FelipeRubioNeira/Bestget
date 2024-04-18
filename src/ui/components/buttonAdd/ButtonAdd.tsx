import React from "react"
import { Image, StyleSheet, TouchableOpacity } from "react-native"
import { Colors, Styles } from "../../constants/Index"
import DefaultStyles from "../../styles/DefaultStyles"
import Icons from "../../../assets/icons"


interface IButtonAdd {
    visible?: boolean,
    backgroundColor?: string,
    onPress?: () => void
}


const ButtonAdd = ({
    visible = true,
    backgroundColor,
    onPress = () => { }
}: IButtonAdd) => {

    if (!visible) return null
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                ...buttonAddStyles.defaultButton,
                backgroundColor: backgroundColor
            }}>
            <Image
                source={Icons.plus}
                style={{
                    width: 25,
                    height: 25,
                    tintColor: Colors.BLACK
                }}
            />

        </TouchableOpacity>

    )
}

export default ButtonAdd

const buttonAddStyles = StyleSheet.create({

    defaultButton: {
        height: 70,
        aspectRatio: 1,
        borderRadius: Styles.BORDER_RADIUS,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 20,
        bottom: 20,
        // --- shadow --- //
        ...DefaultStyles.shadow
    }

})