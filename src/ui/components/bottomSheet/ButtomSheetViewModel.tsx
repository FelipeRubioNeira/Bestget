import { useEffect, useState } from "react"
import { DataItem } from "../horizontalSelector/HorizontalSelector"
import DateTime from "../../../utils/DateTime"
import UpdateSavedDateUseCase from "../../../domain/useCases/UpdateSavedDateUseCase"

const dateTime = new DateTime()

type BottomSheetViewModel = {
    date: string,
    onChange: (date: string) => void,
    updateSavedDateUseCase: UpdateSavedDateUseCase
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

const useBottomSheetViewModel = ({ date, onChange, updateSavedDateUseCase }: BottomSheetViewModel) => {


    // ------------------ state ------------------ //
    const [currentDate, setCurrentDateState] = useState({
        monthIndex: 0,
        yearIndex: 0
    })


    // ------------------ effects ------------------ //
    useEffect(() => {

        const month = Number(dateTime.getMonth())
        const year = Number(dateTime.getYear())

        const yearIndex = years.findIndex(item => item.value === year.toString())

        updateDate(yearIndex, month - 1)

    }, [date])


    // ------------------ methods ------------------ //
    const updateDate = (yearIndex?: number, monthIndex?: number,) => {

        const yearIndexValue = yearIndex ?? currentDate.yearIndex
        const monthIndexValue = monthIndex ?? currentDate.monthIndex

        setCurrentDateState({
            yearIndex: yearIndexValue,
            monthIndex: monthIndexValue,
        })

        // onChange date
        const dateTime = getDate(yearIndexValue, monthIndexValue)
        onChange(dateTime)

    }

    const onConfirmViewModel = (onConfirm: (date: string) => void) => {

        const newDate = getDate(currentDate.yearIndex, currentDate.monthIndex)
        const dateInterval = dateTime.getMonthRange(newDate)

        updateSavedDateUseCase.execute(dateInterval)

        onConfirm(newDate)

    }

    const getDate = (yearIndex: number, monthIndex: number) => {
        const yearValue = Number(years[yearIndex].value)
        const dateTime = new DateTime(new Date(yearValue, monthIndex, 1)).date

        return dateTime

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