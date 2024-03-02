
import { StyleSheet, View } from "react-native"
import { Styles, Colors, FontFamily } from "../../constants/Index"
import Label from "../Label"
import { ITotalAmount } from "../IProps"


const TotalAmount = ({ label, amount }: ITotalAmount) => {

    return (

        <View style={totalAmountStyles.container}>
            
            <Label
                value={`${label} total`}
                fontFamily={FontFamily.BLACK}
            />
            <Label
                value={`$${amount}`}
                fontFamily={FontFamily.BLACK}
            />
        </View>
    )
}

export default TotalAmount

const totalAmountStyles = StyleSheet.create({

    container: {
        width: Styles.WIDTH * 0.95,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        paddingVertical: 20,
        alignSelf: 'center',
        borderRadius: Styles.BORDER_RADIUS,
        paddingHorizontal: 20,
        backgroundColor: Colors.GREEN,
        //borderColor: Colors.GRAY,
        //borderWidth: 1,
    }

})