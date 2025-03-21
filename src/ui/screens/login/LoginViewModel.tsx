import { useEffect } from "react";
import LoginGoogleRepository from "../../../data/repository/loginRepository/LoginGoogleRepository";
import LoginUseCase from "../../../domain/useCases/LoginUseCase";
import { LoginScreenProps } from "../../../navigation/NavigationParamList"
import { ScreenRoutes } from "../../../navigation/Routes"
import useModalViewModel from "../../components/modal/ModalViewModel";
import LocalLoginRepository from "../../../data/repository/loginRepository/LocalLoginRepository";

import { useAppDispatch } from "../../../data/globalContext/StoreHooks";
import { updateUser } from "../../../data/globalContext/redux/slices/UserAppSlice";

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
    const dispatch = useAppDispatch()



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

        if (user) {
            dispatch(updateUser(user))
            navigateToNextScreen()
        }
    }

    const loginGoogle = async () => {

        const { isValid, message, result } = await loginUseCase.execute(new LoginGoogleRepository())

        if (isValid && result) {
            dispatch(updateUser(result))
            navigateToNextScreen()
            // ...otros casos de uso

        } else {
            showModal(
                "Error",
                message,
                [{ text: "Aceptar", onPress: hideModal }]
            )
        }

    }

    const navigateToNextScreen = () => {
        navigation.navigate(ScreenRoutes.CHOOSE_FINANCES)
    }



    return {
        modalState,
        loginGoogle
    }


}

export default useLoginViewModel