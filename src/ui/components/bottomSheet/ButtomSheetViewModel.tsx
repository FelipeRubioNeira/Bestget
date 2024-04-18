import { useEffect, useState } from "react"
import { DataItem } from "../horizontalSelector/HorizontalSelector"
import DateTime from "../../../utils/DateTime"

type BottomSheetViewModel = {
    date: string,
    onConfirm: (date: string) => void,
}

const months: DataItem[] = [{
    id: 0,
    value: "Enero"
}, {
    id: 1,
    value: "Febrero"
}, {
    id: 2,
    value: "Marzo"
}, {
    id: 3,
    value: "Abril"
}, {
    id: 4,
    value: "Mayo"
}, {
    id: 5,
    value: "Junio"
}, {
    id: 6,
    value: "Julio"
}, {
    id: 7,
    value: "Agosto"
}, {
    id: 8,
    value: "Septiembre"
}, {
    id: 9,
    value: "Octubre"
}, {
    id: 10,
    value: "Noviembre"
}, {
    id: 11,
    value: "Diciembre"
}]

const years: DataItem[] = [
    {
        id: 0,
        value: "2024"
    },
    {
        id: 1,
        value: "2025"
    },
    {
        id: 2,
        value: "2026"
    },
    {
        id: 3,
        value: "2027"
    },
    {
        id: 4,
        value: "2028"
    },
    {
        id: 5,
        value: "2029"
    },
    {
        id: 6,
        value: "2030"
    }
]

const useBottomSheetViewModel = ({ onConfirm, date }: BottomSheetViewModel) => {


    // ------------------ state ------------------ //
    const [currentDate, setCurrentDateState] = useState({
        monthIndex: 0,
        yearIndex: 0
    })


    // ------------------ effects ------------------ //
    useEffect(() => {

        const dateTime = new DateTime(date)

        const month = Number(dateTime.getMonth())
        const year = Number(dateTime.getYear())

        const yearIndex = years.findIndex(item => item.value === year.toString())

        updateDate(yearIndex, month - 1)

    }, [date])

    
    // ------------------ methods ------------------ //
    const updateDate = (yearIndex?: number, monthIndex?: number,) => {
        setCurrentDateState({
            yearIndex: yearIndex ?? currentDate.yearIndex,
            monthIndex: monthIndex ?? currentDate.monthIndex,
        })
    }

    const onConfirmViewModel = () => {

        const yearValue = Number(years[currentDate.yearIndex].value)
        const dateTime = new DateTime(new Date(yearValue, currentDate.monthIndex, 1)).date

        onConfirm(dateTime)
    }


    return {
        months,
        years,
        currentDate,
        updateDate,
        onConfirmViewModel
    }


}

export default useBottomSheetViewModel