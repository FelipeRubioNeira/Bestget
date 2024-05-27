import { useEffect } from "react";
import LoginGoogleRepository from "../../../data/repository/loginRepository/LoginGoogleRepository";
import LoginUseCase from "../../../domain/useCases/LoginUseCase";
import { LoginScreenProps } from "../../../navigation/NavigationParamList"
import { ScreenRoutes } from "../../../navigation/Routes"
import useModalViewModel from "../../components/modal/ModalViewModel";
import { useGlobalContext } from "../../../data/globalContext/GlobalContext";
import LocalLoginRepository from "../../../data/repository/loginRepository/LocalLoginRepository";



type LoginViewModelProps = {
    localLoginRepository: LocalLoginRepository,
    loginUseCase: LoginUseCase
} & LoginScreenProps


const useLoginViewModel = ({
    navigation,
    loginUseCase,
    localLoginRepository
}: LoginViewModelProps) => {


    // ------------------ context ------------------ //
    const { updateUserApp } = useGlobalContext()


    // ------------------ hooks ------------------ //
    const {
        modalState,
        showModal,
        hideModal
    } = useModalViewModel()


    useEffect(() => {
        validateUserLogged()
    }, [])




    // ------------------ functions ------------------ //
    const validateUserLogged = async () => {
        const user = await localLoginRepository.getUser()
        if (user){
            navigateToHome()
            updateUserApp(user)
        } 
    }

    const loginGoogle = async () => {

        const { isValid, message, result } = await loginUseCase.execute(new LoginGoogleRepository())

        if (isValid && result) {
            updateUserApp(result)
            navigateToHome()
            // ...otros casos de uso

        } else {
            showModal(
                "Error",
                message,
                [{ text: "Aceptar", onPress: hideModal }]
            )
        }

    }

    const navigateToHome = () => {
        navigation.navigate(ScreenRoutes.HOME)
    }



    return {
        modalState,
        loginGoogle
    }


}

export default useLoginViewModel