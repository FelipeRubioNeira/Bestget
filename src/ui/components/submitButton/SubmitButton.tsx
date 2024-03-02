import { StyleSheet, TouchableOpacity } from "react-native"
import { Colors } from "../../constants/Colors"
import { FontFamily, FontSize } from "../../constants/Fonts"
import Label from "../Label"
import { ISubmmitButton } from "../IProps"

const SubmitButton = ({
    onPress
}: ISubmmitButton) => {

    return (
        
        <TouchableOpacity
            onPress={onPress}
            style={submitButtonStyles.submitButton}
        >

            <Label
                value="Guardar"
                fontSize={FontSize.SMALL}
                fontFamily={FontFamily.BOLD}
                color={Colors.BLACK}
            />

        </TouchableOpacity>
    )
}


export default SubmitButton

const submitButtonStyles = StyleSheet.create({

    submitButton: {
        width: "100%",
        height: 60,
        backgroundColor: Colors.GREEN,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: Colors.GRAY
    }

})