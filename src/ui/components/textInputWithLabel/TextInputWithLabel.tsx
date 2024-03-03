import { View } from "react-native"
import Label from "../Label"
import { FontSize } from "../../constants/Fonts"
import { Colors } from "../../constants/Colors"
import Spacer from "../Spacer"
import TextInputApp from "../textInput/TextInputApp"


interface ITextInputWithLabel {
    title?: string,
    placeholder?: string,
    value?: string | number,
    onChangeText?: (text: string | number) => void
}

const TextInputWithLabel = ({
    title = "",
    value = "",
    placeholder = "",
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
                placeholder={placeholder}
                fontSize={FontSize.SMALL}
                onChangeText={onChangeText}
            />

        </View>
    )
}

export default TextInputWithLabel