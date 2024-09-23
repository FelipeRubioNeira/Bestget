import { useEffect } from "react"
import { ChooseFinancesScreenProps } from "../../../navigation/NavigationParamList"
import { ScreenRoutes } from "../../../navigation/Routes"
import { deleteGroupId } from "../../../data/globalContext/redux/slices/FinancesAppSlice"
import { useAppDispatch } from "../../../data/globalContext/StoreHooks"


const useChooseFinancesViewModel = ({ navigation }: ChooseFinancesScreenProps) => {

    // ---------------- context ---------------- //
    const appDispatch = useAppDispatch()

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            appDispatch(deleteGroupId())
        })

        return unsubscribe

    }, [navigation])


    // ---------------- methods ---------------- //
    const navigateToPersonalFinances = () => {
        navigation.navigate(ScreenRoutes.HOME)
    }

    const navigateToGroups = () => {
        navigation.navigate(ScreenRoutes.GROUPS)
    }

    return {
        navigateToPersonalFinances,
        navigateToGroups
    }

}

export default useChooseFinancesViewModel