import { StyleSheet, TouchableOpacity } from "react-native"
import { Colors, FontFamily, Styles } from "../../constants/Index"
import Label from "../Label"
import { IButtonAdd } from "../IProps"

const ButtonAdd = ({
    backgroundColor,
    onPress = () => { }
}: IButtonAdd) => {

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
        shadowColor: Colors.BLACK,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4
    }

})