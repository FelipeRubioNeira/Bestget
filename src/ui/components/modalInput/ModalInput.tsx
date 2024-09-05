import { View } from 'react-native'
import React from 'react'
import Label from '../label/Label'
import { FontSize } from '../../constants/Fonts'
import ModalInputStyle from './ModalInputStyles'
import { BodyProps, ModalProps } from './ModalInputViewModel'
import { ButtonList, Header } from '../modal/Modal'
import TextInputApp from '../textInput/TextInputApp'
import Spacer from '../spacer/Spacer'



// ----------- component ------------ //
const ModalInput = ({
    visible = true,
    title,
    message,
    buttonList,
    backgroundStyle,
    fontSize,
    onChangeTextModal,
    placeholder,
    value
}: ModalProps) => {

    if (!visible) return null
    return (
        <View style={{
            ...ModalInputStyle.backgrpund,
            ...backgroundStyle
        }}>

            <View style={ModalInputStyle.container}>

                <Header value={title} />

                <Body
                    message={message}
                    buttonList={buttonList}
                    fontSize={fontSize}
                    onChangeTextModal={onChangeTextModal}
                    value={value}
                    placeholder={placeholder}
                />

            </View>

        </View>
    )
}




const Body = ({
    message = "",
    buttonList = [],
    onChangeTextModal = () => { },
    placeholder = "Ingrese un valor",
    value = "",
    fontSize = FontSize.XSMALL
}: BodyProps) => {

    return (
        <View style={ModalInputStyle.body}>

            <Label
                value={message}
                style={ModalInputStyle.bodyText}
            />

            <TextInputApp
                onChangeText={onChangeTextModal}
                value={value}
                placeholder={placeholder}
                fontSize={fontSize}
            />

            <Spacer marginVertical='4%' />

            <ButtonList buttonList={buttonList} />

        </View>
    )

}




export default ModalInput