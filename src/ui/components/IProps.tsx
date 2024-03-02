
// label
interface ILabel {
    value: string | null
    fontSize?: number
    fontFamily?: string
    color?: string
}

// totalAmount
interface ITotalAmount {
    label: string,
    amount: string
}

// textInput
interface ITextInput {
    value?: string
    fontSize?: number
    fontFamily?: string
    color?: string
    placeholder?: string
}

// buttonAdd
interface IButtonAdd {
    backgroundColor?: string,
    onPress?: () => void
}

// submitButton
interface ISubmmitButton {
    onPress?: () => void
}

// textInputWithLabel
interface ITextInputWithLabel {
    title?: string,
    placeholder?: string
  }
  


export type {
    ILabel as ILabel,
    ITotalAmount as ITotalAmount,
    ITextInput as ITextInput,
    IButtonAdd as IButtonAdd,
    ISubmmitButton as ISubmmitButton,
    ITextInputWithLabel as ITextInputWithLabel
}
