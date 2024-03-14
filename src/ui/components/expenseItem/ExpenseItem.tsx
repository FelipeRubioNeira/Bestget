import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontFamily, FontSize } from '../../constants/Fonts'
import Label from '../label/Label'
import ChipItem from '../chipItem/ChipItem'
import { BudgetExpenseItem } from '../../../data/types/BudgetExpense'
import { DefaultStyles, Styles } from '../../constants/Styles'
import CircleCategory from '../circleCategory/CircleCategory'


const ExpenseItem = ({ name, amount, category }: BudgetExpenseItem) => {



    return (

        <TouchableOpacity style={DefaultStyles.listItemContainer}>

            <View style={{ flexDirection: "row" }}>

                <CircleCategory color={category?.color} />

                <Label
                    value={name}
                    fontSize={FontSize.SMALL}
                    fontFamily={FontFamily.REGULAR}
                />

            </View>

            <Label
                value={"$" + amount}
                fontSize={FontSize.SMALL}
                fontFamily={FontFamily.REGULAR}
            />


        </TouchableOpacity>
    )
}

export default ExpenseItem
