import { Image, ImageProps, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import React from 'react'
import Label from '../label/Label'
import Spacer from '../spacer/Spacer'
import { Colors } from '../../constants/Colors'
import { Styles } from '../../styles/Styles'
import { FontFamily, FontSize } from '../../constants/Fonts'
import DefaultStyles from '../../styles/DefaultStyles'
import Icons from '../../../assets/icons'


interface ExpenseOptionsProps {
    visible: boolean,
    onPressOutcome: () => void,
    onPressBudget: () => void,
    onHideOptions: () => void
}

interface ExpenseOptionItemProps {
    title: string,
    image: ImageProps,
    styles: ViewStyle,
    onPress: () => void
}


const ExpenseOptions = ({
    visible,
    onPressOutcome,
    onPressBudget,
    onHideOptions
}: ExpenseOptionsProps) => {

    if (!visible) return null
    return (

        <TouchableWithoutFeedback
            onPress={onHideOptions}>

            <View
                style={{
                    ...expenseOptionStyles.expenseOptions,
                    display: visible ? 'flex' : 'none',
                }}
            >

                <ExpenseOptionItem
                    title='Gasto'
                    onPress={onPressOutcome}
                    image={Icons.expense}
                    styles={{
                        right: 0,
                        bottom: 100,
                    }}
                />

                <ExpenseOptionItem
                    title='Plan'
                    onPress={onPressBudget}
                    image={Icons.budget}
                    styles={{
                        bottom: 0,
                        right: 100,
                    }}
                />

            </View>
        </TouchableWithoutFeedback>

    )
}

const ExpenseOptionItem = ({
    title,
    image,
    styles,
    onPress
}: ExpenseOptionItemProps) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                ...expenseOptionStyles.touchableOptionItem,
                ...styles
            }}
        >
            <Label
                value={title}
                fontSize={FontSize.XXSMALL}
                fontFamily={FontFamily.BOLD}
            />

            <Spacer marginVertical={"2%"} />

            <View>
                <Image
                    source={image}
                    resizeMode='contain'
                    style={expenseOptionStyles.imageOptionItem}
                />
            </View>
        </TouchableOpacity >
    )

}

export default ExpenseOptions

const expenseOptionStyles = StyleSheet.create({

    expenseOptions: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        aspectRatio: 1,
        height: "100%",
        width: "100%",
    },

    touchableOptionItem: {
        backgroundColor: Colors.YELLOW,
        position: 'absolute',
        height: 80,
        width: 80,
        aspectRatio: 1,
        borderRadius: Styles.HEIGHT,
        justifyContent: 'space-between',
        paddingVertical: "14%",
        alignItems: 'center',
        ...DefaultStyles.shadow,
    },

    imageOptionItem: {
        width: 35,
        height: 35,
        alignSelf: 'center',
        tintColor: Colors.BLACK
    }

})