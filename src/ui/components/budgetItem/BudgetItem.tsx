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

            <View style={{ flexDirection: "row" }}>

                <IconBudget color={category?.color} />

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

const IconBudget = ({ color  = Colors.WHITE}: { color?: string }) => {

    return (

        <Image
            source={require("../../../assets/icons/ic_budget.png")}
            style={{
                ...budgetStyles.icon,
                backgroundColor: color,
                borderRadius: Styles.BORDER_RADIUS,
                marginRight: "8%",
            }}
        />
    )
}

const budgetStyles = StyleSheet.create({

    icon: {
        width: 30,
        height: 30,
        //marginLeft: "8%",
    }
})

export default BudgetItem
