import { Message } from "./Message"


type ValidationResult<T> = {
    isValid: boolean,
    message: Message,
    result?: T,
}

type Validation = {
    isValid: boolean,
    message: string,
}

export type {
    ValidationResult,
    Validation
}