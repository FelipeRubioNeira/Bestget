import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Styles } from '../../styles/Styles'


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