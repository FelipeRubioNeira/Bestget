import { View } from 'react-native'
import React from 'react'
import { FontFamily, FontSize } from '../../constants/Fonts'
import Label from '../label/Label'
import { BudgetExpenseItem } from '../../../data/types/BudgetExpense'
import { DefaultStyles } from '../../constants/Styles'
import CircleCategory from '../circleCategory/CircleCategory'


const ExpenseItem = ({ name, amount, category }: BudgetExpenseItem) => {


    return (

        <View style={DefaultStyles.listItemContainer}>

            <CircleCategory color={category?.color} />


            <Label
                value={name}
                fontSize={FontSize.SMALL}
                fontFamily={FontFamily.REGULAR}
                style={{ flex: 2 }}
            />

            <Label
                value={"$" + amount}
                fontSize={FontSize.SMALL}
                fontFamily={FontFamily.BOLD}
                style={{ flex: 1, textAlign: "right" }}
            />

        </View>
    )
}

export default ExpenseItem
