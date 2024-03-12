import { useEffect, useState } from "react"
import { BudgetsScreenProps } from "../../navigation/NavigationParamList"
import { currencyFormat } from "../../../utils/Convert"


const useBudgetsViewModel = ({ navigation, route }: BudgetsScreenProps) => {

    const [budgetName, setBudgetName] = useState<string>("")
    const [budgetAmount, setBudgetAmount] = useState<string>("")


    useEffect(() => {

        setBudgetName(route?.params?.budget?.name)

        const currencyValue = currencyFormat(route?.params?.budget?.amount)
        setBudgetAmount(currencyValue)

    }, [route?.params?.budget])

    return {
        budgetName,
        budgetAmount
    }

}

export default useBudgetsViewModel