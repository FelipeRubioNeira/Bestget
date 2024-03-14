import { StyleSheet, TouchableOpacity } from "react-native"
import { Colors, FontFamily, Styles, DefaultStyles } from "../../constants/Index"
import Label from "../label/Label"

interface IButtonAdd {
    visible?: boolean,
    backgroundColor?: string,
    onPress?: () => void
}

const ButtonAdd = ({
    visible = true,
    backgroundColor,
    onPress = () => { }
}: IButtonAdd) => {

    if (!visible) return null
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                ...buttonAddStyles.defaultButton,
                backgroundColor: backgroundColor
            }}>
            <Label
                value="+"
                fontSize={30}
                fontFamily={FontFamily.LIGHT}
                color={Colors.BLACK}
            />

        </TouchableOpacity>

    )
}

export default ButtonAdd

const buttonAddStyles = StyleSheet.create({

    defaultButton: {
        height: 70,
        aspectRatio: 1,
        borderRadius: Styles.BORDER_RADIUS,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 20,
        bottom: 20,
        // --- shadow --- //
        ...DefaultStyles.shadow
    }

})