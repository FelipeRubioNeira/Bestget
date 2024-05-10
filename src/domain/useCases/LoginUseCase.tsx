import { User } from "@react-native-google-signin/google-signin";
import ILoginRepository from "../../data/repository/loginRepository/ILoginRepository";
import { Validation } from "../../data/types/Validation"
import { validateConnection } from "../../utils/Connection";


class LoginUseCase {

    async execute(loginRepository: ILoginRepository<User>) {

        const validation = await this.applyValidations()

        if (!validation.isValid) return validation

        try {
            await loginRepository.login()
            return validation

        } catch (error) {
            validation.isValid = false
            validation.message = "Error al iniciar sesión"
            return validation
        }


    }

    private async applyValidations(): Promise<Validation> {
        return await validateConnection()

        // ... other validations

    }

}

export default LoginUseCase