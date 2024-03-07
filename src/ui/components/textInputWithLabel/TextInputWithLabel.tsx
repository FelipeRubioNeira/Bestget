import { InputModeOptions, View } from "react-native"
import Label from "../Label"
import { FontSize } from "../../constants/Fonts"
import { Colors } from "../../constants/Colors"
import Spacer from "../Spacer"
import TextInputApp from "../textInput/TextInputApp"


interface ITextInputWithLabel {
    value?: string,
    title?: string,
    placeholder?: string,
    inputMode?: InputModeOptions,
    onChangeText: (text: string) => void
}

const TextInputWithLabel = ({
    value = "",
    title = "",
    placeholder = "",
    inputMode,
    onChangeText,
}: ITextInputWithLabel) => {

    return (

        <View>

            <Label
                value={title}
                fontSize={FontSize.SMALL}
                color={Colors.BLACK}
            />

            <Spacer marginVertical={"1%"} />

            <TextInputApp
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                fontSize={FontSize.SMALL}
                inputMode={inputMode}
            />

        </View>
    )
}

export default TextInputWithLabel