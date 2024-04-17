import { StyleSheet } from "react-native";
import { Styles } from "../../styles/Styles";
import { Colors } from "../../constants/Colors";


const BottomStyles = StyleSheet.create({

    screen: {
        position: 'absolute',
        bottom: 0,
        height: Styles.HEIGHT,
        width: '100%',
        justifyContent: 'space-between',
        backgroundColor: Colors.TRANSPARENT
    },
    outCountainer: {
        flex: 1
    },
    container: {
        backgroundColor: Colors.WHITE,
        borderTopLeftRadius: Styles.BORDER_RADIUS,
        borderTopRightRadius: Styles.BORDER_RADIUS,
        width: "100%",
        bottom: 0,
        padding: 20,
        justifyContent: 'space-between'
    }

})

export default BottomStyles