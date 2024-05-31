import React from "react"
import { StyleSheet, View } from "react-native"
import { Styles, Colors, FontFamily } from "../../constants/Index"
import Label from "../label/Label"


interface ITotalAmount {
    label: string,
    amount: string,
    color?: string
}


const TotalAmount = ({
    label,
    amount,
    color = Colors.GRAY
}: ITotalAmount) => {

    return (

        <View style={{ ...totalAmountStyles.container, backgroundColor: color }}>

            <Label
                value={label}
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
        paddingVertical: 20,
        alignSelf: 'center',
        borderRadius: Styles.BORDER_RADIUS,
        paddingHorizontal: 20,
        backgroundColor: Colors.GREEN,
    }

})