import { useEffect, useState } from "react"
import { BudgetsScreenProps } from "../../../navigation/NavigationParamList"
import { currencyFormat } from "../../../utils/Convert"
import { Category } from "../../../data/types/Categoty"


const useBudgetsViewModel = ({ navigation, route }: BudgetsScreenProps) => {

    // ----------- params ----------- //
    // const {
    //     name,
    //     amount,
    //     categoryId
    // } = route?.params?.budget
    const {
        budget,
        categoryList = []
    } = route.params

    // ----------- states ----------- //
    const [category, setCategory] = useState<Category>()

    const [title, setTitle] = useState<string>("")
    const [available, setAvailable] = useState<string>("")
    const [used, setUsed] = useState<string>("")



    // ----------- effects ----------- //
    useEffect(() => {

        generateTitle(
            currencyFormat(budget.amount),
            budget.name
        )

        findCategory(budget.categoryId, categoryList)

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

    const findCategory = (categoryId: number, categoryList: Category[]) => {

        const category = categoryList.find(category => category.id === categoryId)
        setCategory(category)

    }


    // ----------- events ----------- //
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