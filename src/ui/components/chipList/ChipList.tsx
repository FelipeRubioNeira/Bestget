import { StyleSheet, View } from 'react-native'
import React from 'react'
import useChipListViewModel from './ChipListViewModel'
import { Category, } from '../../../data/types/Categoty'
import ChipItem from '../chipItem/ChipItem'

interface IChipList {
    onPress?: (categoryId: number) => void,
    categories?: Category[],
}


const ChipList = ({
    categories = [],
    onPress = () => { }
}: IChipList) => {

    const chipsViewModel = useChipListViewModel({onPress})

    return (

        <View style={chipsStyles.container}>

            {categories.map(category => {
                return (
                    <ChipItem
                        key={category.id}
                        category={category}
                        style={chipsStyles.separation}
                        onPress={chipsViewModel.updatePressedCategory}
                        pressedValue={chipsViewModel.currentPressedCategory}
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