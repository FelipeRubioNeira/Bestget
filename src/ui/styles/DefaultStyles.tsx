import { StyleSheet } from "react-native";
import { Styles } from "./Styles";
import { Colors } from "../constants/Colors";
import { FontFamily } from "../constants/Fonts";


const DefaultStyles = StyleSheet.create({

    screen: {
        height: "100%",
        width: "100%",
        padding: Styles.SCREEN_PADDING,
    },

    input: {
        width: "100%",
        height: 70,
        borderWidth: 1,
        borderColor: Colors.GRAY,
        borderRadius: Styles.BORDER_RADIUS,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },

    shadow: {
        shadowColor: Colors.BLACK,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4
    },

    listItemContainer: {
        flexDirection: 'row',
        width: "100%",
        borderBottomWidth: 1,
        borderColor: Colors.GRAY,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: "4%",
        marginBottom: "4%",
    },

    mainButton: {
        color: Colors.BLUE,
        fontFamily: FontFamily.BOLD
    },

})

export default DefaultStyles