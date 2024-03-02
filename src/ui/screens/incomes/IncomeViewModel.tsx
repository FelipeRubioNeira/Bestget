import { IncomesScreenProps } from "../../navigation/NavigationTypes"
import { ScreensRoutes } from "../../navigation/Routes"

export interface IIncomeViewModel {
    navigateIncomeCreate: () => void
}

const useIncomeViewModel = ({ navigation }: IncomesScreenProps) => {

    const navigateIncomeCreate = () => {
        navigation.navigate(ScreensRoutes.INCOMES_CREATE)
    }

    return {
        navigateIncomeCreate
    }
}

export default useIncomeViewModel