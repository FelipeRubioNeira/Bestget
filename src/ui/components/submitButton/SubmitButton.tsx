import React from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { Colors } from "../../constants/Colors"
import { FontFamily, FontSize } from "../../constants/Fonts"
import Label from "../label/Label"

// submitButton
interface ISubmmitButton {
    title?: string
    backgroundColor?: string
    onPress?: () => void
}

const SubmitButton = ({
    title = "Guardar",
    backgroundColor,
    onPress
}: ISubmmitButton) => {

    return (
        
        <TouchableOpacity
            onPress={onPress}
            style={{
                ...submitButtonStyles.submitButton,
                backgroundColor: backgroundColor
            }}
        >

            <Label
                value={title}
                fontSize={FontSize.SMALL}
                fontFamily={FontFamily.BOLD}
                color={Colors.BLACK}
            />

        </TouchableOpacity>
    )
}


export default SubmitButton

const submitButtonStyles = StyleSheet.create({

    submitButton: {
        width: "100%",
        height: 60,
        backgroundColor: Colors.GREEN,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: Colors.GRAY
    }

})