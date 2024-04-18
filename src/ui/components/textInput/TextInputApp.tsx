import React from "react"
import { StyleSheet, TextInput } from "react-native"
import { Colors, FontFamily, FontSize, DefaultStyles } from "../../constants/Index"
import useTextInputViewModel, { ITextInput } from "./TextInputViewModel"



const TextInputApp = ({
    value,
    fontSize = FontSize.MEDIUM,
    fontFamily = FontFamily.REGULAR,
    color = Colors.BLACK,
    placeholder = "Ingrese el monto",
    inputMode,
    onChangeText = () => { },
    editable = true
}: ITextInput) => {

    const textInputViewModel = useTextInputViewModel({
        inputMode,
        onChangeText
    })

    return (

        <TextInput
            value={value}
            onChangeText={textInputViewModel.onChangeTextViewModel}
            placeholder={placeholder}
            placeholderTextColor={Colors.GRAY}
            inputMode={inputMode}
            editable = {editable}
            style={{
                ...textInputStyles.textInput,
                fontSize: fontSize,
                fontFamily: fontFamily,
                color: color
            }}
        />
    )
}
export default TextInputApp

const textInputStyles = StyleSheet.create({

    textInput: {
        ...DefaultStyles.input,
        fontSize: FontSize.MEDIUM,
        fontFamily: FontFamily.REGULAR,
        color: Colors.BLACK
    }

})