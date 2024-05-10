import React from 'react'
import Label from '../label/Label'
import Spacer from '../spacer/Spacer'
import CalendarButton from '../calendarButton/CalendarButton'
import { FontSize } from '../../constants/Fonts'


type CalendarWithLabelProps = {
    title?: string,
    value: string, // isoString date
    onChangeDay: (day: string) => void
}

const CalendarWithLabel = ({
    title = "Fecha",
    value,
    onChangeDay
}: CalendarWithLabelProps) => {

    return (
        <>
            <Label value={title} fontSize={FontSize.SMALL} />

            <Spacer marginVertical={"1%"} />

            <CalendarButton
                value={value}
                onDayPress={onChangeDay}
            />
        </>
    )
}

export default CalendarWithLabel
