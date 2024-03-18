import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontFamily, FontSize } from '../../constants/Fonts'
import Label from '../label/Label'
import { DefaultStyles } from '../../constants/Styles'
import { Colors } from '../../constants/Colors'
import { BudgetUI } from '../../../data/types/Budget'
import EditionIcons from '../editionIcons/EditionIcons'

const budgetIcon = require("../../../assets/icons/ic_calculator_bold.png")



const BudgetItem = ({ name, amount, category, onPress, editMode, onEdit, onDelete }: BudgetUI) => {


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

            {
                editMode ?
                    <EditionIcons
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                    :

                    <Label
                        value={"$" + amount}
                        style={budgetStyles.amount}
                    />
            }


        </TouchableOpacity>
    )
}

const IconBudget = ({ color = Colors.WHITE }: { color?: string }) => {

    return (

        <Image
            source={budgetIcon}
            style={{
                ...budgetStyles.icon,
                tintColor: color,
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
