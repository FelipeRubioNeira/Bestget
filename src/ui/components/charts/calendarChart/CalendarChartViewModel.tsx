import { eachDayOfInterval, startOfMonth, endOfMonth, parseISO, getDate } from 'date-fns';
import DateTime from '../../../../utils/DateTime';
import { ContributionChartValue } from '../../../screens/statistics/StatisticsViewModel';
import { currencyFormat } from '../../../../utils/NumberFormat';
const dateTime = new DateTime()

type CalendarProps = {
    date: string;
    showModal: (title: string, message: string) => void; // callback function
}


const useCalendarChartViewModel = ({ date, showModal }: CalendarProps) => {

    const newDate = new DateTime(date);

    // Get the first and last day of the month
    const startDate = startOfMonth(newDate.date);
    const endDate = endOfMonth(startDate);


    // Get the first and last day of the week
    const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
    const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });


    const getNumberDay = (date: string) => {
        const dateParsed = parseISO(date);
        return getDate(dateParsed);
    }

    const handleOnPress = ({ date, count, expenseList }: ContributionChartValue) => {
        const customMessage = generateCustomMessage(count, date.toString())
        const expenseListMessage = generateExpenseList(expenseList)

        showModal(
            "Gastos del día",
            customMessage +
            (expenseListMessage ? `\n\n${expenseListMessage}` : "")
        )
    }


    const generateCustomMessage = (count: number, date: string) => {

        const formattedDate = dateTime.convertToNormalDate(date.toString() + "T00:00:00")
        const currencyAmount = currencyFormat(count)

        if (count == 0) {
            return `El día ${formattedDate} no registra gastos.`
        }

        return `El día ${formattedDate} se han registrado un gasto de $${currencyAmount}.`
    }

    const generateExpenseList = (expenseList: { name: string, amount: number }[]) => {
        return expenseList.map(({ name, amount }) => {
            const currencyAmount = currencyFormat(amount)
            return `• ${name} $${currencyAmount}`
        }).join("\n")
    }

    return {
        startDate,
        daysOfWeek,
        daysInMonth,
        getNumberDay,
        handleOnPress
    }

}

export default useCalendarChartViewModel