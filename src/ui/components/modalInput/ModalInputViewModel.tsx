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
    const [modalInputState, setModalInputState] = useState<ModalProps>({
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
    const showInputModal = (
        title: string = "",
        message: string = "",
        placeholder: string = "",
        buttonList: ModalButtonList[] = [{
            text: "Ok",
            onPress: hideInputModal
        }]
    ) => {
        setModalInputState({
            visible: true,
            title,
            message,
            placeholder,
            buttonList,
            value: "",
        })
    }

    const hideInputModal = () => {
        setModalInputState({ ...modalInputState, visible: false });
    }

    const onChangeTextModal = (text: string) => {
        setModalInputState({ ...modalInputState, value: text });
    }


    // ----------- return ------------ //
    return {
        modalInputState,
        showInputModal,
        hideInputModal,
        onChangeTextModal,
        modalValue: modalInputState.value
    }

}

export default useInputModalViewModel

export type {
    ModalButtonList,
    BodyProps,
    ModalProps
}