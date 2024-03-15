import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Styles } from '../../constants/Styles'


const CircleCategory = ({ color = "" }: { color?: string }) => {

    if (!color) return null
    return (

        <View style={{
            ...circleStyle.circle,
            backgroundColor: color,
        }} />

    )
}

const circleStyle = StyleSheet.create({

    circle: {
        height: 20,
        aspectRatio: 1,
        marginRight: "4%",
        borderRadius: Styles.HEIGHT,
    }
})

export default CircleCategory