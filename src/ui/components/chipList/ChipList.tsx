import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Label from '../Label'
import { Styles } from '../../constants/Styles'
import { FontFamily, FontSize } from '../../constants/Fonts'
import { Colors } from '../../constants/Colors'
import useChipsViewModel from './ChipListViewModel'
import { Category, CategoryType } from '../../../data/types/Categoty'
import ChipItem from '../chipItem/ChipItem'
import Spacer from '../Spacer'

interface IChipList {
    categories: Category[],
}


const ChipList = ({
    categories,
}: IChipList) => {

    const chipsViewModel = useChipsViewModel()

    return (

        <View style={chipsStyles.container}>

            {categories.map((category, index) => {
                return (
                    <ChipItem
                        categoryType={category.name as CategoryType}
                        key={index}
                        style={chipsStyles.separation}
                        onPress={chipsViewModel.updatePressedValue}
                        pressedValue={chipsViewModel.currentPressedValue}
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