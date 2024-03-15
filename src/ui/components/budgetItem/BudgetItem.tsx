import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontFamily, FontSize } from '../../constants/Fonts'
import Label from '../label/Label'
import ChipItem from '../chipItem/ChipItem'
import { BudgetExpenseItem } from '../../../data/types/BudgetExpense'
import { DefaultStyles, Styles } from '../../constants/Styles'
import CircleCategory from '../circleCategory/CircleCategory'
import { Colors } from '../../constants/Colors'



const BudgetItem = ({ name, amount, category, onPress }: BudgetExpenseItem) => {


    return (

        <TouchableOpacity
            onPress={onPress}
            style={DefaultStyles.listItemContainer}
        >

            <IconBudget color={category?.color} />

            <Label
                value={name}
                style={budgetStyles.description}
            />

            <Label
                value={"$" + amount}
                style={budgetStyles.amount}
            />

        </TouchableOpacity>
    )
}

const IconBudget = ({ color = Colors.WHITE }: { color?: string }) => {

    return (

        <Image
            source={require("../../../assets/icons/ic_budget.png")}
            style={{
                ...budgetStyles.icon,
                backgroundColor: color,
                borderRadius: Styles.BORDER_RADIUS,
                marginRight: "4%",
            }}
        />
    )
}

const budgetStyles = StyleSheet.create({

    icon: {
        width: 30,
        height: 30,
    },
    description: {
        flex: 2,
        height: "100%",
        fontSize: FontSize.SMALL,
        fontFamily: FontFamily.REGULAR,
    },
    amount: {
        flex: 1,
        height: "100%",
        fontSize: FontSize.SMALL,
        fontFamily: FontFamily.BOLD,
        textAlign: "right",
        verticalAlign: "middle"
    }
})

export default BudgetItem
