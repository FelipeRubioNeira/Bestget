import ILoginRepository from "../../data/repository/loginRepository/ILoginRepository";
import { Validation, ValidationResult } from "../../data/types/Validation"
import { validateConnection } from "../../utils/Connection";
import UserApp from "../../data/types/UserApp";


class LoginUseCase {
    constructor(private localLoginRepository: ILoginRepository) { }

    
    async execute(loginRepository: ILoginRepository): Promise<ValidationResult<UserApp | null>> {

        const validation: ValidationResult<UserApp> = {
            isValid: true,
            message: "",
            result: null,
        }

        const validations = await this.applyValidations()

        if (!validations.isValid) {
            validation.isValid = false
            validation.message = validations.message
            return validation
        }

        try {
            const userApp = await loginRepository.login()

            if (userApp) {
                await this.localLoginRepository.saveUser(userApp)
                validation.result = userApp
                return validation

            } else throw new Error("Error al iniciar sesión")


        } catch (error) {
            validation.isValid = false
            validation.message = "Error al iniciar sesión"
            return validation
        }

    }

    private async applyValidations(): Promise<Validation> {
        return await validateConnection()

        // TODO: apply other validations
        // ... other validations

    }

}

export default LoginUseCase