import { useState } from "react";
import LoginGoogleRepository from "../../../data/repository/loginRepository/LoginGoogleRepository";
import LoginUseCase from "../../../domain/useCases/LoginUseCase";
import { LoginScreenProps } from "../../../navigation/NavigationParamList"
import { ScreenRoutes } from "../../../navigation/Routes"
import useModalViewModel from "../../components/modal/ModalViewModel";



type LoginViewModelProps = {
    loginUseCase: LoginUseCase
} & LoginScreenProps


const useLoginViewModel = ({ navigation, loginUseCase }: LoginViewModelProps) => {


    // ------------------ hooks ------------------ //
    const { modalState, showModal, hideModal } = useModalViewModel()




    // ------------------ functions ------------------ //
    const loginGoogle = async () => {

        const { isValid, message } = await loginUseCase.execute(new LoginGoogleRepository())

        if (isValid) {
            // ...otros casos de uso
            navigation.navigate(ScreenRoutes.HOME)

        } else {
            console.log("error al logearse con google ", message)
            // TODO: mostrar modal de error

            showModal(
                "Error",
                message,
                [{ text: "Aceptar", onPress: hideModal }]
            )

        }

    }



    return {
        modalState,
        loginGoogle
    }


}

export default useLoginViewModel