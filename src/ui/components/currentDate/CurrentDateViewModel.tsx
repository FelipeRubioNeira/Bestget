import { useEffect, useState } from "react"
import DateTime from "../../../utils/DateTime"
import { capitalizeFirstLetter } from "../../../utils/String"


const useCurrentDateViewModel = (date: string) => {


    // ------------------ states ------------------ //
    const [currentDate, setCurrentDate] = useState("")


    // ------------------ effects ------------------ //
    useEffect(() => {
        splitDate(date)
    }, [date])


    // ------------------ methods ------------------ //
    const splitDate = (date: string) => {

        const dateTime = new DateTime(date)
        const month = dateTime.getMonthName(Number(dateTime.getMonth()))
        const monthName = capitalizeFirstLetter(month)
        const year = dateTime.getYear()

        setCurrentDate(`${monthName} ${year}`)

    }

    return {
        currentDate
    }


}

export default useCurrentDateViewModel

