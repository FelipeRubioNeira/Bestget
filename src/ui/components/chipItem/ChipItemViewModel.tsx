import { useEffect, useState } from "react"
import { ViewStyle } from "react-native"
import { Category } from "../../../data/types/Categoty"
import { Colors } from "../../constants/Colors"

interface IChipItemViewModel {
    category?: Category,
    pressedValue?: number,
    onPress?: (categoryId: number) => void
}



const useChipItemViewModel = ({ category, pressedValue, onPress }: IChipItemViewModel) => {

    // ------------- states ------------- //
    const [chipStyle, setChipStyle] = useState<ViewStyle>({})


    // ------------- effects ------------- //
    useEffect(() => {
        updateStyle(pressedValue)
    }, [pressedValue])


    const updateStyle = (pressedValue: number | undefined) => {

        if (!pressedValue) return

        setChipStyle({
            ...chipStyle,
            backgroundColor: pressedValue === category?.id ? category.color : Colors.WHITE,
        });

    }


    const onPressViewModel = () => {
        if (!onPress) return
        onPress(category?.id || 0)
    }


    return {
        chipStyle,
        onPressViewModel
    }

}

export default useChipItemViewModel