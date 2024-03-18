import { useEffect, useState } from "react"
import { ViewStyle } from "react-native"
import { Category } from "../../../data/types/Categoty"
import { Colors } from "../../constants/Colors"

interface IChipItemViewModel {
    category?: Category,
    idSelected?: number,
    onPress?: (categoryId: number) => void
}



const useChipItemViewModel = ({ category, idSelected, onPress }: IChipItemViewModel) => {

    // ------------- states ------------- //
    const [chipStyle, setChipStyle] = useState<ViewStyle>({})


    // ------------- effects ------------- //
    useEffect(() => {
        updateStyle(idSelected)
    }, [idSelected])


    const updateStyle = (idSelected: number | undefined) => {

        if (!idSelected) return

        setChipStyle({
            ...chipStyle,
            backgroundColor: idSelected === category?.id ? category.color : Colors.WHITE,
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