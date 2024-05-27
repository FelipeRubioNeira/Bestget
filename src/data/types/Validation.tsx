

type ValidationResult<T> = Validation & {
    result: T | null,
}

type Validation = {
    isValid: boolean,
    message: string,
}

export type {
    ValidationResult,
    Validation
}