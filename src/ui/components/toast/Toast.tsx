import React, { useEffect } from 'react'
import { View } from 'react-native'
import Label from '../label/Label'
import { Colors } from '../../constants/Colors'
import { FontFamily, FontSize } from '../../constants/Fonts'
import TouchableIcon from '../touchableIcon/TouchableIcon'
import Icons from '../../../assets/icons'
import Spacer from '../spacer/Spacer'
import ToastSyles from './ToastStyles'



// ------------------ Constants ------------------ //
const HIDE_AFTER = 3000
const COLOR_SUCCESS = Colors.GREEN
const COLOR_ERROR = Colors.CHIP_DEBTS



// ------------------ Type and Props ------------------ //
type ToastType = 'success' | 'error'
type ToastProps = {
    visible: boolean,
    message: string,
    type?: ToastType
}

type ToastPropsAndActions = ToastProps & {
    hideToast: () => void
}



// ------------------ Component ------------------ //
const Toast = ({
    message,
    type = 'success',
    visible,
    hideToast
}: ToastPropsAndActions) => {



    // ------------------ Effects ------------------ //
    useEffect(() => {
        const timer = setTimeout(hideToast, HIDE_AFTER)
        return () => clearTimeout(timer)
    }, [visible])



    // ------------------ Render ------------------ //
    if (!visible) return null
    return (

        <View style={{
            ...ToastSyles.container,
            backgroundColor: type === "success" ? COLOR_SUCCESS : COLOR_ERROR
        }}>

            {
                type === "success" ?
                    <TouchableIcon image={Icons.check} style={ToastSyles.checkIcon} />
                    :
                    <TouchableIcon image={Icons.deleteCircle} style={ToastSyles.checkIcon} />
            }

            <Spacer marginHorizontal={"2%"} />

            <Label
                value={message}
                color={Colors.BLACK}
                fontSize={FontSize.SMALL}
                fontFamily={FontFamily.BOLD}
            />
        </View>
    )
}


export default Toast

export type{
    ToastProps,
    ToastType
}

