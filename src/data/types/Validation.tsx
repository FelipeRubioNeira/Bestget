import { Message } from "./Message"


type ValidationResult<T> = {
    isValid: boolean,
    message: Message,
    result?: T,
}

type Validation = {
    isValid: boolean,
    messageError: string,
}

export type {
    ValidationResult,
    Validation
}