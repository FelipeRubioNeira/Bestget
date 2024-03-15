import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { Styles, DefaultStyles } from '../../constants/Styles'
import Label from '../label/Label'
import { FontFamily, FontSize } from '../../constants/Fonts'

type Button = {
    text: string,
    onPress: () => void
}

type BodyProps = {
    message: string,
    buttonList?: Button[]
}

type ModalProps = {
    title: string,
} & BodyProps



const Modal = ({ title, message, buttonList }: ModalProps) => {

    return (
        <View style={modalStyle.backgrpund}>

            <View style={modalStyle.container}>

                <Header value={title} />

                <Body
                    message={message}
                    buttonList={buttonList}
                />

            </View>

        </View>
    )
}

const Header = ({ value }: { value: string }) => {

    return (

        <View style={modalStyle.header}>
            <Label
                value={value}
                fontFamily={FontFamily.BOLD}
                fontSize={FontSize.SMALL}
            />

        </View>
    )

}

const Body = ({ message, buttonList }: BodyProps) => {

    return (

        <View style={modalStyle.body}>

            <Label
                value={message}
                style={modalStyle.bodyText}
            />

            <ButtonList buttonList={buttonList} />

        </View>
    )

}

const ButtonList = ({ buttonList }: { buttonList?: Button[] }) => {

    if (!buttonList) return null
    return (
        <View style={modalStyle.ButtonListContainer}>
            {
                buttonList.map((button, index) => <ButtonItem
                    key={index}
                    {...button}
                />)
            }
        </View>
    )


}

const ButtonItem = ({ text, onPress }: Button) => {

    return (
        <TouchableOpacity
            style={modalStyle.butonItem}
            onPress={onPress}
        >

            <Label
                value={text}
                fontSize={FontSize.SMALL}
                color={Colors.DARK_GREEN}
            />

        </TouchableOpacity>
    )

}



const modalStyle = StyleSheet.create({

    backgrpund: {
        backgroundColor: Colors.TRANSPARENT,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    container: {
        width: "90%",
        borderRadius: Styles.BORDER_RADIUS,
        backgroundColor: Colors.WHITE,
        ...DefaultStyles.shadow
    },
    header: {
        width: "100%",
        paddingHorizontal: "4%",
        paddingVertical: "4%",
        backgroundColor: Colors.GREEN,
        borderTopRightRadius: Styles.BORDER_RADIUS,
        borderTopLeftRadius: Styles.BORDER_RADIUS
    },
    body: {
        width: "100%",
        minHeight: "20%",
        paddingHorizontal: "4%",
        paddingBottom: "2%",
        justifyContent: 'space-between',
        backgroundColor: Colors.WHITE,
        borderBottomRightRadius: Styles.BORDER_RADIUS,
        borderBottomLeftRadius: Styles.BORDER_RADIUS,
    },
    bodyText: {
        marginVertical:"4%",
        textAlignVertical: "center",
        fontFamily: FontFamily.REGULAR,
        fontSize: FontSize.XSMALL
    },
    ButtonListContainer: {
        flexDirection: "row",
        width: "100%",
        borderTopWidth: 1,
        borderTopColor: Colors.GRAY,
        height: 50,
    },
    butonItem: {
        height: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }

})

export default Modal