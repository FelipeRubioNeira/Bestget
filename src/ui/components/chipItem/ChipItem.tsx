import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react'
import Label from '../label/Label'
import { Styles } from '../../constants/Styles'
import { FontFamily, FontSize } from '../../constants/Fonts'
import { Category } from '../../../data/types/Categoty'
import useChipItemViewModel from './ChipItemViewModel'


export type ChipItemProps = {
    category?: Category,
    disabled?: boolean,
    style?: ViewStyle,
    idSelected?: number
    onPress?: (categoryId: number) => void,
}

const ChipItem = ({
    category,
    disabled = false,
    onPress,
    idSelected,
    style,
}: ChipItemProps) => {

    const chipItemViewModel = useChipItemViewModel({
        category,
        idSelected,
        onPress
    })

    if (!category) return null
    return (
        <TouchableOpacity
            onPress={chipItemViewModel.onPressViewModel}
            disabled={disabled}
            style={{
                ...chipStyle.base,
                ...{ borderColor: category.color },
                ...chipItemViewModel.chipStyle,
                ...style,
            }}>

            <Label
                value={category.name}
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
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default ChipItem