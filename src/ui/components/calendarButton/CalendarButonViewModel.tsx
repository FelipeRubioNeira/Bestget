import { useEffect, useState } from "react"
import DateTime from "../../../utils/DateTime"

const dateTime = new DateTime()

type CalendarButtonViewModelProps = {
    date: string
}

const useCalendarButtonViewModel = ({
    date
}: CalendarButtonViewModelProps) => {


    // ------------------- states ------------------- //
    const [calendarVisible, setCalendarVisible] = useState(false)
    const [formattedDate, setFormattedDate] = useState("")


    useEffect(()=>{
        const normalDate =  dateTime.convertToNormalDate(date)
        setFormattedDate(normalDate)
    },[date])


    // ------------------- methods ------------------- //
    const showCalendar = () => {
        setCalendarVisible(true)
    }

    const hideCalendar = () => {
        setCalendarVisible(false)
    }

    return {
        formattedDate,
        calendarVisible,
        showCalendar,
        hideCalendar
    }


}

export default useCalendarButtonViewModel