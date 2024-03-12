import { View, ViewStyle } from 'react-native'
import React from 'react'


const Spacer = ({
    marginVertical = 0,
    marginHorizontal = 0
}: ViewStyle) => {

    return (
        <View style={{
            marginVertical: marginVertical,
            marginHorizontal: marginHorizontal
        }} />
    )
}

export default Spacer
