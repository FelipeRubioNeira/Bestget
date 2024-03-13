import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontFamily, FontSize } from '../../constants/Fonts'
import Label from '../label/Label'
import ChipItem from '../chipItem/ChipItem'
import { BudgetExpenseItem } from '../../../data/types/BudgetExpense'
import { Colors } from '../../constants/Colors'
import { DefaultStyles, Styles } from '../../constants/Styles'



const BudgetItem = ({ name, amount, category, onPress }: BudgetExpenseItem) => {


    return (

        <TouchableOpacity
            onPress={onPress}
            style={DefaultStyles.LIST_ITEM}
        >

            <View>

                <Label
                    value={name}
                    fontSize={FontSize.SMALL}
                    fontFamily={FontFamily.REGULAR}
                />

                <Label
                    value={"$" + amount}
                    fontSize={FontSize.SMALL}
                    fontFamily={FontFamily.REGULAR}
                />

            </View>

            <IconBudget />

            <ChipItem
                category={category}
                disabled={true}
            />

        </TouchableOpacity>
    )
}

const IconBudget = () => {

    return (
        <Image
            source={require("../../../assets/icons/ic_budget.png")}
            style={budgetStyles.icon}
        />
    )
}

const budgetStyles = StyleSheet.create({

    icon: {
        width: 30,
        height: 30,
    }
})

export default BudgetItem
