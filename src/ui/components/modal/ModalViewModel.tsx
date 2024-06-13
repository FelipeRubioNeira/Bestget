import { useState } from "react"
import { TextStyle, ViewStyle } from "react-native"

// ----------- types ------------ //
type ModalButtonList = {
    text: string,
    onPress: () => void,
    style?: TextStyle
}

type BodyProps = {
    message: string,
    buttonList?: ModalButtonList[]
}

type ModalProps = {
    visible: boolean,
    title: string,
    backgroundStyle?: ViewStyle
} & BodyProps



const useModalViewModel = () => {


    // ----------- state ------------ //
    const [modalState, setModalState] = useState<ModalProps>({
        visible: false,
        title: "",
        message: "",
        buttonList: []
    })

    /**
     * 
     * @param title Title of the modal
     * @param message Message of the modal
     * @param buttonList  List of buttons to show in the modal with according actions
     */
    const showModal = (
        title: string = "",
        message: string = "",
        buttonList: ModalButtonList[] = [{
            text: "Ok",
            onPress: hideModal
        }]
    ) => {
        setModalState({
            visible: true,
            title,
            message,
            buttonList
        })
    }

    const hideModal = () => {
        setModalState(prevState => ({ ...prevState, visible: false }));
    }


    // ----------- return ------------ //
    return {
        modalState,
        showModal,
        hideModal
    }

}

export default useModalViewModel

export type {
    ModalButtonList,
    BodyProps,
    ModalProps
}