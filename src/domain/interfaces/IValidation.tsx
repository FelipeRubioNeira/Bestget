import { Validation } from "../../data/types/Validation";

interface IValidation {
    applyValidations: (name: string, amount: number) => Promise<Validation>
    validateConnection(): Promise<Validation>
    validateInputs(name: string, amount: number): Validation
}

export default IValidation