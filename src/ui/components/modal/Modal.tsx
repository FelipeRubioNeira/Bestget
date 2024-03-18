import { TextStyle, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import Label from '../label/Label'
import { FontFamily, FontSize } from '../../constants/Fonts'
import ModalStyle from './ModalStyles'


// ----------- types ------------ //
export type ButtonModal = {
    text: string,
    onPress: () => void,
    style?: TextStyle
}

type BodyProps = {
    message: string,
    buttonList?: ButtonModal[]
}

export type ModalProps = {
    visible: boolean,
    title: string,
} & BodyProps




// ----------- component ------------ //
const Modal = ({ visible = true, title, message, buttonList }: ModalProps) => {

    if (!visible) return null
    return (
        <View style={ModalStyle.backgrpund}>

            <View style={ModalStyle.container}>

                <Header value={title} />

                <Body
                    message={message}
                    buttonList={buttonList}
                />

            </View>

        </View>
    )
}

const Header = ({ value = "" }: { value: string }) => {

    return (

        <View style={ModalStyle.header}>
            <Label
                value={value}
                fontFamily={FontFamily.BOLD}
                fontSize={FontSize.SMALL}
            />

        </View>
    )

}

const Body = ({ message = "", buttonList = [] }: BodyProps) => {

    return (
        <View style={ModalStyle.body}>

            <Label
                value={message}
                style={ModalStyle.bodyText}
            />

            <ButtonList buttonList={buttonList} />

        </View>
    )

}

const ButtonList = ({ buttonList }: { buttonList?: ButtonModal[] }) => {

    if (!buttonList) return null
    return (
        <View style={ModalStyle.ButtonListContainer}>
            {
                buttonList.map((button, index) => <ButtonItem
                    key={index}
                    {...button}
                />)
            }
        </View>
    )

}

const ButtonItem = ({ text, onPress, style }: ButtonModal) => {

    return (
        <TouchableOpacity
            style={ModalStyle.butonItem}
            onPress={onPress}
        >

            <Label
                value={text}
                fontSize={FontSize.SMALL}
                color={Colors.BLACK}
                style={style}
            />

        </TouchableOpacity>
    )

}


export default Modal