import { useState } from "react"
import { InputModeOptions } from "react-native"
import { currencyFormat } from "../../../utils/Convert"


export interface ITextInput {
    value: string
    fontSize?: number
    fontFamily?: string
    color?: string
    placeholder?: string,
    inputMode?: InputModeOptions,
    onChangeText: (text: string) => void,
    editable?: boolean
}

const TextInputRegex = Object.freeze({
    TEXT: /[^a-zA-Z ]/g,
    NUMERIC: /[^0-9]/g,
})

export enum InputType {
    TEXT = "text",
    NUMERIC = "numeric"
}

interface TextInputViewModel {
    inputMode: InputModeOptions | undefined,
    onChangeText: (value: string) => void
}

const useTextInputViewModel = ({
    inputMode,
    onChangeText
}: TextInputViewModel) => {

    //const [valueViewModel, setValueViewModel] = useState("")


    const onChangeTextViewModel = (value: string) => {
        const formattedValue = removeSpecialCharacters(value, inputMode)
        //setValueViewModel(formattedValue)
        onChangeText(formattedValue)
    }


    const removeSpecialCharacters = (value: string, inputMode: string | undefined) => {


        if (!inputMode) return value

        let formattedValue = ""

        switch (inputMode) {

            case InputType.TEXT:
                formattedValue = value.replace(TextInputRegex.TEXT, "")
                break;

            case InputType.NUMERIC:
                formattedValue = value.replace(TextInputRegex.NUMERIC, "")
                formattedValue = currencyFormat(formattedValue)
                break;

            default:
                formattedValue = value
                break;

        }

        return formattedValue

    }


    return {
        //valueViewModel,
        onChangeTextViewModel
    }

}

export default useTextInputViewModel