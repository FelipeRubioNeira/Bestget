import React from "react"
import { Keyboard, TextStyle, TouchableOpacity } from "react-native"
import Label from "../label/Label"
import { FontSize } from "../../constants/Fonts"
import { Colors } from "../../constants/Colors"
import DefaultStyles from "../../styles/DefaultStyles"
import CalendarApp from "../calendar/CalendarApp"
import useCalendarButtonViewModel from "./CalendarButonViewModel"


type CalendarButtonProps = {
    value?: string,
    onDayPress?: (day: string) => void,
    disabled?: boolean,
    style?: TextStyle
}

const CalendarButton = ({
    value = "AAAA-MM-DDT00:00:00.000",
    onDayPress = () => { },
    disabled = false,
    style = {},
}: CalendarButtonProps) => {

    const {
        formattedDate,
        calendarVisible,
        showCalendar,
        hideCalendar
    } = useCalendarButtonViewModel({
        date: value
    })


    return (

        <>
            <TouchableOpacity
                onPress={() => {
                    showCalendar()
                    Keyboard.dismiss()
                }}
                disabled={disabled}
                style={DefaultStyles.input}
            >

                <Label
                    value={formattedDate}
                    fontSize={FontSize.SMALL}
                    color={Colors.BLACK}
                    style={{
                        ...(value === "dd-mm-aaaa" && { color: Colors.GRAY }),
                        ...style
                    }}
                />

            </TouchableOpacity>

            <CalendarApp
                visible={calendarVisible}
                value={value}
                onDayPress={day => {
                    onDayPress(day)
                    hideCalendar()
                }}
                onCancel={hideCalendar}
            />
        </>

    )
}

export default CalendarButton