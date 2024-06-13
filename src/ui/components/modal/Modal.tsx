import { TouchableOpacity, View } from 'react-native'
import React, { Fragment } from 'react'
import { Colors } from '../../constants/Colors'
import Label from '../label/Label'
import { FontFamily, FontSize } from '../../constants/Fonts'
import ModalStyle from './ModalStyles'
import { BodyProps, ModalButtonList, ModalProps } from './ModalViewModel'



// ----------- component ------------ //
const Modal = ({
    visible = true,
    title,
    message,
    buttonList,
    backgroundStyle
}: ModalProps) => {

    if (!visible) return null
    return (
        <View style={{
            ...ModalStyle.backgrpund,
            ...backgroundStyle
        }}>

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


// ----------- sub-components ------------ //
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

const ButtonList = ({ buttonList }: { buttonList?: ModalButtonList[] }) => {

    if (!buttonList) return null
    return (
        <View style={ModalStyle.ButtonListContainer}>
            {
                buttonList.map((button, index) => <Fragment key={index}>
                    <ButtonItem
                        key={index}
                        {...button}
                    />
                    {index < buttonList.length - 1 && <View key={index + "separator"} style={ModalStyle.modalSeparator} />}
                </Fragment>)
            }
        </View>
    )

}

const ButtonItem = ({ text, onPress, style }: ModalButtonList) => {

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