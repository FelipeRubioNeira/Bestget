import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { Styles } from "../../styles/Styles";
import { FontFamily, FontSize } from "../../constants/Fonts";



const PremiumButtonStyles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: Colors.DEEP_PURPLE,
        borderRadius: Styles.BORDER_RADIUS,
        marginBottom: "4%",
    },
    label: {
        fontSize: FontSize.SMALL,
        fontFamily: FontFamily.BLACK
    }

})

export default PremiumButtonStyles