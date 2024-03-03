
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




export type {
    ILabel as ILabel,
    ITotalAmount as ITotalAmount,
    IButtonAdd as IButtonAdd,
    ISubmmitButton as ISubmmitButton,
}
