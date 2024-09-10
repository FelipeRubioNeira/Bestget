import DateTime from "../../../../utils/DateTime";
import { currencyFormat } from "../../../../utils/NumberFormat";
import { ContributionChartValue } from "../../../screens/statistics/StatisticsViewModel";
const dateTime = new DateTime()



type ContributionViewModelProps = {
    showModal: (title: string, message: string) => void,
    hideModal: () => void,
}


const useContributionChartViewModel = ({ showModal, }: ContributionViewModelProps) => {


    const handlePress = ({ date, count, expenseList }: ContributionChartValue) => {

        const customMessage = generateCustomMessage(count, date.toString())
        const expenseListMessage = generateExpenseList(expenseList)

        showModal(
            "Gastos del día",
            customMessage +
            (expenseListMessage ? `\n\n${expenseListMessage}` : "")
        )

    }

    const generateExpenseList = (expenseList: { name: string, amount: number }[]) => {
        return expenseList.map(({ name, amount }) => {
            const currencyAmount = currencyFormat(amount)
            return `• ${name} $${currencyAmount}`
        }).join("\n")
    }

    const generateCustomMessage = (count: number, date: string) => {

        const formattedDate = dateTime.convertToNormalDate(date.toString() + "T00:00:00")
        const currencyAmount = currencyFormat(count)

        if (count == 0) {
            return `El día ${formattedDate} no registra gastos.`
        }

        return `El día ${formattedDate} se han registrado un gasto de $${currencyAmount}.`
    }

    return {
        handlePress
    }
}

export default useContributionChartViewModel;