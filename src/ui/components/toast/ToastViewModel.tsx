import { useState } from "react"
import { Colors } from "../../constants/Colors"


// ------------------ Constants ------------------ //
const HIDE_AFTER = 3000
const TOAST_SUCCESS_COLOR = Colors.GREEN
const TOAST_ERROR_COLOR = Colors.CHIP_DEBTS



// ------------------ Type and Props ------------------ //
type ToastType = 'success' | 'error'
type ToastProps = {
    visible: boolean,
    message: string,
    type?: ToastType
}



const useToastViewModel = () => {


    const [toastState, setToastState] = useState<ToastProps>({
        visible: false,
        message: "",
        type: 'success'
    })

    const showToast = (message: string, type: ToastType) => {
        setToastState({
            visible: true,
            message,
            type
        })
        automaticallyHideToast()
    }

    // automatically hide the toast after a few seconds
    const automaticallyHideToast = () => {
        const timer = setTimeout(hideToast, HIDE_AFTER)
        return () => clearTimeout(timer)
    }

    const hideToast = () => {
        setToastState(previousState => ({
            ...previousState,
            visible: false,
        }))
    }


    return {
        toastState,
        showToast
    }

}

export default useToastViewModel

export {
    HIDE_AFTER,
    TOAST_SUCCESS_COLOR,
    TOAST_ERROR_COLOR
}

export type {
    ToastProps,
    ToastType,
}