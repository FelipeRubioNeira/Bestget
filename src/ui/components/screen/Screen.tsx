import { Keyboard, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import DefaultStyles from '../../styles/DefaultStyles'

type ScreenProps = {
    children: ReactNode,
    style?: ViewStyle

}

const Screen = ({ children, style }: ScreenProps) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ ...screenStyles.screen, ...style }}>
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