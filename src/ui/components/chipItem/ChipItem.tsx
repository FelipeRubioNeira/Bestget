import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import Label from '../Label'
import { Styles } from '../../constants/Styles'
import { FontFamily, FontSize } from '../../constants/Fonts'
import { CategoryType } from '../../../data/types/Categoty'
import useChipItemViewModel from './ChipItemViewModel'


interface IchipItem {
    categoryType?: CategoryType,
    style?: ViewStyle,
    disabled?: boolean,
    onPress?: (categoryType: CategoryType) => void,
    pressedValue?: CategoryType
}

const ChipItem = ({
    categoryType,
    style,
    disabled = false,
    onPress,
    pressedValue
}: IchipItem) => {

    const chipItemViewModel = useChipItemViewModel({
        categoryType,
        pressedValue,
        onPress
    })

    return (
        <TouchableOpacity
            onPress={chipItemViewModel.onPressViewModel}
            disabled={disabled}
            style={{
                ...chipStyle.base,
                ...chipItemViewModel.chipStyle,
                ...style,
            }}>

            <Label
                value={categoryType}
                fontSize={FontSize.XXSMALL}
                fontFamily={FontFamily.BOLD}
            />

        </TouchableOpacity>
    )

}


const chipStyle = StyleSheet.create({

    base: {
        borderWidth: 4,
        borderRadius: Styles.BORDER_RADIUS * 4,
        paddingHorizontal: "4%",
        paddingVertical: "2%",
    }
})

export default ChipItem