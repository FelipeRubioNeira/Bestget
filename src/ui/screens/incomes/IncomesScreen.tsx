import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DefaultStyles } from '../../constants/Styles'

const IncomesScreen = () => {

  return (
    <SafeAreaView>
      <View style={DefaultStyles.SCREEN}>
        <Text style={{ color: "red" }}>hola</Text>
      </View>
    </SafeAreaView>

  )
}

export default IncomesScreen

const styles = StyleSheet.create({})