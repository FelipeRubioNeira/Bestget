
// label
interface ILabel {
    value: string | null
    fontSize?: number
    fontFamily?: string
    color?: string
}

// buttonAdd


// submitButton
interface ISubmmitButton {
    onPress?: () => void
}

// textInputWithLabel




export type {
    ILabel as ILabel,
    ISubmmitButton as ISubmmitButton,
}
