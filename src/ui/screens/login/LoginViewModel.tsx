import ILoginRepository from "../../../data/repository/loginRepository/ILoginRepository";
import LoginGoogleRepository from "../../../data/repository/loginRepository/LoginGoogleRepository";
import LoginUseCase from "../../../domain/useCases/LoginUseCase";
import { LoginScreenProps } from "../../../navigation/NavigationParamList"
import { ScreenRoutes } from "../../../navigation/Routes"

type LoginViewModelProps = {
    loginUseCase: LoginUseCase
} & LoginScreenProps


const useLoginViewModel = ({ navigation, loginUseCase }: LoginViewModelProps) => {

    // GoogleSignin.signInSilently()


    const loginGoogle = async () => {

        const { isValid, message } = await loginUseCase.execute(new LoginGoogleRepository())

        if (isValid) {
            // ...otros casos de uso
            navigation.navigate(ScreenRoutes.HOME)

        } else {
            console.log("error al logearse con google ", message)
            // TODO: mostrar modal de error
        }


    }

    return {
        loginGoogle
    }


}

export default useLoginViewModel