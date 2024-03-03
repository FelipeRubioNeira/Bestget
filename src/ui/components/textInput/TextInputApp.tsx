import { StyleSheet, TextInput } from "react-native"
import { Colors, FontFamily, FontSize, Styles } from "../../constants/Index"

interface ITextInput {
    value?: string | number
    fontSize?: number
    fontFamily?: string
    color?: string
    placeholder?: string,
    onChangeText?: (text: string | number) => void
}

const TextInputApp = ({
    value,
    fontSize = FontSize.MEDIUM,
    fontFamily = FontFamily.REGULAR,
    color = Colors.BLACK,
    placeholder = "Ingrese el monto",
    onChangeText = () => { },
}: ITextInput) => {

    return (

        <TextInput
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={Colors.GRAY}
            style={{
                ...textInputStyles.textInput,
                fontSize: fontSize,
                fontFamily: fontFamily,
                color: color
            }}
        >
            {value}
        </TextInput>
    )
}
export default TextInputApp

const textInputStyles = StyleSheet.create({

    textInput: {
        width: "100%",
        height: 70,
        borderWidth: 1,
        borderColor: Colors.GRAY,
        borderRadius: Styles.BORDER_RADIUS,
        paddingHorizontal: 20,
        fontSize: FontSize.MEDIUM,
        fontFamily: FontFamily.REGULAR,
        color: Colors.BLACK
    }

})