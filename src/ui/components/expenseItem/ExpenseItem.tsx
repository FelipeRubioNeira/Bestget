import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontFamily, FontSize } from '../../constants/Fonts'
import Label from '../label/Label'
import ChipItem from '../chipItem/ChipItem'
import { BudgetExpenseItem } from '../../../data/types/BudgetExpense'
import { DefaultStyles, Styles } from '../../constants/Styles'


const ExpenseItem = ({ name, amount, category }: BudgetExpenseItem) => {

    return (

        <TouchableOpacity style={DefaultStyles.LIST_ITEM}>

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

            <ChipItem
                category={category}
                disabled={true}
            />

        </TouchableOpacity>
    )
}

export default ExpenseItem
