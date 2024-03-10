import { useEffect, useState } from "react"
import { ViewStyle } from "react-native"
import { CategoryType } from "../../../data/types/Categoty"
import { Colors } from "../../constants/Colors"

interface IChipItemViewModel {
    categoryType: CategoryType | undefined,
    pressedValue?: CategoryType,
    onPress?: (categoryType: CategoryType) => void
}



const useChipItemViewModel = ({ categoryType, pressedValue, onPress }: IChipItemViewModel) => {

    // ------------- states ------------- //
    const [chipStyle, setChipStyle] = useState<ViewStyle>({
        borderColor: Colors.GRAY
    })


    // ------------- effects ------------- //
    useEffect(() => {
        setDefaultStyle(categoryType)
    }, [categoryType])

    useEffect(() => {
        updateStyle(pressedValue)
    }, [pressedValue])


    const setDefaultStyle = (categoryType: CategoryType | undefined) => {

        const borderColor = getColor(categoryType)

        setChipStyle({
            ...chipStyle,
            borderColor: borderColor
        })
    }

    const updateStyle = (pressed: CategoryType | undefined) => {

        if (!pressed) return

        setChipStyle({
            ...chipStyle,
            backgroundColor: pressedValue === categoryType ? getColor(categoryType) : Colors.WHITE,
        });

    }

    const getColor = (categoryType: CategoryType | undefined) => {

        if (!categoryType) return Colors.WHITE

        let color: string

        switch (categoryType) {

            case "Esenciales":
                color = Colors.CHIP_ESSENTIALS
                break;

            case "Deudas":
                color = Colors.CHIP_DEBTS
                break;

            case "Ahorros":
                color = Colors.CHIP_SAVINGS
                break;

            case "Lujos":
                color = Colors.CHIP_LUXURIES
                break;

            default:
                color = Colors.WHITE
                break;
        }

        return color

    }

    const onPressViewModel = () => {
        if (!onPress) return
        onPress(categoryType)
    }


    return {
        chipStyle,
        onPressViewModel
    }

}

export default useChipItemViewModel