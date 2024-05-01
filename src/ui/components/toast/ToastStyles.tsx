import { StyleSheet } from "react-native";
import { Styles } from "../../styles/Styles";
import { Colors } from "../../constants/Colors";
import DefaultStyles from "../../styles/DefaultStyles";


const ToastSyles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        borderRadius: Styles.BORDER_RADIUS,
        position: 'absolute',
        top: 20,
        width: '80%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignSelf: 'center',
        backgroundColor: Colors.GREEN,
        justifyContent: 'center',
        alignItems: 'center',
        ...DefaultStyles.shadow
    },

    checkIcon: {
        height: 25,
        aspectRatio: 1
    }

})

export default ToastSyles