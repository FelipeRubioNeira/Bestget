interface ICategory {
    id: number,
    name: string,
}

import { useState } from "react";
import { CategoryType } from "../../../data/types/Categoty";

const useChipsViewModel = () => {

    const [currentPressedValue, setCurrentPressedValue] = useState<CategoryType>();

    const updatePressedValue = (newValue: CategoryType) => {
        setCurrentPressedValue(newValue)
    }

    return {
        currentPressedValue,
        updatePressedValue
    }

}

export default useChipsViewModel