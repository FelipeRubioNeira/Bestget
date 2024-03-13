import { useEffect, useState } from "react"
import { BudgetsScreenProps } from "../../navigation/NavigationParamList"
import { currencyFormat } from "../../../utils/Convert"
import { Category } from "../../../data/types/Categoty"


const useBudgetsViewModel = ({ navigation, route }: BudgetsScreenProps) => {


    // ----------- states ----------- //
    const [category, setCategory] = useState<Category>()

    const [title, setTitle] = useState<string>("")
    const [available, setAvailable] = useState<string>("")
    const [used, setUsed] = useState<string>("")



    // ----------- effects ----------- //
    useEffect(() => {

        const currencyValue = currencyFormat(route?.params?.budget?.amount)

        setCategory(route?.params?.category)

        generateTitle(
            currencyValue,
            route?.params?.budget?.name
        )

    }, [route?.params?.budget])



    // ----------- methods ----------- //
    const generateTitle = (budgetAmount: string, budgetName: string) => {

        const title = `Has destinado $${budgetAmount} a ${budgetName}`
        const used = `Ocupado: $${0}`
        const available = `Disponible: $${0}`

        setTitle(title)
        setAvailable(available)
        setUsed(used)

    }

    const onPress = () => {
        console.log("onPress");
    }



    // ----------- return ----------- //
    return {
        title,
        available,
        used,
        category,

        onPress
    }

}

export default useBudgetsViewModel