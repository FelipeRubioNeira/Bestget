import React from 'react'
import { Calendar, } from 'react-native-calendars';
import { convertToAmericanDate, convertToNormalDate } from '../../../utils/Date';
import { Colors } from '../../constants/Colors';
import { Styles } from '../../styles/Styles';
import DefaultStyles from '../../styles/DefaultStyles';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

type CalendarProps = {
  visible?: boolean,
  value?: string,
  onDayPress: (day: string) => void,
  onCancel?: () => void
}

const CalendarApp = ({
  visible,
  value = convertToNormalDate(new Date()),
  onDayPress = () => { },
  onCancel = () => { }
}: CalendarProps) => {

  const finalDate = convertToAmericanDate(value)

  if (!visible) return null
  return (

    <TouchableWithoutFeedback onPress={onCancel}>

      <View style={calendarStyles.container}>

        <Calendar

          style={calendarStyles.calendar}

          onDayPress={date => {
            const newDate = convertToNormalDate(date.dateString)
            onDayPress(newDate)
          }}

          markedDates={{
            [finalDate]: { selected: true, selectedColor: Colors.YELLOW }
          }}

        />

      </View>
    </TouchableWithoutFeedback>

  )
}

const calendarStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    height: Styles.HEIGHT,
    width: "100%",
    zIndex: 1,
    justifyContent: "center",
  },
  calendar: {
    borderRadius: Styles.BORDER_RADIUS,
    ...DefaultStyles.shadow
  }
})

export default CalendarApp
