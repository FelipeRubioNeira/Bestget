import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import React, { ReactNode } from 'react'
import { DefaultStyles } from '../../constants/Styles'

const Screen = ({ children }: { children: ReactNode }) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={screenStyles.screen}>
                {children}
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Screen

const screenStyles = StyleSheet.create({
    screen: {
        ...DefaultStyles.screen,
        justifyContent: 'space-between'
    }
})