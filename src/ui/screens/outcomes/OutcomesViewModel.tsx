/*
    View model for the Outcomes screen
*/

import { useState } from "react"
import { OutcomesScreenProps } from "../../navigation/NavigationParamList"

type OutcomesViewModelProps = {

} & OutcomesScreenProps

const useOutcomesViewModel = ({ navigation }: OutcomesViewModelProps) => {


    // ----------- states ----------- //
    const [totalAmount, setTotalAmount] = useState("0")

    const [buttonAddVisible, setButtonAddVisible] = useState(true)
    const [outcomeOptionsVisible, setOutcomeOptionsVisble] = useState(false)


    // ----------- methods ----------- //
    const onShowOutcomeOptions = () => {
        setButtonAddVisible(false)
        setOutcomeOptionsVisble(true)
    }

    const onAddOutcome = () => {
        onHideOutcomeOptions()
    }

    const onAddBudget = () => {
        onHideOutcomeOptions()
    }

    const onHideOutcomeOptions = () => {
        setButtonAddVisible(true)
        setOutcomeOptionsVisble(false)
    }


    return {
        buttonAddVisible,
        outcomeOptionsVisible,
        totalAmount,

        onShowOutcomeOptions,
        onAddOutcome,
        onAddBudget,

        onHideOutcomeOptions,

    }

}

export default useOutcomesViewModel