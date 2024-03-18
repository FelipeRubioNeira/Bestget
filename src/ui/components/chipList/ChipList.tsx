/*
    chiplist receives a list, a selected id and a function to handle the press event
    it will render a list of chips with the categories
    if the idSelected is equal to the category id, the chip will be selected with a different style (background color)
*/

import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Category, } from '../../../data/types/Categoty'
import ChipItem from '../chipItem/ChipItem'

interface IChipList {
    categories?: Category[],
    idSelected?: number,
    onPress?: (categoryId: number) => void,
}


const ChipList = ({
    idSelected = 0,
    categories = [],
    onPress = () => { }
}: IChipList) => {


    return (

        <View style={chipsStyles.container}>

            {categories.map(category => {
                return (
                    <ChipItem
                        key={category.id}
                        idSelected={idSelected}
                        category={category}
                        onPress={onPress}
                        style={chipsStyles.separation}
                    />
                )
            })}

        </View>
    )
}


const chipsStyles = StyleSheet.create({

    container: {
        paddingVertical: "8%",
        width: "100%",
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    separation: {
        marginRight: "4%",
        marginBottom: "4%"
    }

})

export default ChipList