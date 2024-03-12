import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

interface ILoadingProps {
    visible: boolean
}


const Loading = ({ visible }: ILoadingProps) => {

    if (!visible) return null
    return (
        <View style={loadingStyle.screen}>
            <ActivityIndicator size="large" color={Colors.CHIP_DEBTS} />
        </View>
    )
}

export default Loading

const loadingStyle = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: Colors.TRANSPARENT,
    }
})