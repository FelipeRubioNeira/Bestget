import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DefaultStyles } from '../../constants/Styles'

const MovementsScreen = () => {

    return (
        <SafeAreaView>
            <View style={DefaultStyles.SCREEN}>
                <Text style={{ color: "red" }}>movimientos</Text>
            </View>
        </SafeAreaView>

    )
}

export default MovementsScreen

const styles = StyleSheet.create({})