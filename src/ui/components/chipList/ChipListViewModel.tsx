import { useState } from "react";

interface IChipListViewModel {
    onPress: (categoryId: number) => void
}



const useChipListViewModel = ({onPress}: IChipListViewModel) => {

    const [currentPressedCategory, setCurrentPressedCategory] = useState<number>();

    const updatePressedCategory = (categoryId: number) => {
        setCurrentPressedCategory(categoryId)
        onPress(categoryId)
    }

    return {
        currentPressedCategory,
        updatePressedCategory
    }

}

export default useChipListViewModel