import { ImageURISource, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Spacer from '../spacer/Spacer'
import Icons from '../../../assets/icons/index'
import { Colors } from '../../constants/Colors'
import { FontSize } from '../../constants/Fonts'
import TouchableIcon from '../touchableIcon/TouchableIcon'
import Label from '../label/Label'
import { Styles } from '../../styles/Styles'
import PremiumButton from '../premiumButton/PremiumButton'


type ActionItemProps = {
    title: string,
    icon: ImageURISource,
    onPress?: () => void
}

type ActionsProps = {
    onCopy?: () => void,
    onPaste?: () => void,
    onDelete?: () => void
}

const Actions = ({ onCopy, onPaste, onDelete }: ActionsProps) => {

    return (

        <View>

            <PremiumButton />

            <View style={actionStyles.container}>

                <ActionItem
                    title='Copiar'
                    icon={Icons.copy}
                    onPress={onCopy}
                />

                <Spacer marginHorizontal={"2%"} />

                <ActionItem
                    title='pegar'
                    icon={Icons.paste}
                    onPress={onPaste}
                />

                <Spacer marginHorizontal={"2%"} />

                <ActionItem
                    title='Eliminar'
                    icon={Icons.deleteCircle}
                    onPress={onDelete}
                />

            </View>
        </View>
    )
}



const ActionItem = ({ title, icon, onPress }: ActionItemProps) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={actionStyles.actionItem}
        >

            <Label value={title} fontSize={FontSize.XSMALL} />

            <Spacer marginVertical={"8%"} />

            <TouchableIcon
                disabled
                image={icon}
            />

        </TouchableOpacity>
    )

}

export default Actions

const actionStyles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    actionItem: {
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: Colors.LIGHT_GRAY,
        padding: 20,
        borderRadius: Styles.BORDER_RADIUS,
        flex: 1
    }
})