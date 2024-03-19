import { StyleSheet, View } from 'react-native'
import React from 'react'
import { FontFamily, FontSize } from '../../constants/Fonts'
import Label from '../label/Label'
import { DefaultStyles } from '../../constants/Styles'
import CircleCategory from '../circleCategory/CircleCategory'
import { ExpenseUI } from '../../../data/types/Expense'
import EditionIcons from '../editionIcons/EditionIcons'


const ExpenseItem = ({ name, amount, category, editMode = false, onEdit, onDelete }: ExpenseUI) => {



    return (

        <View style={DefaultStyles.listItemContainer}>

            <CircleCategory color={category?.color} />

            <Label
                value={name}
                fontSize={FontSize.SMALL}
                fontFamily={FontFamily.REGULAR}
                style={expenseStyles.name}
            />

            {
                editMode ?
                    <EditionIcons
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                    :

                    <Label
                        value={"$" + amount}
                        fontSize={FontSize.SMALL}
                        fontFamily={FontFamily.BOLD}
                        style={expenseStyles.amount}
                    />
            }

        </View>
    )
}

const expenseStyles = StyleSheet.create({
    name: {
        flex: 2
    },
    amount: {
        flex: 1,
        textAlign: "right"
    }
})

export default ExpenseItem
