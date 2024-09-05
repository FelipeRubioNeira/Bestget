import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { Styles } from "../../styles/Styles";
import { FontFamily, FontSize } from "../../constants/Fonts";
import DefaultStyles from "../../styles/DefaultStyles";


const ModalInputStyle = StyleSheet.create({

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
        width: "95%",
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
        marginVertical: "4%",
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
    },
    modalSeparator: {
        borderWidth: 0.2,
        height: "60%",
        alignSelf: "center",
        marginHorizontal: "1%",
        borderColor:Colors.DARK_GRAY
    }


})

export default ModalInputStyle