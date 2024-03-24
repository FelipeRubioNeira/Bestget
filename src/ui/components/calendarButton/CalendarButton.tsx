import { TextStyle, TouchableOpacity } from "react-native"
import Label from "../label/Label"
import { FontSize } from "../../constants/Fonts"
import { Colors } from "../../constants/Colors"
import DefaultStyles from "../../styles/DefaultStyles"
import CalendarApp from "../calendar/CalendarApp"
import { useState } from "react"


type CalendarButtonProps = {
    value?: string,
    onDayPress?: (day: string) => void,
    disabled?: boolean,
    style?: TextStyle
}

const CalendarButton = ({
    value = "dd-mm-aaaa",
    onDayPress = () => { },
    disabled = false,
    style = {},
}: CalendarButtonProps) => {

    const [calendarVisible, setCalendarVisible] = useState(false)


    return (

        <>

            <TouchableOpacity
                onPress={() => {
                    setCalendarVisible(!calendarVisible)
                }}
                disabled={disabled}
                style={DefaultStyles.input}
            >

                <Label
                    value={value}
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
                onDayPress={day=>{
                    onDayPress(day)
                    setCalendarVisible(false)
                }}
                onCancel={() => setCalendarVisible(false)}
            />
        </>

    )
}

export default CalendarButton