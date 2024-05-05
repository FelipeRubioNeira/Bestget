import React from 'react'
import { Image, StyleSheet, TouchableOpacity, Vibration, View } from 'react-native'
import { FontFamily, FontSize } from '../../constants/Fonts'
import Label from '../label/Label'
import DefaultStyles from '../../styles/DefaultStyles'
import { Colors } from '../../constants/Colors'
import { BudgetUI } from '../../../data/types/Budget'
import EditionIcons from '../editionIcons/EditionIcons'
import Icons from '../../../assets/icons'



const BudgetItem = ({ name, amount, category, remaining, onPress, editMode, onEdit, onDelete }: BudgetUI) => {


    return (

        <TouchableOpacity
            onPress={onPress}
            onLongPress={() => {
                Vibration.vibrate(35)
            }}
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

                    <View style={{ flexDirection: "column" }}>
                        <Label
                            value={"$" + remaining}
                            style={budgetStyles.remainingAmount}
                        />
                        <Label
                            value={"$" + amount}
                            style={budgetStyles.amount}
                        />
                    </View>
            }


        </TouchableOpacity>
    )
}

const IconBudget = (props: { color?: string }) => {

    const { color = Colors.GRAY } = props

    return (

        <Image
            source={Icons.budget}
            style={{
                ...budgetStyles.icon,
                tintColor: color,
                marginRight: "4%",
            }}
        />
    )
}




// ------------------- Styles ------------------- //
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
    remainingAmount: {
        flex: 1,
        height: "100%",
        fontSize: FontSize.SMALL,
        fontFamily: FontFamily.BOLD,
        textAlign: "right",
        verticalAlign: "middle",
    },
    amount: {
        flex: 1,
        height: "100%",
        textAlign: "right",
        verticalAlign: "middle",
        fontSize: FontSize.XSMALL,
        fontFamily: FontFamily.REGULAR,
        color: Colors.GRAY,
    }
})

export default BudgetItem
