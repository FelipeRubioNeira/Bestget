import React from "react"
import { InputModeOptions, View } from "react-native"
import Label from "../label/Label"
import { FontSize } from "../../constants/Fonts"
import { Colors } from "../../constants/Colors"
import Spacer from "../spacer/Spacer"
import TextInputApp from "../textInput/TextInputApp"


interface ITextInputWithLabel {
    value?: string,
    title?: string,
    placeholder?: string,
    inputMode?: InputModeOptions,
    onChangeText?: (text: string) => void,
    editable?: boolean
}

const TextInputWithLabel = ({
    value = "",
    title = "",
    placeholder = "",
    inputMode,
    onChangeText = () => { },
    editable = true
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
                editable={editable}
            />

        </View>
    )
}

export default TextInputWithLabel