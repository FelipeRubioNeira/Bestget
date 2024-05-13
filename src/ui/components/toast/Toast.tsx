import React from 'react'
import { View } from 'react-native'
import Label from '../label/Label'
import { Colors } from '../../constants/Colors'
import { FontFamily, FontSize } from '../../constants/Fonts'
import TouchableIcon from '../touchableIcon/TouchableIcon'
import Icons from '../../../assets/icons'
import Spacer from '../spacer/Spacer'
import ToastSyles from './ToastStyles'
import { TOAST_ERROR_COLOR, TOAST_SUCCESS_COLOR, ToastProps } from './ToastViewModel'




// ------------------ Component ------------------ //
const Toast = ({
    message,
    type,
    visible,
}: ToastProps) => {



    // ------------------ Render ------------------ //
    if (!visible) return null
    return (

        <View style={{
            ...ToastSyles.container,
            backgroundColor: type === "success" ? TOAST_SUCCESS_COLOR : TOAST_ERROR_COLOR
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


