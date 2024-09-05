import { useState } from "react"
import { TextStyle, ViewStyle } from "react-native"

// ----------- types ------------ //
type ModalButtonList = {
    text: string,
    onPress: () => void,
    style?: TextStyle
}

type BodyProps = {
    message?: string,
    buttonList?: ModalButtonList[],
    placeholder?: string,
    value?: string,
    fontSize?: number,
    onChangeTextModal?: (text: string) => void,
}

type ModalProps = {
    visible: boolean,
    title: string,
    backgroundStyle?: ViewStyle
} & BodyProps



const useInputModalViewModel = () => {


    // ----------- state ------------ //
    const [modalState, setModalState] = useState<ModalProps>({
        visible: false,
        title: "",
        message: "",
        placeholder: "",
        buttonList: [],
        value: "",
    })


    // ----------- functions ------------ //

    /**
     * 
     * @param title Title of the modal
     * @param message Message of the modal
     * @param buttonList  List of buttons to show in the modal with according actions
     */
    const showModal = (
        title: string = "",
        message: string = "",
        placeholder: string = "",
        buttonList: ModalButtonList[] = [{
            text: "Ok",
            onPress: hideModal
        }]
    ) => {
        setModalState({
            visible: true,
            title,
            message,
            placeholder,
            buttonList,
            value: "",
        })
    }

    const hideModal = () => {
        setModalState({ ...modalState, visible: false });
    }

    const onChangeTextModal = (text: string) => {
        setModalState({ ...modalState, value: text });
    }


    // ----------- return ------------ //
    return {
        modalState,
        showModal,
        hideModal,
        onChangeTextModal,
        modalValue: modalState.value
    }

}

export default useInputModalViewModel

export type {
    ModalButtonList,
    BodyProps,
    ModalProps
}