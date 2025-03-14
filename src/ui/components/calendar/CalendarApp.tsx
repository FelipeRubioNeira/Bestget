import React from 'react'
import { Calendar, } from 'react-native-calendars';
import { Colors } from '../../constants/Colors';
import { Styles } from '../../styles/Styles';
import DefaultStyles from '../../styles/DefaultStyles';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import DateTime from '../../../utils/DateTime';

const dateTime = new DateTime()

type CalendarProps = {
  visible?: boolean,
  value:string
  onDayPress: (day: string) => void,
  onCancel?: () => void
}

const CalendarApp = ({
  visible,
  value = dateTime.date,
  onDayPress = () => { },
  onCancel = () => { }
}: CalendarProps) => {

  const americanFormat = dateTime.convertToAmericanDate(value || dateTime.date)

  if (!visible) return null
  return (

    <TouchableWithoutFeedback onPress={onCancel}>

      <View style={calendarStyles.container}>

        <Calendar

          onDayPress={({dateString}) => {
            const newDate = new DateTime(`${dateString}T00:00:00`)
            const normalDate = dateTime.convertToNormalDate(newDate.date)
            onDayPress(normalDate)
          }}

          style={calendarStyles.calendar}

          markedDates={{
            [americanFormat]: { selected: true, selectedColor: Colors.YELLOW }
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
