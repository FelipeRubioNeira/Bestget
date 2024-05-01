import React from "react"
import { View } from "react-native"
import Label from "../label/Label"
import { FontFamily, FontSize } from "../../constants/Fonts"
import { Colors } from "react-native/Libraries/NewAppScreen"
import Spacer from "../spacer/Spacer"


type HomeHeaderProps = {
    name: string
    total: string
}



const HomeHeader = ({
    total,
    name
}: HomeHeaderProps) => {

    return (

        <View>
            <Label
                value={name}
                fontSize={FontSize.LARGE}
                fontFamily={FontFamily.BLACK}
            />

            <Label
                value={"Tu saldo es de:"}
                fontSize={FontSize.MEDIUM}
                fontFamily={FontFamily.BLACK}
                color={Colors.DARK_GRAY}
            />

            <Spacer marginVertical={"1%"} />

            <Label
                value={"$" + total}
                fontSize={FontSize.LARGE}
                fontFamily={FontFamily.BLACK}
            />

        </View>
    )

}

export default HomeHeader