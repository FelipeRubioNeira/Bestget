import { IncomesCreateScreenProps } from "../../navigation/NavigationTypes";
import { ScreensRoutes } from "../../navigation/Routes";

const useIncomeCreateViewModel = ({ navigation }: IncomesCreateScreenProps) => {

    const saveNewIncome = () => {
        navigation.navigate(ScreensRoutes.INCOMES)
    }

    return {
        saveNewIncome
    }


}

export default useIncomeCreateViewModel;